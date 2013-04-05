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
