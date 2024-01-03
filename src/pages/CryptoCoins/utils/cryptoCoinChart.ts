import * as d3 from "d3";

interface DataInput {
  date: Date;
  usd: number;
  id: string;
}

export interface RawData {
  bitcoin: Coin[];
  bitcoin_cash: Coin[];
  ripple: Coin[];
  litecoin: Coin[];
  ethereum: Coin[];
}

export interface Coin {
  "24h_vol": number | null;
  date: Date;
  market_cap: number | null;
  price_usd: number | null;
}

export interface CoinInput {
  "24h_vol": string | null;
  date: string;
  market_cap: string | null;
  price_usd: string | null;
}
type View = "market_cap" | "price_usd" | "24h_vol";
type Data = DataInput[];

export class cryptoCoinChart {
  selectedCoin: string | undefined;
  selectedDateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  selectedView: View = "market_cap";
  formatedData: Data;
  margins: {
    top: number;
    right: number;
    left: number;
    bot: number;
  };
  chartWidth: number;
  chartHeight: number;
  xScale: d3.ScaleTime<number, number, never>;
  yScale: d3.ScaleLinear<number, number, never>;
  mainSvg: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  chartGroup: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
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
  path: d3.Selection<SVGPathElement, unknown, HTMLElement, unknown>;
  id: string;
  updateInterval?: NodeJS.Timeout;
  index: number;
  pause: boolean;
  yRange: [number, number] = [0, 50000];
  constructor({
    data,
    id,
    entireWidth,
    entireHeight,
  }: {
    id: string;
    data: Data;
    entireWidth: number;
    entireHeight: number;
  }) {
    this.selectedDateRange = {
      from: undefined,
      to: undefined,
    };
    this.pause = false;
    this.id = id;
    this.formatedData = data.filter((item) => item.usd && item.date);

    this.margins = {
      top: 50,
      bot: 50,
      left: 100,
      right: 250,
    };

    this.chartWidth = entireWidth - this.margins.left - this.margins.right;
    this.chartHeight = entireHeight - this.margins.top - this.margins.bot;
    this.index = 0;
    this.xScale = d3.scaleTime().range([0, this.chartWidth]);
    this.yScale = d3.scaleLinear().range([this.chartHeight, 0]);
    this.mainSvg = d3
      .select(`#${id}`)
      .append("svg")
      .attr("width", entireWidth)
      .attr("height", entireHeight);
    this.chartGroup = this.mainSvg
      .append("g")
      .attr("transform", `translate(${this.margins.left},${this.margins.top})`);

    this.yAxisScaleLabelGroup = this.chartGroup
      .append("g")
      .attr("class", "yAxisLabel");
    this.xAxisScaleLabelGroup = this.chartGroup
      .append("g")
      .attr("class", "xAxisLabel")
      .attr("transform", `translate(0,${this.chartHeight})`);
    this.path = this.chartGroup
      .append("path")
      .attr("stroke", "black")
      .attr("fill", "transparent");

    this.update();
  }
  update() {
    const t = d3.transition().duration(300);
    this.yScale = this.yScale.domain([
      0,
      d3.max(this.formatedData, (d) => d.usd) || 0,
    ]);

    this.xScale = this.xScale.domain([
      d3.min(this.formatedData, (d) => d.date) || 0,
      d3.max(this.formatedData, (d) => d.date) || 0,
    ]);
    //create yAxisCall to new yScale domain
    const yAxisCall = d3.axisLeft(this.yScale);
    this.yAxisScaleLabelGroup.transition(t).call(yAxisCall);
    //create xAxisCall to new xScale domain
    const xAxisCall = d3.axisBottom(this.xScale);

    const line = d3
      .line<DataInput>()
      .x((d) => this.xScale(d.date) || 0)
      .y((d) => this.yScale(d.usd) || 0);

    this.xAxisScaleLabelGroup
      .transition(t)
      .call(xAxisCall)
      .selectAll("text")
      .attr("y", "10")
      .attr("x", "-5")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)");
    this.path.transition(t).attr("d", line(this.formatedData));
    this.chartGroup.selectAll("circle").remove();
    const circles = this.chartGroup
      .selectAll<SVGCircleElement, DataInput>("circles")
      .data<DataInput>(this.formatedData, (d) => {
        return d.id;
      });

    circles.exit().remove();

    circles
      .enter()
      .append("circle")
      .attr("cx", (d) => this.xScale(d.date || 0))
      .attr("cy", (d) => this.yScale(d.usd || 0))
      .attr("r", 5)
      .attr("id", (d) => d.id)
      .attr("stroke", "invisible")
      .attr("stroke-width", 10.5)
      .attr("fill-opacity", 0)
      .on("mouseenter", (_, node) => {
        const hoverGroup = this.chartGroup
          .append("g")
          .attr("class", "hover-group");
        hoverGroup
          .append("line")
          .attr("x1", 0)
          .attr("x2", this.xScale(node.date))
          .attr("y1", this.yScale(node.usd))
          .attr("y2", this.yScale(node.usd))
          .attr("stroke", "black")
          .attr("stroke-dasharray", "5");
        hoverGroup
          .append("line")
          .attr("x1", this.xScale(node.date))
          .attr("x2", this.xScale(node.date))
          .attr("y1", this.chartHeight)
          .attr("y2", this.yScale(node.usd))
          .attr("stroke", "black")
          .attr("stroke-dasharray", "5");
        const tooltip = hoverGroup
          .append("g")
          .attr("class", "tooltipBox")
          .attr(
            "transform",
            `translate(${this.xScale(node.date || 0)},${this.yScale(
              node.usd || 0,
            )})`,
          );
        const box = tooltip
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .style("fill", "grey")
          .attr("stroke-width", "1.5")
          .attr("stroke", "black");
        const words = tooltip.append("g");
        words
          .append("text")
          .attr("y", 1 * 15)
          .attr("x", 5)
          .text(`Date: ${node.date.toDateString()}`)
          .attr("text-anchor", "start");
        words
          .append("text")
          .attr("y", 2 * 15)
          .attr("x", 5)
          .text(`Value: ${node.usd}`)
          .attr("text-anchor", "start");
        box
          .attr("width", (words.node()?.getBBox().width || 0) + 10)
          .attr("height", (words.node()?.getBBox().height || 0) + 5);
        this.chartGroup
          .select("#circle" + node.date.getTime())
          .attr("fill-opacity", 1);
      })
      .on("mouseleave", (_, node) => {
        this.chartGroup.selectAll(".hover-group").remove();
        this.chartGroup
          .select("#circle" + node.date.getTime())
          .attr("fill-opacity", 0);
      })
      .merge(circles)
      .transition(t)
      .attr("cx", (d) => this.xScale(d.date || 0))
      .attr("cy", (d) => this.yScale(d.usd || 0))
      .attr("r", 5);
  }
  setSelectedDateRange(from: Date, to: Date) {
    this.selectedDateRange = {
      from,
      to,
    };
  }
  setData(data: Data) {
    this.formatedData = [...data.filter((item) => item.usd && item.date)];
    this.update();
  }
  remove() {
    clearInterval(this.updateInterval);
    d3.select(`#${this.id} svg`).remove();
  }
}
