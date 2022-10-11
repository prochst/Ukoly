const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { GraphQLScalarType } = require("graphql");
const schemaFile = path.join(__dirname, "schema.graphql");
const dataFile = path.join(__dirname, "/data/ukoly.json");
const typeDefs = fs.readFileSync(schemaFile, "utf8");

var app = express();
/** Nutné instalovat balíček npm i --save cors, 
    aby bylo možné přistupovat na API jiné domény nebo portu(CORS pory policy) 
*/
app.use(cors());

let poleUkolu = loadData();
let posledniId = poleUkolu[poleUkolu.length - 1].id;

const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      if (new Date(value) !== "Invalid Date" && !isNaN(new Date(value)))
        return new Date(value);
      else {
        throw new Error("Invalid date format");
      }
    },
    serialize(value) {
      return new Date(value).toJSON();
    },
  }),
  Query: {
    ukol: (_, { id }) => poleUkolu.find((ukol) => ukol.id == id),
    ukoly: () => poleUkolu,
  },

  Mutation: {
    pridejUkol: (_, args) => {
      let novyUkol = {
        id: ++posledniId,
        popis: args.popis,
        splneny: args.splneny,
        dulezity: args.dulezity,
        datum: args.datum,
        poznamka: args.poznamka,
      };
      poleUkolu.push(novyUkol);
      saveData();
      return novyUkol;
    },
    upravUkol: (_, { id, popis, splneny, dulezity, datum, poznamka }) => {
      let opranenyUkol = poleUkolu.find((ukol) => ukol.id == id);
      if (opranenyUkol) {
        opranenyUkol.popis = popis;
        opranenyUkol.splneny = splneny;
        opranenyUkol.dulezity = dulezity;
        opranenyUkol.datum = datum;
        opranenyUkol.poznamka = poznamka;
        saveData();
        return opranenyUkol;
      }
      return poleUkolu.find((ukol) => ukol.id == id);
    },
    odeberUkol: (_, { id }) => {
      let odstranenyUkol = poleUkolu.find((ukol) => ukol.id == id);
      poleUkolu.splice(poleUkolu.indexOf(odstranenyUkol), 1);
      saveData();
      return odstranenyUkol;
    },
  },
};

function saveData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(poleUkolu, null, 2), "utf8");
    //console.log("Data successfully saved to disk");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

function loadData() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

const schema = makeExecutableSchema({ typeDefs, resolvers });

//nastavení express aplikace
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(4000, () =>
  console.log("Spuštění serveru GraphQL API na http://localhost:4000/graphql")
);
