import * as restify from 'restify';
import { logger } from '../services/logger';
import * as fs from 'fs';
import { Common } from '../utils/common';

export default class GenericQuotesApiController {
  public quotes: any;
  public source: string = '';
  public quotesfile: string;

  constructor(quotesfile: string, source: string) {
    if (quotesfile && quotesfile !== '') {
      this.quotesfile = quotesfile;
      this.quotes = JSON.parse(
        fs.readFileSync('app/datas/' + this.quotesfile + '.json', 'utf8')
      );
    } else {
      Error("name parameter can't be null");
    }

    this.source = source;
  }

  public get(req: restify.Request, res: restify.Response, next: restify.Next) {
    const quote = Common.getRandomQuote(this.quotes, this.source);

    logger.info(
      'Access to data ' + this.quotesfile + ' (source:' + this.source + ')'
    );

    res.json(200, quote);

    return next();
  }
}
