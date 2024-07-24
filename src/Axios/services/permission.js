import axiosInstance from "../AxiosInstance";

export const getPermission = (params) => {
    return axiosInstance.get('/admin/permission/getRoles' , {params})
}
export const getPermissionDetail = (id) => {
    return axiosInstance.get(`/admin/permission/getRoleDetail/${id}`)
}
export const getModules = () => {
    return axiosInstance.get(`/admin/permission/getModulePermission`)
}

export const updatePermission = (id,data) => {
    return axiosInstance.patch(`/admin/permission/updatePermission/${id}` , data)   
}

