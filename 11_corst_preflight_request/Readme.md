# CORS Preflight Request Example

- Backend: Node.js + Express
- Frontend: HTML + JavaScript


# Content Negotiation

- The browser sends a request to the server with the following headers:
    - Accept: application/json
    - Accept-Language: en-US
    - Accept-Encoding: gzip, deflate, br
- The server responds with the following headers:
    - Access-Control-Allow-Origin: *
    - Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
    - Access-Control-Allow-Headers: Content-Type, Authorization
    - Access-Control-Allow-Credentials: true
    - Access-Control-Max-Age: 86400
    

    