import Icons from "unplugin-icons/webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.freepnglogos.com",
        pathname: "**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "aqua-tricky-mammal-620.mypinata.cloud",
        pathname: "**",
        port: "",
      },
    ],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };
    config.plugins.push(
      Icons({
        compiler: "jsx",
        jsx: "react",
        autoInstall: true,
      }),
    );
    return config;
  },
};

export default nextConfig;
