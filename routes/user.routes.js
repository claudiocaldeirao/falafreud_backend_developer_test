const express = require('express');
const router = express.Router();

//Controlador de usuarios.
const userController = require('../controllers/user.controller');

/**
 * @api {post} /create Create New User
 * @apiName UserCreate
 * @apiGroup User
 *
 * @apiParam {String} name Name of the User.
 * @apiParam {Number} age Age of the User.
 * @apiParam {Number} phone Phone of the User.
 * @apiParam {Boolean} is_admin If is a superuser.
 *
 * @apiSuccess {String} message User created successfully!
 */
router.post('/create', userController.UserCreate);

/**
 * @api {get} /:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} name Name of the User.
 * @apiSuccess {Number} age Age of the User.
 * @apiSuccess {Number} phone Phone of the User.
 * @apiSuccess {Boolean} is_admin If user is a superuser.
 */
router.get('/:id', userController.GetUser);

/**
 * @api {put} /:id Request User Update
 * @apiName UserUpdate
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} message User updated successfully!
 */
router.put('/:id', userController.UserUpdate);

/**
 * @api {delete} /:id Request User Delete
 * @apiName UserDelete
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} message User deleted successfully!
 */
router.delete('/:id', userController.UserDelete);

module.exports = router;