module.exports =
  process.env.NODE_ENV === "production"
    ? {
        basePath: "",
        assetPrefix: "/jonganebski-test.github.io",
      }
    : {
        basePath: "",
        assetPrefix: "",
      };
