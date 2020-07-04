const webpackConfig = require('../build/webpack.test.conf');

module.exports = function(config) {
  const files = ['./files.js'];
  config.components === 'all' ? files.push('./specs/*.spec.js') : config.components.forEach(componentName => files.push(`./specs/${componentName}.spec.js`));

  const preprocessors = {};
  files.forEach(file => {
    preprocessors[file] = ['webpack', 'sourcemap']
  })
  const configuration = {
    browsers: ['Chrome'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files,
    preprocessors,
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    // coverageReporter: {
    //   dir: './coverage',
    //   reporters: [
    //     { type: 'lcov', subdir: '.' },
    //     { type: 'text-summary' }
    //   ]
    // },
    client: {
      mocha: {
        timeout: 4000
      }
    }
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
