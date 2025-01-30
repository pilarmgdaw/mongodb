const express = require("express");
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Importar el módulo Alimento
const moduloAlimento = require('./models/alimento');

// Datos de ejemplo (simulando una base de datos)
let alimentos = [
  { id: 1, nombre: "Manzana", precio: 1.2, categoria: "Fruta", color: "Rojo" },
  { id: 2, nombre: "Zanahoria", precio: 0.8, categoria: "Verdura", color: "Naranja" },
  { id: 3, nombre: "Lechuga", precio: 1.0, categoria: "Verdura", color: "Verde" },
];

// Obtener todos los alimentos
app.get("/alimentos", (req, res) => {
  moduloAlimento.buscaTodos()
    .then(alimentos => res.json(alimentos))
    .catch(err => res.status(500).json({ "error": err }));
});

// Obtener un alimento por ID
app.get("/alimentos/:id", (req, res) => {
  const alimentoId = req.params.id;  // Usamos el ID como string
  moduloAlimento.buscaPorId(alimentoId)
    .then(alimento => {
      if (alimento) {
        res.json(alimento);
      } else {
        res.status(404).json({ message: "Alimento no encontrado" });
      }
    })
    .catch(err => res.status(500).json({ "error": err }));
});

// Crear un nuevo alimento
app.post("/alimentos", (req, res) => {
  const { nombre, precio, categoria, color } = req.body;
  const nuevoAlimento = new moduloAlimento({
    nombre,
    precio,
    categoria,
    color
  });

  nuevoAlimento.save()
    .then(alimento => res.status(201).json(alimento))
    .catch(err => res.status(500).json({ "error": err }));
});

// Actualizar un alimento existente
app.put("/alimentos/:id", (req, res) => {
  const alimentoId = req.params.id;
  const { nombre, precio, categoria, color } = req.body;

  moduloAlimento.findByIdAndUpdate(alimentoId, { nombre, precio, categoria, color }, { new: true })
    .then(alimentoActualizado => {
      if (alimentoActualizado) {
        res.json(alimentoActualizado);
      } else {
        res.status(404).json({ message: "Alimento no encontrado" });
      }
    })
    .catch(err => res.status(500).json({ "error": err }));
});

// Eliminar un alimento
app.delete("/alimentos/:id", (req, res) => {
  const alimentoId = req.params.id;
  
  moduloAlimento.findByIdAndRemove(alimentoId)
    .then(alimentoEliminado => {
      if (alimentoEliminado) {
        res.json(alimentoEliminado);
      } else {
        res.status(404).json({ message: "Alimento no encontrado" });
      }
    })
    .catch(err => res.status(500).json({ "error": err }));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
