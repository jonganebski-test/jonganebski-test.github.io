module.exports =
  process.env.NODE_ENV === "production"
    ? {
        basePath: "/jonganebski-test.github.io",
        assetPrefix: "/jonganebski-test.github.io",
      }
    : {
        basePath: "",
        assetPrefix: "",
      };
