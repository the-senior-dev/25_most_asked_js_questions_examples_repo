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

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
