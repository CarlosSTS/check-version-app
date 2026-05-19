import { getIosVersion } from "./ios";
import { getAndroidVersion } from "./android";

export const lookupVersion = async(platform, bundleId, country = "us") => {
  switch (platform) {
  case "ios":
    return getIosVersion(bundleId, country);
  case "android":
    return getAndroidVersion(bundleId, country);
  default:
    throw new Error("Unsupported platform defined.");
  }
};