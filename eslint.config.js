// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
        {
          usePrettierrc: true,
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1) React primero
            ['^react$'],
            // 2) RN/Expo
            ['^react-native$', '^expo($|/)'],
            // 3) Libs externas (incluye @scoped pero excluye tus aliases)
            ['^@(?!app|modules|shared|characters|favorites)\\w'],
            ['^\\w'],
            // 4) Tus aliases específicos
            ['^@app(/.*|$)'],
            ['^@modules(/.*|$)'],
            ['^@shared(/.*|$)'],
            ['^@characters(/.*|$)'],
            ['^@favorites(/.*|$)'],
            // 5) Imports desde modules/ directamente
            ['^modules(/.*|$)'],
            // 6) Side-effects
            ['^\\u0000'],
            // 7) Padres ../ y relativos ./
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 8) Estilos
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
]);
