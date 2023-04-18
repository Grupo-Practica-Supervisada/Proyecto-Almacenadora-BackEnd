
const Usuario = require('../models/usuario');

const moment = require('moment');


const esRoleValido = async( rol = '' ) => {
    const existeRol = await Rol.findOne( { rol } );
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}
const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }
}
const existeUsuarioPorId = async(id) => {
    const existeUser = await Usuario.findById(id);
    if ( !existeUser ) {
        throw new Error(`El usuario con el id ${ id }, no existe en la DB`);
    }
}
const identificacionExiste = async(identificacion = '')=>{
    const existeIdentificacion = await Usuario.findOne({identificacion: identificacion})
    if(existeIdentificacion) {
        throw new Error(`La identificacion ingresada ya se encuentra en la base de datos y le pertenece a ${existeIdentificacion.nombre}`);
    }
}
const esFecha = (value, { req, location, path  }) => {
    if( !value ) {
        return false;
    }
    const fecha = moment( value );
    if( fecha.isValid() ) {
        return true;
    } else {
        return false;
    }

}

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    identificacionExiste,
    esFecha
}