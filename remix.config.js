/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  future: {
    v2_meta: true,
  },
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
