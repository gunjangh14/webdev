function getBalanceAndPositions(authtoken, acctnumber){

}

// Mock Request Responses can be made from here
function makeTDARequest(url, postdata, authtoken, session-id){

    if (authtoken === mock.token){
        return mock.makeMockRequest( url, postdata, authtoken, session-id);
    }

    var response = {};
    return response;
}

function getQuoteSnapShot(symbol[]){
    // This takes a symbol array as an input because you can have more than one input to the api
    // logic should check the symbol quote cache first before requesting fresh data.  This call may make sense to be made in
    // in a worker thread if it exists

}

function getSymbolLookup(text){
 // using market on demand here becuase it is better and does note require login
}


