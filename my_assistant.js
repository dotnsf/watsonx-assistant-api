//. my_assistant.js
var AssistantV2 = require( 'ibm-watson/assistant/v2' );
var { IamAuthenticator } = require( 'ibm-watson/auth' );

require( 'dotenv' ).config();
var API_KEY = 'API_KEY' in process.env && process.env.API_KEY ? process.env.API_KEY : '';
var SERVICE_URL = 'SERVICE_URL' in process.env && process.env.SERVICE_URL ? process.env.SERVICE_URL : '';

exports.assistant = new AssistantV2({
  version: '2024-08-25',
  authenticator: new IamAuthenticator({
    apikey: API_KEY
  }),
  serviceUrl: SERVICE_URL
});

