//. assistant.js
var my = require( './my_assistant' );

require( 'dotenv' ).config();
var ASSISTANT_ID = 'ASSISTANT_ID' in process.env && process.env.ASSISTANT_ID ? process.env.ASSISTANT_ID : '';

async function assistantConversation( texts ){
  return new Promise( async ( resolve, reject ) => {
    var response_text = '';
    var context = null;
    for( var i = 0; i < texts.length; i ++ ){
      var params = {
        assistantId: ASSISTANT_ID,
        //sessionId: session_id,
        input: {
          message_type: 'text',
          text: texts[i]
        }
      };

      var r = null;
      if( context ){ 
        params.context = context; 
      }
      r = await my.assistant.messageStateless( params );
      //console.log( JSON.stringify( r, null, 2 ) );

      if( r && r.status && r.status == 200 && r.result && r.result.output ){
        var output = r.result.output;
        context = r.result.context;

        var generics = output.generic;
        for( var j = 0; j < generics.length; j ++ ){
          var generic = generics[j];
          var generic_text = generic.text;
          if( j > 0 ){ response_text += "\n"; }
          response_text += generic_text;
        }
      }
    }
    resolve( response_text );
  });
}

if( process.argv.length < 3 ){
  console.log( 'Usage: node assistant [text0,text1,..]' );
  process.exit( 0 );
}else{
  var session_id = '';
  var texts = process.argv[2].split( ',' );
  setTimeout( async function(){
    var response_text = await assistantConversation( texts ); 
    console.log( {response_text} );
    process.exit( 0 );
  }, 10 );
      /*
  "result": {
    "output": {
      "intents": [
        {
          "intent": "order",
          "confidence": 1
        }
      ],
      "entities": [],
      "generic": [
        {
          "response_type": "text",
          "text": "何になさいますか？"
        }
      ]
    },
    "user_id": "66013c6b-feb8-4943-be0f-75d87782bbca",
    "context": {
      "global": {
        "system": {
          "session_start_time": "2024-11-27T07:54:06.306Z",
          "turn_count": 1,
          "user_id": "66013c6b-feb8-4943-be0f-75d87782bbca",
          "state": "eyJza2lsbHMiOlt7ImNvbmZpZyI6eyJhY3Rpb25zIjpmYWxzZSwid29ya3NwYWNlX2lkIjoiZDUyOTQyZGYtODAyYS00ZmRhLTlmNGItMmU0YzVlNDEyMjk1Iiwic2tpbGxfcmVmZXJlbmNlX2lkIjpudWxsfSwiZGlzYWJsZWQiOm51bGwsImxhbmd1YWdlIjoiamEiLCJza2lsbF9pZCI6ImQ1Mjk0MmRmLTgwMmEtNGZkYS05ZjRiLTJlNGM1ZTQxMjI5NSIsInNraWxsX3R5cGUiOiJkaWFsb2ciLCJza2lsbF9yZWZlcmVuY2UiOiJtYWluIHNraWxsIiwic2tpbGxfc25hcHNob3RfaWQiOm51bGwsInNraWxsX3NuYXBzaG90X25hbWUiOm51bGx9XSwibGFuZ3VhZ2UiOm51bGwsInJ1bnRpbWVfaWQiOiJkYjI2NWRiNC1iM2NiLTQxYzQtYjJmYi1mNGIwMTA0OWRkNzciLCJpbnN0YW5jZV9pZCI6IjNlM2E1Y2EwLTk4NDYtNGRlYS04YjA5LTcyY2Y2ZjliYzRjZiIsImFzc2lzdGFudF9pZCI6ImRiMjY1ZGI0LWIzY2ItNDFjNC1iMmZiLWY0YjAxMDQ5ZGQ3NyIsImNlcnRpZmljYXRlcyI6W10sImRpc2FibGVfZmFsbGJhY2siOnRydWUsImNlcnRpZmljYXRpb25fbWV0aG9kIjoidW5hdXRob3JpemVkIiwiZGlzYWJsZV9zZXNzaW9uX2hpc3RvcnkiOmZhbHNlLCJzZXNzaW9uX2hpc3RvcnkiOlt7InUiOiLjgqrjg7zjg4Djg7zjgYTjgYTjgafjgZnjgYsiLCJuIjp0cnVlfSx7ImEiOiLkvZXjgavjgarjgZXjgYTjgb7jgZnjgYvvvJ8ifV0sImFjdGl2ZV9za2lsbCI6ImFjdGlvbnMgc2tpbGwifQ=="
        },
        "session_id": "66013c6b-feb8-4943-be0f-75d87782bbca"
 
      */
}
