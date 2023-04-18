const {response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
    const query = { estado: true };
    const listaUsuarios = await Promise.all([
        Usuario.find(query)
    ]);
    res.json({
        listaUsuarios
    });

}
const getUsuariosId = async (req = request, res = response) => {
    const {id} = req.params
    const listaUsuarios = await Usuario.findById(id)
    res.json({
        listaUsuarios
    });

}

const postUsuario = async (req = request, res = response) => {
    const { nombre, edad, correo, password, apellido, ...resto } = req.body;
    const usuarioGuardadoDB = new Usuario({ nombre, edad, correo, password, apellido, ...resto });
    const salt = bcrypt.genSaltSync();
    usuarioGuardadoDB.password = bcrypt.hashSync(password, salt);
    await usuarioGuardadoDB.save();
    res.json({
        usuarioGuardadoDB
    });

}

const putMiUsuario = async (req = request, res = response) => {
    const id = req.usuario.id;
    const { _id, estado, ...resto } = req.body;
    if ( resto.password ) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }
    const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto, {new: true});
    res.json({
        usuarioEditado
    });
}

const deleteMiUsuario = async(req = request, res = response) => {
    const id = req.usuario.id;
    const usuarioEliminado = await Usuario.findByIdAndDelete( id, {new: true});
        res.status(201).json(usuarioEliminado);
}

module.exports = {
    getUsuarios,
    postUsuario,
    putMiUsuario,
    getUsuariosId,
    deleteMiUsuario
}