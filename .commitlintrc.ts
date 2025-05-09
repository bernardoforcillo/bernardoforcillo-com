import type { UserConfig } from '@commitlint/types';
import { RuleConfigSeverity } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
      ],
    ],
    'scope-case': [RuleConfigSeverity.Error, 'always', ['lower-case']],
    'subject-case': [
      RuleConfigSeverity.Error,
      'never',
      ['start-case', 'pascal-case'],
    ],
  },
};

export default Configuration;
