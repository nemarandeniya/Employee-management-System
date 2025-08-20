import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToDB from './db/db.js'
import departmentRouter from './routes/department.js'

connectToDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port ${process.env.PORT}`);
})