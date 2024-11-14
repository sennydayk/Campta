/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // WebAssembly 지원 추가
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // WebAssembly 파일을 처리하기 위한 로더 설정
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    return config;
  },
};

module.exports = nextConfig;
