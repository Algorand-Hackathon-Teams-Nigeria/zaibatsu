const DEV_APP_URL = "https://devapp.zaibatsu.vip";
export const getAppBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.protocol.includes("https")
      ? `${window.location.protocol}//${window.location.host}`
      : DEV_APP_URL;
  }
  return DEV_APP_URL;
};
