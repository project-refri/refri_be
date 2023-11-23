const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage',
  ];

  return {
    ...options,
    mode: 'production',
    externals: [
      {
        kafkajs: 'commonjs kafkajs',
        nats: 'commonjs nats',
        mqtt: 'commonjs mqtt',
        ioredis: 'commonjs ioredis',
        amqplib: 'commonjs amqplib',
        'amqp-connection-manager': 'commonjs amqp-connection-manager',
        saslprep: "require('saslprep')",
      },
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    plugins: [
      ...options.plugins,
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `./node_modules/.prisma/client/libquery*.node`,
            to({ context, absoluteFilename }) {
              return `./apps/api-bundled/.prisma/client/${absoluteFilename
                .split('/')
                .pop()}`;
            },
          },
        ],
      }),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
