module.exports = {
  root: true,
 overrides: [
    {
      files: ["**/*.*"],
      rules: {
        // Disables all rules
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // Disable your local rules too
        "local-rules/one-node-per-file": "off",
        "local-rules/only-node-exports": "off",
      },
    },
  ]
};
