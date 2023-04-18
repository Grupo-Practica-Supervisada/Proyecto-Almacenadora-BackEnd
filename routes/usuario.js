const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuario, putMiUsuario, deleteMiUsuario, getUsuariosId } = require('../controllers/usuario');
const { emailExiste, identificacionExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getUsuarios);

router.get('/:id', getUsuariosId);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('edad', 'La edad es Obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste ),
    validarCampos,
] ,postUsuario);

router.put('/editarMiUsuario', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('edad', 'La edad es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    validarCampos
] ,putMiUsuario );

router.delete('/eliminarMiCuenta', [
    validarJWT,
    validarCampos
] ,deleteMiUsuario);


module.exports = router;