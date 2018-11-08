# Kaamebot Customs APIs

Expose custom quotes APIs for Kaamebot usage (https://github.com/clement-brodu/kaamelott-bot)

## APIs

- DevQuotes quotes from https://github.com/arnellebalane/devquote
- Classe Américaine from https://fr.wikiquote.org/

## Technical

This project use :

- Typescript <3
- Restify (https://github.com/restify/node-restify)
- bunyan (https://github.com/trentm/node-bunyan)

## TODOs

- [ ] Testing
- [ ] Cloud deployement (test)
- [ ] Error handling

## Usage

### Endpoints

**GET** `/api/classeamericaine`

> Return a random quotes from "La Classe américaine" (1993), a classic french movie, wrote by Michel Hazanavicius and Dominique Mezerette.
>
> _Language : French_

**GET** `/api/devquote`

> Return a random "Developer" quote.
>
> _Language : English_

### Response format

```json
{
	"quote": "Aah… Monde de merde.",
	"author": "George Abitbol",
	"source": "La Classe américaine (1993)"
},
```

## Edit this project

### Add a Generic API

It's possible to simply add generic API witch use a JSON Database.

- Add your database at JSON format in `datas` folder. It must use the following schema :

```json
[
	{
	"quote": "Quote 1",
	"author": "Author 1"
	},
	{
	"quote": "Quote 2",
	"author": "Author 2"
	},
	[...]
]
```

- Register your new API in `routes/routes.json` file on the following format :

```json
{
  "description": "A tiny description of the api",
  "endpoint": "example",
  "quotesfile": "example",
  "source": "Example Test"
}
```

- Reboot the server, it's donne, your API is deploy at `/api/example` it randomly read a quote of `/datas/example.json` file and send this :

```json
{
	"quote": "Randomly selected quote",
	"author": "Random Author",
	"source": "Example Test"
},
```

### Add a custom API

If you need more control of the API and how it retrieve quotes, you can add custom routes that use custom controllers:

- Add custom route in `routes/customs` for example :

```typescript
import * as restify from 'restify';
import CustomApiController from '../controllers/CustomApiController';

function customApi(api: restify.Server) {
  // Custom Api, controlled by custom constroller
  let routeCtrl = new CustomApiController();
  api.get(
    '/api/customapi',
    (req: restify.Request, res: restify.Response, next: restify.Next) =>
      routeCtrl.get(req, res, next)
  );
}

module.exports.routes = customApi;
```

- Add your custom controller in `controllers` folder :

## Thanks

- Thanks to https://github.com/sulhome/restify-typescript-seed for the seed and the inspiration :)
