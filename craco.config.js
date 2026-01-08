module.exports = {
  webpack: {
    configure: (config) => {
      // 1) Exclude docx-preview from CRA's source-map-loader (the real fix)
      config.module.rules = (config.module.rules || []).map((rule) => {
        if (!rule || rule.enforce !== "pre" || !rule.use) return rule;

        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        const hasSourceMapLoader = uses.some((u) => {
          const loader = typeof u === "string" ? u : u && u.loader;
          return loader && loader.includes("source-map-loader");
        });

        if (!hasSourceMapLoader) return rule;

        const prevExclude = rule.exclude
          ? Array.isArray(rule.exclude)
            ? rule.exclude
            : [rule.exclude]
          : [];

        rule.exclude = [...prevExclude, /node_modules[\\/]+docx-preview/];
        return rule;
      });

      // 2) Belt + suspenders: ignore any remaining docx-preview sourcemap warnings
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        (warning) => {
          const msg = warning && (warning.message || warning);
          return (
            /Failed to parse source map/i.test(String(msg)) &&
            /docx-preview/i.test(String(msg))
          );
        },
      ];

      return config;
    },
  },
};
