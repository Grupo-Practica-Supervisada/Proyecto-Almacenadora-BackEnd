const { Schema, model } = require('mongoose');

const ListaSchema = Schema({
    nombre: {
        type: String,
    },
    fechaInicio: {
        type: Date,
    },
    fechaFinal: {
        type: Date,
    },
    descripcion: {
        type: String,
    },
    estado:{
        type: Boolean, //Colocar en el post si pone completa que sea === true
        default: false
    },
    creador:{
        type: String,
    },
});

module.exports = model('Lista', ListaSchema);