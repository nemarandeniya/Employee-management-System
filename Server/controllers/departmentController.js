import Department from "../models/department.js";

const addDepartment = async (req, res) => {
    try {
        console.log("Backend received:", req.body)
        const { dep_name, description } = req.body;
        const newDep = new Department({
            dep_name,  //model eke namata front end eken ena eka samana nm mehema liynawa nttn (dep_name: depName me wge liynne ->depName nm front end  eken enne)
            description
        })

        await newDep.save();
        console.log("Saved department:", newDep)
        return res.status(200).json({ success: true, department: newDep })

    } catch (error) {
        console.error("AddDepartment error:", error);
        return res.status(500).json({ success: false, error: "Add department Server Error" })
    }
}

const getDepartment = async (req, res) => {
    try {
        //get all data
        const departments = await Department.find()
        console.log(departments);

        return res.status(200).json({ success: true, departments })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id })
        return res.status(200).json({ success: true, department })

    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const { dep_name, description } = req.body
        const updateDep = await Department.findByIdAndUpdate({ _id: id }, {
            dep_name,
            description
        })
        return res.status(200).json({ success: true, updateDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const deleteDep = await Department.findByIdAndDelete({ _id: id })
        return res.status(200).json({ success: true, deleteDep })
    } catch (error) {
        return res.status(500).json({ success: false, error: "get department server error" })
    }
}

export { addDepartment, getDepartment, getDepartmentById, updateDepartment, deleteDepartment }