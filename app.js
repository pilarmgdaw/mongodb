const express = require('express'); // Importar Express
const app = express(); // Crear la aplicación Express

app.use(express.static('public')); // Middleware para servir archivos estáticos
app.use(express.json()); // Middleware para analizar JSON

const port = process.env.PORT || 80;

const listaProductos = [
    {
        id: 1,
        nombre: 'Laptop',
        precio: 1000
    },
    {
        id: 2,
        nombre: 'Sobremesa',
        precio: 2000
    }
];

app.get('/producto', (req, res) => {
    res.json(listaProductos);
});

app.post('/consulta', (req, res) => {
    const { categoria, color } = req.body;
    res.send(`Categoría: ${categoria}, Color: ${color}`);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

