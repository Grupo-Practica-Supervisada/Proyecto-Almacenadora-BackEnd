const { Schema, model } = require('mongoose');

const ListaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    fechaInicio: {
        type: Date,
        required: [true, 'La fecha de inicio es obligatoria']
    },
    fechaFinal: {
        type: Date,
        required: [true, 'La fecha de final es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatorio']
    },
    estado:{
        type: Boolean, //Colocar en el post si pone completa que sea === true
        default: false
    },
    creador:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario', 
    },
});

module.exports = model('Lista', ListaSchema);