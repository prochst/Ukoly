# GraphQL server

Serverová část jednoduché aplikace pro správu úkolů, která slouží k výuce Vuejs, Typescriptu a GraphQL

## Popis

Server je NodeJS aplikace, která publikuje data přes GraphQL API. K uložení dat na serveru není použita databáze ale data jsou uložena v JSON souboru.

Datový model:

```
type Ukol {
  id: Int!
  popis: String!
  splneny: Boolean!
  dulezity: Boolean
  datum: Date
  poznamka: String
}
```

## Použité technologie

[NodeJS](https://nodejs.org/), [GraphQL](https://graphql.org/), [Express](https://expressjs.com/)

## Project setup

```
npm install
```

### Run server

```
npm run serve
```

## Licence

Distributed under the MIT License. See license.txt for more information.

## Contact

Autor: Standa Procházka - prochst.dev@gmmail.com

Projekt: [GitHub](https://github.com/prochst/Ukoly)
