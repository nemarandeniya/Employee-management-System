import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './Pages/Login'
import AdminDashboard from './Pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import PrivateRoutes from './Utils/PrivateRoutes'
import RoleBasedRoutes from './Utils/RoleBasedRoutes'
import AdminSummery from './Components/Dashboard/AdminSummery'
import DepartmentList from './Components/Departments/departmentList'
import AddDepartment from './Components/Departments/AddDepartment'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}> </Route>
        <Route path='/login' element={<Login />}> </Route>
        <Route path='/admin-dashboard' element={
          //PrivateRoutes cll krn kota blnw user loged welada kiyla.if user is loged in check rolebased routes
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>{/*admin ta witharai log wenna plwn*/}
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummery />} />
          <Route path='/admin-dashboard/departments' element={<DepartmentList />}> </Route>
          <Route path='/admin-dashboard/add-department' element={<AddDepartment />}> </Route>
        </Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
