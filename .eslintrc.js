module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "@vue/typescript"
    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prefer-const": ["error"],
        "vue/multi-word-component-names": ["off"],
        "quotes": ["warn", "double"],
        "semi": ["warn"]
    },

    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "@typescript-eslint/parser"
    }
};
