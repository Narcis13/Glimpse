module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './components',
            '@screens': './screens',
            '@services': './services',
            '@utils': './utils',
            '@types': './types',
            '@constants': './constants',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
};