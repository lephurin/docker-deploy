const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000", // Or your SonarQube server URL
    token: "YOUR_SONARQUBE_TOKEN",
    options: {
      "sonar.sources": "src",
      "sonar.tests": "__tests__",
      "sonar.test.inclusions": "**/*.test.ts,**/*.test.tsx",
      "sonar.javascript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.projectKey": "your-project-key",
      "sonar.projectName": "Your Project Name",
    },
  },
  () => process.exit()
);
