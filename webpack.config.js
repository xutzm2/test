const path = require('path');

module.exports = {
  // Другие настройки Webpack...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // '@' указывает на папку 'src'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],  // Убедитесь, что включены все необходимые расширения
  },
  // Другие настройки Webpack...
};
