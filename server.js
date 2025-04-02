const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const products = [
    { id: 1, name: "TV", price: 1200 },
    { id: 2, name: "PC", price: 2000 },
    { id: 3, name: "Pencil", price: 5 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: "This product is not available ;(" });
    }
    res.json(product);
});


app.post("/products", (req, res) => {
    const { id, name, price } = req.body;

    
    if (products.some(p => p.id === id)) { // Check if the ID already exists
        // If it exists, return a 400 error like in the teorical part :p
        return res.status(400).json({ error: "El ID ya existe" });
    }

    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
