import Employee from "../models/Employee.js"
import User from "../models/User.js"
import Department from "../models/department.js"
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from "path"

const storage = multer.diskStorage({//files disk eke save krnw
    destination: (req, file, cb) => {
        cb(null, "public/uploads")//upload krna image save krna thana
    },
    filename: (req, file, cb) => {//upload krna file eke name eka ex:1692601849834.png
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//creates the upload middleware for handling file uploads
const upload = multer({ storage: storage })

const addEmployee = async (req, res) => {
    try {
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);
        //req.body eken employee details gnnw
        const {
            emp_name,
            email,
            emp_id,
            dob,
            gender,
            status,
            designation,
            department,
            salary,
            password,
            role
        } = req.body
        //Check if user already exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, error: "user already registered in employee" })
        }
        //if not
        const hashPassword = await bcrypt.hash(password, 10)

        //Create a new User
        const newUser = new User({
            name: emp_name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""//If a profile image was uploaded → saves the filename
        })
        const savedUser = await newUser.save()

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId: emp_id,
            dob,
            gender,
            maritalStatus: status,
            designation,
            department,
            salary
        })

        await newEmployee.save()
        return res.status(200).json({ success: true, message: "employee created" })
    } catch (error) {
        console.log(error + "errorhhhh");
        return res.status(500).json({ success: false, error: "error in adding employee " })

    }
}

const getEmployee = async (req, res) => {
    try {
        //get all data
        const employees = await Employee.find().populate('userId', { password: 0 }).populate('department')
        //populate eken forein key  id wala datath find krnw.password:0 eken user datath ekka passowrd eka gena eka nawattnwa
        console.log(employees);

        return res.status(200).json({ success: true, employees })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employees server error" })
    }
}

const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        //get all data
        const employee = await Employee.findById({ _id: id }).populate('userId', { password: 0 }).populate('department')
        //populate eken forein key  id wala datath find krnw.password:0 eken user datath ekka passowrd eka gena eka nawattnwa
        console.log(employee);

        return res.status(200).json({ success: true, employee })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get employee server error" })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body);

        const {
            emp_name,
            status,
            designation,
            department,
            salary
        } = req.body

        const employee = await Employee.findById({ _id: id })
        if (!employee) {
            return res.status(404).json({ success: false, error: "employee not found" })
        }
        const user = await User.findById({ _id: employee.userId })
        if (!user) {
            return res.status(404).json({ success: false, error: "user not found" })
        }

        const updateuser = await User.findByIdAndUpdate({ _id: employee.userId }, { name: emp_name })
        const updateEmployee = await Employee.findByIdAndUpdate({ _id: id }, { maritalStatus: status, designation, salary, department })

        if (!updateuser || !updateEmployee) {
            return res.status(404).json({ success: false, error: "document not found" })
        }
        return res.status(200).json({ success: true, message: "Employee Updated" })

    } catch (error) {
        return res.status(500).json({ success: false, error: "update employee server error" })
    }
}

export { addEmployee, upload, getEmployee, getEmployeeById, updateEmployee }