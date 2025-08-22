import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployee, getEmployeeById, updateEmployee } from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMiddleware, getEmployee)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)
router.get('/:id', authMiddleware, getEmployeeById)
router.put('/:id', authMiddleware, updateEmployee)
// router.delete('/:id', authMiddleware, deleteDepartment)

export default router

//authmiddleware eken userwa verify krnw