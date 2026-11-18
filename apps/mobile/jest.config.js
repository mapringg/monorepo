module.exports = {
  preset: "jest-expo",
  testMatch: ["<rootDir>/src/**/*.test.ts?(x)"],
  moduleNameMapper: {
    "^@react-native-community/netinfo$": "<rootDir>/node_modules/@react-native-community/netinfo/jest/netinfo-mock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(?:.pnpm/[^/]+/node_modules/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|expo-router|@shopify/flash-list|@rn-primitives/.*|uniwind|hono|@tanstack/.*))",
  ],
};
