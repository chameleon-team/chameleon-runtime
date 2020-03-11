module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'type-enum': [2, 'always', [
          "feat", "fix", "polish", "docs", "style", "refactor", "perf", "test", "workflow", "ci", "chore", "types", "revert"
        ]],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
     }
};
