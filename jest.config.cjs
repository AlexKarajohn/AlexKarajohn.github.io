module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: "https://jestjs.io/",
    userAgent: "Agent/007",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/util/testing/fileMock.ts",
    "src/(.*)": "<rootDir>/src/$1",
    "^d3$": "<rootDir>/node_modules/d3/dist/d3.min.js",
  },
  coverageThreshold: {
    // global: {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100,
    // },
  },
  coveragePathIgnorePatterns: ["<rootDir>/src/util/testing/*"],
};
