import express from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, deactivateUser, activateUser} from '../../controllers/users';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/deactivate', deactivateUser);
router.patch('/:id/activate', activateUser);

export default router;
