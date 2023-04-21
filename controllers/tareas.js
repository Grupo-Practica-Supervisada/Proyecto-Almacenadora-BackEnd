const {response, request} = require('express');

const Tarea = require('../models/tareas');

const getTareas = async (req = request, res = response) => {
    const listaTareas = await
        Tarea.find()
    res.json({
        listaTareas
    });
}
const postTareas = async (req = request, res = response) => {
    const tareaAgregar = { ...req.body };
    console.log("tareaAgregar", tareaAgregar)
    const tareaGuardada = new Tarea({nombre: tareaAgregar.nombre.nombre,
        descripcion: tareaAgregar.nombre.descripcion,
        fechaInicio: tareaAgregar.nombre.fechaInicio,
        fechaFinal: tareaAgregar.nombre.fechaFinal,
        estado: tareaAgregar.nombre.estado,
        creador: tareaAgregar.nombre.creador});
    await tareaGuardada.save();
    res.json({
        tareaGuardada
    });

}
const putTarea = async (req = request, res = response) => {
    const id  = req.params.id;
    console.log("id",id)
    const tareaEdit = { ...req.body };
    console.log("tareaEdit", tareaEdit)
    const tareaEditada = await Tarea.findByIdAndUpdate(id, {nombre: tareaEdit.nombre.nombre,
        descripcion: tareaEdit.nombre.descripcion,
        fechaInicio: tareaEdit.nombre.fechaInicio,
        fechaFinal: tareaEdit.nombre.fechaFinal,
        estado: tareaEdit.nombre.estado,
        creador: tareaEdit.nombre.creador}, {new: true});
    res.json({
        tareaEditada
    });
}
const deleteTarea = async(req = request, res = response) => {
    const { id } = req.params;
    const tareaEliminada = await Tarea.findByIdAndDelete(id, {new: true});
    res.json({
        tareaEliminada
    });
}

module.exports = {
    getTareas,
    postTareas,
    putTarea,
    deleteTarea
}