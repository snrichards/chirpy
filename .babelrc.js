module.exports = {
  presets: [
    "@babel/env",
    "@babel/react",
    [
      "@babel/stage-2",
      {
        "decoratorsLegacy": true,
      },
    ],
  ],
};