import * as d3 from "d3";

interface Country {
  continent: string;
  country: string;
  income: null | number;
  life_exp: null | number;
  population: number;
}
export interface yearPlot {
  countries: Country[];
  year: string;
}

export class globeChart {
  formatedData: yearPlot[];
  margins: {
    top: number;
    right: number;
    left: number;
    bot: number;
  };
  chartWidth: number;
  chartHeight: number;
  xScale: d3.ScaleLogarithmic<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  mainSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  chartGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
  legendGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
  xAxisScaleLabelGroup: d3.Selection<
    SVGGElement,
    unknown,
    HTMLElement,
    unknown
  >;
  yAxisScaleLabelGroup: d3.Selection<
    SVGGElement,
    unknown,
    HTMLElement,
    unknown
  >;
  id: string;
  updateInterval: NodeJS.Timeout;
  index: number;
  yearLabel: d3.Selection<SVGTextElement, unknown, HTMLElement, unknown>;
  rScale: d3.ScalePower<number, number, never>;
  colorScale: d3.ScaleOrdinal<string, string, never>;
  pause: boolean;
  constructor({
    data,
    id,
    entireWidth,
    entireHeight,
  }: {
    id: string;
    data: yearPlot[];
    entireWidth: number;
    entireHeight: number;
  }) {
    this.pause = false;
    this.id = id;
    this.formatedData = data.map((item) => ({
      ...item,
      countries: item.countries.filter(
        (country) =>
          country.income !== null &&
          country.life_exp !== null &&
          country.population !== null,
      ),
    }));

    this.margins = {
      top: 10,
      bot: 100,
      left: 200,
      right: 10,
    };

    this.chartWidth = entireWidth - this.margins.left - this.margins.right;
    this.chartHeight = entireHeight - this.margins.top - this.margins.bot;
    this.index = 0;
    this.xScale = d3.scaleLog().range([0, this.chartWidth]);
    this.rScale = d3.scaleSqrt().range([6, 50]);
    this.yScale = d3.scaleLinear().range([this.chartHeight, 0]);
    this.colorScale = d3.scaleOrdinal(d3.schemePaired);
    this.mainSvg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("width", entireWidth)
      .attr("height", entireHeight);
    this.chartGroup = this.mainSvg
      .append("g")
      .attr("transform", `translate(${this.margins.left},${this.margins.top})`);

    this.chartGroup
      .append("text")
      .text("Life Expectancy (Years)")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", -(this.chartHeight / 2));

    //X-label: months
    this.chartGroup
      .append("text")
      .text("GDP Per Capita ($)")
      .attr("text-anchor", "middle")
      .attr("y", this.chartHeight + this.margins.bot / 2)
      .attr("x", this.chartWidth / 2);

    this.yAxisScaleLabelGroup = this.chartGroup
      .append("g")
      .attr("class", "yAxisLabel");

    this.xAxisScaleLabelGroup = this.chartGroup
      .append("g")
      .attr("class", "xAxisLabel")
      .attr("transform", `translate(0,${this.chartHeight})`);
    this.yearLabel = this.chartGroup
      .append("g")
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", this.chartWidth)
      .attr("y", this.chartHeight - 10);
    this.legendGroup = this.mainSvg
      .append("g")
      .attr("transform", "translate(40,40)");
    this.update();
    this.updateInterval = setInterval(() => {
      this.update();
    }, 300);
  }
  update() {
    if (this.pause) return;
    const t = d3.transition().duration(300);
    //domain update

    const maxXScale = d3.max(
      this.formatedData.map((yearPlot) => {
        const countries = yearPlot.countries;
        const maxValue = d3.max(countries, (d) => d.income);
        if (maxValue) return maxValue;
        return 0;
      }),
    );
    const maxRScale = d3.max(
      this.formatedData.map((yearPlot) => {
        const countries = yearPlot.countries;
        const maxValue = d3.max(countries, (d) => d.population);
        if (maxValue) return maxValue;
        return 0;
      }),
    );
    this.xScale = this.xScale.base(2).domain([100, maxXScale || 0]);
    this.yScale = this.yScale.domain([0, 90]);
    this.rScale = this.rScale.domain([0, maxRScale || 0]);
    //create yAxisCall to new yScale domain
    const yAxisCall = d3.axisLeft(this.yScale).ticks(12);

    //create xAxisCall to new xScale domain
    const xAxisCall = d3.axisBottom(this.xScale).tickValues([400, 4000, 40000]);

    this.yAxisScaleLabelGroup.transition(t).call(yAxisCall);
    this.xAxisScaleLabelGroup
      .transition(t)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "start");

    const circles = this.chartGroup
      .selectAll<SVGCircleElement, Country>("circle")
      .data<Country>(this.formatedData[this.index].countries, (d) => d.country);

    const legends = this.legendGroup
      .selectAll<SVGGElement, Country>("g")
      .data([
        ...new Set(
          this.formatedData[this.index].countries.map((item) => item.continent),
        ),
      ]);
    legends.exit().remove();
    const lgp = legends.enter().append("g");

    lgp
      .append("text")
      .text((d) => d)
      .attr("y", (_, i) => i * 20);

    lgp
      .append("rect")
      .attr("x", 90)
      .attr("y", (_, i) => -10 + i * 20)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", (d) => this.colorScale(d));

    // //REMOVE
    circles.exit().remove();

    // //UPDATE
    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => this.xScale(d.income || 0))
      .attr("cy", (d) => this.yScale(d.life_exp || 0))
      .attr("r", 0)
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .attr("fill", (d) => this.colorScale(d.continent))
      .on("mouseenter", (_, node) => {
        this.pause = true;
        const tooltip = this.chartGroup
          .append("g")
          .attr("class", "tooltipBox")
          .attr(
            "transform",
            `translate(${
              this.xScale(node.income || 0) + this.rScale(node.population)
            },${
              this.yScale(node.life_exp || 0) + this.rScale(node.population)
            })`,
          );

        const box = tooltip
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .style("fill", "grey")
          .attr("stroke-width", "1.5")
          .attr("stroke", "black");
        const words = tooltip.append("g");
        let index = 0;
        for (const [key, value] of Object.entries(node)) {
          words
            .append("text")
            .attr("y", (index === 0 ? 1 : index + 1) * 15)
            .attr("x", 5)
            .text(`${key}: ${value}`)
            .attr("text-anchor", "start");
          index += 1;
        }

        box
          .attr("width", (words.node()?.getBBox().width || 0) + 10)
          .attr("height", (words.node()?.getBBox().height || 0) + 5);
      })
      .on("mouseout", (_, n) => {
        console.log(n);
        this.pause = false;
        this.mainSvg.select(".tooltipBox").remove();
      })
      .merge(circles)
      .transition(t)
      .attr("cx", (d) => this.xScale(d.income || 0))
      .attr("cy", (d) => this.yScale(d.life_exp || 0))
      .attr("r", (d) => this.rScale(d.population));

    this.yearLabel.text(this.formatedData[this.index].year);

    if (this.index < this.formatedData.length - 2) this.index += 1;
    else this.index = 0;
  }
  remove() {
    clearInterval(this.updateInterval);
    d3.select(`#${this.id} svg`).remove();
  }
}
