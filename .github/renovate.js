module.exports = {

  extends: ["helpers:pinGitHubActionDigests"],
  configMigration: true,
  semanticCommits: "enabled",
  prHourlyLimit: 0,
  prConcurrentLimit: 0,
  rebaseWhen: "behind-base-branch",
  updateNotScheduled: false,
  timezone: "Europe/London",
  schedule: ["* * * * *"],
  ignorePrAuthor: true,
  autodiscover: false,
  repositories: ["SwanseaUniversityMedical/renovate-34889"],
};
