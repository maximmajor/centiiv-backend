import { Router } from 'express';
import { signUp, verifyAccount } from "../controller/user"
import { loginPage } from '../controller/userAuth';
const router = Router();

//REGISTER
router.post('/register', signUp);
router.get('/verify/:email', verifyAccount)
//LOGIN PAGE
router.post('/login', loginPage);

export default router;
