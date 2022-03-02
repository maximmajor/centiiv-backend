import { Router } from 'express';
import { signUp, verifyAccount } from "../controller/user"
const router = Router();


router.post('/register', signUp);
router.get('/verify/:email', verifyAccount)

export default router;
