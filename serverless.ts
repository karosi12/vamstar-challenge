import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'vamstart',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamManagedPolicies: ['arn:aws:iam::aws:policy/AmazonSQSFullAccess'],
  },
  functions: {
    ping: {
      handler: 'api/handler.ping',
      events: [
        {
          http: {
            method: 'get',
            path: '/',
          },
        },
      ],
    },
    addMsgToQueue: {
      handler: 'api/handler.addMsgToQueue',
      events: [
        {
          http: {
            method: 'post',
            path: 'send_to_queue',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
