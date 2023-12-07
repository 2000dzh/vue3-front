module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ['vue', '@typescript-eslint', 'simple-import-sort'],
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs', '.ts', '.d.ts', '.tsx'] },
    },
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-undef': 'off',
        // 关闭vue组件命名规则
        'vue/multi-word-component-names': 'off'
      },
    },
  ],
  /* 
   * off 或 0    ==> 关闭规则
   * warn 或 1   ==> 打开的规则作为警告(不影响代码执行)
   * error 或 2  ==> 规则作为一个错误(代码不能执行,界面报错)
  */
  rules: {
    //  eslint-plugin-simple-import-sort 定义导入导出规则
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^vue$', '^vue-router$', '^@vueuse/core$', '^axios$', '^element-plus$', '^lodash-es$'],
          [`.*\\.vue$`], // .vue 文件
          [`.*/components/.*`, `^@/components$`],
          [`.*/api/.*`, `^@/api$`],
          [`.*/utils/.*`, `^@/utils$`],
          [`.*/hooks/.*`, `^@/hooks$`],
          [`.*/store/.*`, `^@/store$`],
          [`.*/router/.*`, `^@/router$`],
          [`.*/enums/.*`, `^@/enums$`],
          [`.*/assets/.*`, `^@/assets$`],
          [`^`],
          [`^type`],
        ]
      }
    ],
    'simple-import-sort/exports': 'error', // 导出
    // 'import/no-duplicates': 'error',// 合并同一个导入。ide自动导入，会导致impoprt {a} from 'A'和impoprt {a1} from 'A'导入2次
    // 'import/first': 'error', // 确保所有导入位于文件的顶部

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用any
    "@typescript-eslint/ban-types": "off", // 禁止使用内置类型

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off' // 不允许组件 prop的改变
  },

}
