import * as express from 'express'
import RegisterController from './UserController';

const router = express.Router();

router.post('/register', RegisterController.register)
router.post('/login', RegisterController.login)
router.get('/users', RegisterController.getAll)
router.delete('/users/:id', RegisterController.delete)

export default router;