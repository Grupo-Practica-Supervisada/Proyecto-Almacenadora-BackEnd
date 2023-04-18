const { Router } = require('express');
const { check } = require('express-validator');
const { getTareas, postTareas, putTarea, deleteTarea } = require('../controllers/tareas');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esFecha } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar',[
    validarJWT,
    validarCampos
], getTareas);

router.post('/agregar/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio'),
    check('fechaInicio', 'La fecha inicial es obligatoria').not().isEmpty(),
    check('fechaInicio', ' Ingresa una fecha inicial valida').custom(esFecha),
    check('fechaFinal', ' La fecha final es obligatoria').not().isEmpty(),
    check('fechaFinal', ' Ingresa una fecha final valida').custom(esFecha),
    check('descripcion', ' La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], postTareas);

router.put('/editar/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio'),
    check('fechaInicio', 'La fecha inicial es obligatoria').not().isEmpty(),
    check('fechaInicio', ' Ingresa una fecha inicial valida').custom(esFecha),
    check('fechaFinal', ' La fecha final es obligatoria').not().isEmpty(),
    check('fechaFinal', ' Ingresa una fecha final valida').custom(esFecha),
    check('descripcion', ' La descripcion es obligatoria').not().isEmpty(),
    validarCampos
], putTarea);

router.delete('/eliminar/:id',[
    validarJWT,
    check('id', 'El id de la tarea es obligatoria').isMongoId(),
    validarCampos
], deleteTarea);

module.exports = router;