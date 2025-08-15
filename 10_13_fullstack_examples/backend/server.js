const express = require("express");
const cors = require("cors");
const compression = require("compression");

const { products } = require("./data");

const app = express();

app.use(express.json());

// Simplified CORS setup
app.use(cors({
    origin: "http://frontend:3000",
}));

// Compression with Content Negotiation
app.use(compression());

// A REST API endpoint
app.get("/products", (req, res) => {
    res.json(products);
});

// A Versioned API endpoint (URI Versioning)
app.get("/v1/products", (req, res) => {
    res.json(products);
});

app.get("/v2/products", (req, res) => {
    res.json(products);
});



// 4XX Response Status Codes
app.get("/bad-request-route", (req, res) => {
    res.status(400).send("Bad Request");
});

app.get("/protected-route", (req, res) => {
    res.status(401).send("Unauthorized");
});

app.get("/forbidden-route", (req, res) => {
    res.status(403).send("Forbidden");
});

app.get("/not-found-route", (req, res) => {
    res.status(404).send("Not Found");
});


// 5XX Response Status Codes
app.get("/internal-server-error-route", (req, res) => {
    res.status(500).send("Internal Server Error");
});

app.get("/not-implemented-route", (req, res) => {
    res.status(501).send("Not Implemented");
});

app.get("/bad-gateway-route", (req, res) => {
    res.status(502).send("Bad Gateway");
});

app.get("/service-unavailable-route", (req, res) => {
    res.status(503).send("Service Unavailable");
});

app.get("/gateway-timeout-route", (req, res) => {
    res.status(504).send("Gateway Timeout");
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
