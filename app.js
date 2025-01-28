// Using Node.js `require()`
const mongoose = require('mongoose');
const buscaPrimero = ()=>{
  Ordenador.findOne()
.then(ordenador=>{
  if(ordenador){
    console.log('primer ordenador encontrado', ordenador)
  }else{
    console.log('no se encontró ningún registro')
  }
})
.catch(err=>console.error('Error al obtener el ordenador', err));
}
const buscaTodos= ()=>{
  Ordenador.find()
.then(ordenadores=>{
  if(ordenadores.length>0){
    console.log('ordenadores encontrados', ordenadores)
  }else{
    console.log('no se encontró ningún registro')
  }
})
.catch(err=>console.error('Error al obtener los ordenadores', err));
}
const buscaPorId= (id)=>{
  Ordenador.findById(id)
.then(ordenador=>{
  if(ordenador){
    console.log('primer ordenador encontrado', ordenador)
  }else{
    console.log('no se encontró ningún registro con el id'+id)
  }
})
.catch(err=>console.error('Error al obtener el ordenador', err));
}
mongoose.connect('mongodb+srv://pilarmolinadaw:JMkNvXpkKlfD81DE@cluster0.j4bq5.mongodb.net/almacen')
  .then(() => console.log('Connected!'));

const ordenadorSchema =new mongoose.Schema({
  marca: String, 
  precio: Number
});

const buscaPrecioMayor= ()=>{
  Ordenador.find({precio: { $gt:1000}})
.then(ordenadores=>{
  if(ordenadores.length>0){
    console.log('ordenadores encontrados con precio mayor a 300', ordenadores)
  }else{
    console.log('no se encontró ningún registro')
  }
})
.catch(err=>console.error('Error al obtener los ordenadores', err));
}
const Ordenador = mongoose.model('Ordenadore', ordenadorSchema,'ordenadores');

buscaPrimero();

const idBuscado ='6792901772e779a9f4f26d32'
buscaTodos();
buscaPorId(idBuscado);
buscaPrecioMayor();


 // Crear un nuevo ordenador
 const nuevoOrdenador = new Ordenador({
  marca: 'Apple',
  precio: 3000
});
// Guardar el ordenador en la base de datos
nuevoOrdenador.save()
  .then(ordenador => console.log('Ordenador guardado:', ordenador))
  .catch(err => console.error('Error al guardar el ordenador:', err));
 
// Actualizar un ordenador
const idOrdenador = '679149758be34bca122b2575';
const nuevoPrecio = 9000;
//el tercer parametro ( { new: true } ) es para que devuelva el documento actualizado
Ordenador.findByIdAndUpdate(idOrdenador, { precio: nuevoPrecio }, { new: true })
  .then(ordenadorActualizado => {
    if (ordenadorActualizado) {
      console.log('Ordenador actualizado:', ordenadorActualizado);
    } else {
      console.log('No se encontró ningún ordenador con ese ID.');
    }
  })
  .catch(err => console.error('Error al actualizar el ordenador:', err));
    // Eliminar un ordenador
const idOrdenadorParaBorrar = '679149758be34bca122b2575';
Ordenador.findByIdAndDelete(idOrdenadorParaBorrar)
  .then(ordenadorEliminado => {
    if (ordenadorEliminado) {
      console.log('Ordenador eliminado:', ordenadorEliminado);
    } else {
      console.log('No se encontró ningún ordenador con ese ID.');
    }
  })
  .catch(err => console.error('Error al eliminar el ordenador:', err));
  //insertar varios registros
  // Datos de los ordenadores a insertar
const ordenadores = [
  { marca: 'Asus',  precio: 2800 },
  { marca: 'Lenovo', precio: 2000 }
];
// Insertar los ordenadores
Ordenador.create(ordenadores)
  .then(ordenadoresCreados => {
    console.log('Ordenadores creados:', ordenadoresCreados);
  })
  .catch(err => console.error('Error al crear los ordenadores:', err));

