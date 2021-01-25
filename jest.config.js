module.exports = {
  // tell Jest to handle `*.vue` files
  moduleFileExtensions: ["js", "json", "vue"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  globalSetup: "<rootDir>/jest-nuxt.setup.js", // this line is the only change here
  watchman: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',

  },
  transform: {
    // process js with `babel-jest`
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    // process `*.vue` files with `vue-jest`
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    'vee-validate/dist/rules': 'babel-jest',
    'vee-validate.js': 'babel-jest'

  },
  transformIgnorePatterns: [
    'node_modules/(?!(vee-validate/dist/rules))',
    '<roodDir>/plugins/vee-validate.js'
  ],
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
   // "<rootDir>/pages/*.vue",
    "<rootDir>/api/*.js",
   // "<rootDir>/stores/*.js"
  ]
};
