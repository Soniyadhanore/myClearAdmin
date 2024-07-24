import axiosInstance from "../AxiosInstance"


export const getAllAdmins = (params) => {
    return axiosInstance.get('/admin/getAllUsers', {params})
}

export const UpdateAdminStatus = (id , data) => {
    return axiosInstance.patch(`/admin/updateStatus/${id}`, data)
}

export const getRoleOptions = () => {
    return axiosInstance.get(`/admin/getRoleOptions`)
}

export const getAllroleOptions = () => {
    return axiosInstance.get(`/admin/getRoleOptions`)
}

export const CreateAdmin = (data) => {
    return axiosInstance.post(`/admin/createAdmin` , data)
}   

export const UpdateAdmin = ( data) => {
    return axiosInstance.patch(`/admin/updateAdmin` , data)
}

export const getAdminDetail = (id) => {
    return axiosInstance.get(`/admin/getUserDetail/${id}`)
}

export const DeleteAdmin = (id) => {
    return axiosInstance.delete(`/admin/deleteAdmin/${id}`)
}