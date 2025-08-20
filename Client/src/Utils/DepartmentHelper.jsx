import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa"

export const columns = [
    {
        name: "Serial No",
        selector: (row) => row.sno
    },
    {
        name: "Departmant Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentActionBtns = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete?")
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response);

                if (response.data.success) {
                    onDepartmentDelete(id)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }
    return (
        <div>
            <button className="px-2 py-2 bg-green-400 text-white rounded me-3"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}><FaEdit /></button>
            <button className="px-2 py-2 bg-red-600 text-white rounded" onClick={() => handleDelete(_id)}><FaTrashAlt /></button>
        </div>
    )
}