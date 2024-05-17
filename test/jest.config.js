module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["**/path/to/your/code/**/*.js"], // Specify the paths to include in coverage
  coverageDirectory: "coverage", // Directory to output coverage reports
  coverageReporters: ["json", "lcov", "text", "clover"], // Types of reports to generate
};
