import { Quote } from '../types';
import { logger } from '../services/logger';
import * as restify from 'restify';
import GenericQuotesApiController from '../controllers/GenericQuotesApiController';

export abstract class Common {
  public static readonly URI_PREFIX: String = '/api/';

  public static randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getRandomQuote(quotes: Array<Quote>, source?: string): Quote {
    let quote: Quote;
    if (quotes && quotes.length) {
      quote = quotes[Common.randomInt(0, quotes.length - 1)];
      if (source) {
        quote.source = source;
      }
    } else {
      throw new Error('Error on quotes retrieve');
    }
    return quote;
  }

  public static generateGenericRoute(
    api: restify.Server,
    quotesfile: string,
    endpoint: string,
    source?: string
  ) {
    const routeCtrl = new GenericQuotesApiController(quotesfile, source);
    const finaluri = Common.URI_PREFIX + endpoint;
    api.get(
      finaluri,
      (req: restify.Request, res: restify.Response, next: restify.Next) =>
        routeCtrl.get(req, res, next)
    );
    logger.info(
      'ROUTE: Generate generic route @' +
        finaluri +
        ' with quotes file "' +
        quotesfile +
        '.json"'
    );
  }
}
