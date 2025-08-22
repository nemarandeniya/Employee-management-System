import axios from "axios";
import { FaEdit, FaEye, FaMoneyBill, FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const getDepartments = async () => {
    let departments;
    try {
        const response = await axios.get('http://localhost:3000/api/department', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response);

        if (response.data.success) {
            departments = response.data.departments
            console.log(departments);
        }
    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error)
        }
    }
    return departments;
}

export const columns = [
    {
        name: "Serial No",
        selector: (row) => row.sno,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "170px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "180px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "190px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        width: "365px",
        center: "true"
    },
]

export const EmployeeActionBtns = ({ Id }) => {
    const navigate = useNavigate()

    // const handleDelete = async (id) => {
    //     const confirm = window.confirm("Are you sure to delete?")
    //     if (confirm) {
    //         try {
    //             const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
    //                 headers: {
    //                     "Authorization": `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             })
    //             console.log(response);

    //             if (response.data.success) {
    //                 onDepartmentDelete(id)
    //             }
    //         } catch (error) {
    //             if (error.response && !error.response.data.success) {
    //                 alert(error.response.data.error)
    //             }
    //         }
    //     }
    // }
    return (
        <div className="flex items-center">
            <button className="px-2 py-2 flex items-center bg-blue-400 gap-1  text-white rounded me-3"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
                <FaEye />View
            </button>
            <button className="px-2 py-2 flex items-center gap-1 bg-yellow-600 text-white rounded me-3"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
                <FaEdit />Edit</button>
            <button className="px-2 py-2 flex items-center gap-1 bg-green-600 text-white rounded me-3"><FaMoneyBill />Salary</button>
            <button className="px-2 py-2 flex items-center gap-1 bg-red-600 text-white rounded"><FaBed />Leave</button>
        </div>
    )
}