import { Config } from '../types';

let env = process.env.NODE_ENV || 'development';

export let settings: Config = {
  name: 'kaamebot_customapis',
  version: '1.0.0',
  port: 8081,
  env: 'dev'
};

if (env === 'production') {
  settings.env = 'prod';
}
