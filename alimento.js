// Importar mongoose
const mongoose = require('mongoose');

// Conectar a MongoDB
mongoose.connect('mongodb+srv://pilarmolinadaw:JMkNvXpkKlfD81DE@cluster0.j4bq5.mongodb.net/almacen')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Definir el esquema del alimento
const alimentoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria: String, // Por ejemplo: Fruta, Verdura, etc.
  color: String // Opcional, para agregar color
});

// Definir el modelo
const Alimento = mongoose.model('Alimento', alimentoSchema, 'alimentos');

// Función para buscar el primer alimento
const buscaPrimero = async () => {
  try {
    const alimento = await Alimento.findOne();
    if (alimento) {
      console.log('📌 Primer alimento encontrado:', alimento);
    } else {
      console.log('⚠️ No se encontró ningún registro');
    }
  } catch (err) {
    console.error('❌ Error al obtener el alimento:', err);
  }
};

// Función para buscar todos los alimentos
const buscaTodos = async () => {
  try {
    const alimentos = await Alimento.find();
    if (alimentos.length > 0) {
      console.log('📌 Alimentos encontrados:', alimentos);
      return alimentos;
    } else {
      console.log('⚠️ No se encontró ningún registro');
      return null;
    }
  } catch (err) {
    console.error('❌ Error al obtener los alimentos:', err);
  }
};

// Función para buscar por ID
const buscaPorId = async (id) => {
  try {
    const alimento = await Alimento.findById(id);
    if (alimento) {
      console.log('📌 Alimento encontrado por ID:', alimento);
      return alimento;
    } else {
      console.log(`⚠️ No se encontró ningún registro con el ID ${id}`);
      return null;
    }
  } catch (err) {
    console.error('❌ Error al obtener el alimento:', err);
  }
};

// Función para buscar alimentos con precio mayor a 1.5
const buscaPrecioMayor = async () => {
  try {
    const alimentos = await Alimento.find({ precio: { $gt: 1.5 } });
    if (alimentos.length > 0) {
      console.log('📌 Alimentos con precio mayor a 1.5:', alimentos);
    } else {
      console.log('⚠️ No se encontró ningún registro');
    }
  } catch (err) {
    console.error('❌ Error al obtener los alimentos:', err);
  }
};

// Ejecutar funciones de búsqueda
buscaPrimero();
buscaTodos();

const idBuscado = '6792901772e779a9f4f26d32'; // Aquí deberías poner un ID real
buscaPorId(idBuscado);
buscaPrecioMayor();

// Crear un nuevo alimento
const nuevoAlimento = new Alimento({
  nombre: 'Tomate',
  precio: 2.0,
  categoria: 'Verdura',
  color: 'Rojo'
});

// Guardar el alimento en la base de datos
nuevoAlimento.save()
  .then(alimento => console.log('✅ Alimento guardado:', alimento))
  .catch(err => console.error('❌ Error al guardar el alimento:', err));

// Actualizar un alimento por ID
const idAlimento = '679149758be34bca122b2575'; // Aquí deberías poner un ID real
const nuevoPrecio = 3.0;

Alimento.findByIdAndUpdate(idAlimento, { precio: nuevoPrecio }, { new: true })
  .then(alimentoActualizado => {
    if (alimentoActualizado) {
      console.log('✅ Alimento actualizado:', alimentoActualizado);
    } else {
      console.log('⚠️ No se encontró ningún alimento con ese ID.');
    }
  })
  .catch(err => console.error('❌ Error al actualizar el alimento:', err));

// Eliminar un alimento por ID
const idAlimentoParaBorrar = '679149758be34bca122b2575'; // Aquí deberías poner un ID real

Alimento.findByIdAndRemove(idAlimentoParaBorrar)
  .then(alimentoEliminado => {
    if (alimentoEliminado) {
      console.log('✅ Alimento eliminado:', alimentoEliminado);
    } else {
      console.log('⚠️ No se encontró ningún alimento con ese ID.');
    }
  })
  .catch(err => console.error('❌ Error al eliminar el alimento:', err));

// Insertar varios registros
const alimentos = [
  { nombre: 'Lechuga', precio: 1.0, categoria: 'Verdura', color: 'Verde' },
  { nombre: 'Manzana', precio: 1.2, categoria: 'Fruta', color: 'Rojo' }
];

Alimento.insertMany(alimentos)
  .then(alimentosCreados => {
    console.log('✅ Alimentos creados:', alimentosCreados);
  })
  .catch(err => console.error('❌ Error al crear los alimentos:', err));
