/** @type {import('ts-jest').JestConfigWithTsJest} */
import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["config"],
  // globalSetup: "<rootDir>/config/test/global.setup.ts",
  // globalTeardown:  "<rootDir>/config/test/global.teardown.ts"
}
export default config;
