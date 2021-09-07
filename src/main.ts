import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { listenForApis } from "./api"
import {corsOptions, DatabaseService } from './utils'


// The Express app is exported so that it can be used by serverless Functions.
export function app ()
{
  const server = express();
  server.use( cors( corsOptions ) );
  server.use( ( req, res, next ) =>
  {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT" );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,access-token,Access-Control-Allow-Methods,grant_type"
    );
    next();
  } );
  // gzip
  server.use( compression() );
  // cokies
  server.use( cookieParser() );
  server.use( bodyParser.json( { limit: "50mb" } ) );
  server.use( bodyParser.urlencoded( { limit: "50mb", extended: true } ) );

  listenForApis( server );

  return server;
}

function run ()
{
  const port = process.env.APP_PORT || 4001;
  DatabaseService.initialize();
  // Start up the Node server
  const server = app();
  server.listen( port, () =>
  {
    console.log( `Node Express server listening on http://localhost:${ port }` );
  } );
}

run();
