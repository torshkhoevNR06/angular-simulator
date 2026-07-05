// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          "accessibility": "explicit",
          "overrides": {
            "accessors": "explicit",
            "methods": "no-public",
            "properties": "no-public",
            "constructors": 'off',
            "parameterProperties": "explicit",
          },
        }
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: 'default',
          format: ['strictCamelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'enum',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        }
      ],
      "@typescript-eslint/no-inferrable-types": ['off'],
      "no-console": [
        "warn",
        {
          "allow": [
            "warn",
            "error",
            "group",
            "groupCollapsed",
            "groupEnd"
          ]
        }
      ],
      "padded-blocks": [
        "warn",
        {
          "blocks": "never",
          "classes": "always"
        }
      ],
      "quotes": [
        "warn",
        "single",
        {
          "allowTemplateLiterals": true
        }
      ],
      "object-curly-spacing": [
        "warn",
        "always"
      ],
      "template-curly-spacing": [
        "warn",
        "always",
      ],
      "no-template-curly-in-string": "error",
      "semi": [
        "warn",
        "always",
        {
          "omitLastInOneLineBlock": true,
          "omitLastInOneLineClassBody": true
        }
      ],
      "lines-between-class-members": [
        "warn",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
      "semi-style": ["error", "last"],
      "semi-spacing": ["warn", { "before": false, "after": true }],
      "no-extra-semi": "warn",
      "comma-dangle": ["warn", "never"],
      "space-in-parens": ["warn", "never"],
      "block-spacing": "warn",
      "no-multi-spaces": "warn",
      "indent": ["warn", 2]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility
    ],
    rules: {
      "@angular-eslint/template/banana-in-box": [
        "error"
      ],
      "@angular-eslint/template/eqeqeq": [
        "warn"
      ],
      "@angular-eslint/template/prefer-self-closing-tags": [
        "error"
      ],
    },
  }
]);