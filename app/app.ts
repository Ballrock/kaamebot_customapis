import * as fs from 'fs';
import * as restify from 'restify';
import { settings } from './config/config';
import { logger } from './services/logger';
import { Route } from './types';
import { Common } from './utils/common';

export let api: restify.Server = restify.createServer({
  name: settings.name
});
restify.plugins.fullResponse();
// restify.CORS.ALLOW_HEADERS.push('authorization');
// api.use(restify.CORS());
api.pre(restify.pre.sanitizePath());
api.use(restify.plugins.acceptParser(api.acceptable));
api.use(restify.plugins.bodyParser());
api.use(restify.plugins.queryParser());
api.use(restify.plugins.authorizationParser());
api.use(restify.plugins.fullResponse());

logger.info('INFO: Generic routes generation');
// Generic Routes from /routes/routes.json
let genericroutes: Array<Route> = JSON.parse(
  fs.readFileSync('app/routes/routes.json', 'utf8')
);
genericroutes.forEach(route =>
  Common.generateGenericRoute(
    api,
    route.quotesfile,
    route.endpoint,
    route.source
  )
);

logger.info('\nINFO: Customs routes generation');
// Custom Routes in /routes/customs (with custom Controller for exemple)
fs.readdirSync(__dirname + '/routes/customs').forEach(function(
  routeConfig: string
) {
  if (routeConfig.substr(-3) === '.js') {
    let route = require(__dirname + '/routes/' + routeConfig);
    route.routes(api);
  }
});
logger.info('');

api.listen(settings.port, function() {
  logger.info(`INFO: ${settings.name} is running at ${api.url}`);
});
