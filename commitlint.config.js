/**
 * build: 项目构建相关提交
 * fix：修补某功能的bug
 * feat：新功能
 * update：更新某功能
 * perf: 性能优化
 * refactor：重构某个功能
 * style：仅样式改动
 * docs：仅文档新增/改动
 * test：新增测试用例或是更新现有测试
 * revert：回滚
 * chore：不属于以上类型的其他类型(日常事务)
 **/

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'fix',
        'feat',
        'update',
        'perf',
        'refactor',
        'style',
        'docs',
        'test',
        'revert',
        'chore',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
