import { Navigate, Outlet } from "react-router-dom"
import addDeleteGetLocalStorage from "../Axios/addDeleteGetLocalStorage"
import { storageKeys } from "../Axios/Enum"
const LoginGuard = () => {
    return <>
        {addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN , {}, "get", "single") ? <Navigate to="/client-management" /> : <Outlet />}
    </>
}

export default LoginGuard