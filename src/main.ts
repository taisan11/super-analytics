//! ©taisan11 2024
import 'https://cdn.jsdelivr.net/gh/ActiveTK/endpoint.js@main/src/client/endpoint.min.js'
endpointjs(function( result ) {
    console.log(result);
    fetch('/api/v1/send/aaa', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(result)});
});