export interface Config {
  name: string;
  port: number;
  env: string;
  version: string;
}

export interface Route {
  quotesfile: string;
  endpoint: string;
  source: string;
  description: string;
}

export interface Quote {
  quote: string;
  author: string;
  source: string;
}
