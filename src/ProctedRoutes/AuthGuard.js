import { Navigate, Outlet } from "react-router-dom"
import addDeleteGetLocalStorage from "../Axios/addDeleteGetLocalStorage"
import { storageKeys } from "../Axios/Enum"
const AuthGuard = () => {
    return <>
        {addDeleteGetLocalStorage(storageKeys.ADMIN_TOKEN , {}, "get", "single") ? <Outlet /> : <Navigate to="/" />}
    </>
}

export default AuthGuard