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
    const { nombre, fechaInicio, fechaFinal, descripcion, estado, creador } = req.body;
    const tareaGuardada = new Tarea({nombre, fechaInicio, fechaFinal, descripcion, estado, creador});
    await tareaGuardada.save();
    res.json({
        tareaGuardada
    });

}
const putTarea = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, fechaInicio, fechaFinal, descripcion, estado } = req.body;
    const tareaEditada = await Tarea.findByIdAndUpdate(id, {nombre, fechaInicio, fechaFinal, descripcion, estado}, {new: true});
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