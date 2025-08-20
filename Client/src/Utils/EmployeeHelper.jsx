import axios from "axios";

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