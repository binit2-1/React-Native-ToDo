const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname);

// Disable unstable_allowRequireContext for better compatibility
config.resolver = {
  ...config.resolver,
  unstable_enablePackageExports: true,
};
 
module.exports = withNativeWind(config, { input: './app/globals.css', inlineRem: 16 });