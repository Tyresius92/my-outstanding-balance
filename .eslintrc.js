module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: ["error", 2],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-console": "error",
        "array-callback-return": "error",
        complexity: ["error", 15],
        "consistent-return": "error",
        curly: "error",
        "default-case": "error",
        "default-param-last": "error",
        "dot-location": ["error", "property"],
        "dot-notation": "error",
        eqeqeq: "error",
        "no-alert": "error",
        "no-else-return": ["error", { allowElseIf: false }],
        "no-empty-function": "error",
        "no-eval": "error",
        "no-floating-decimal": "error",
        "no-lone-blocks": "error",
        "no-var": "error",
        "no-magic-numbers": "error",
        "no-param-reassign": "error",
        "no-return-assign": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "error",
        yoda: "error",
        "no-undefined": "error"
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
