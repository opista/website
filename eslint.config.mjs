import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals"),

    plugins: {
        "simple-import-sort": simpleImportSort,
        "unused-imports": unusedImports,
    },

    rules: {
        "simple-import-sort/imports": ["error", {
            groups: [
                ["^\\u0000"],
                ["^react$", "^@?\\w"],
                ["^@", "^"],
                ["^\\./"],
                ["^.+\\.(module.css|module.scss)$"],
                ["^.+\\.(gif|png|svg|jpg)$"],
            ],
        }],

        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",

        "unused-imports/no-unused-vars": ["warn", {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],
    },
}]);