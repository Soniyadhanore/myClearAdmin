import axiosInstance from "../AxiosInstance"


export const getAllClients = (params) => {
    return axiosInstance.get('/admin/customers/getAllCustomers', {params})
}

export const getClient_Detail = (id) => {
    return axiosInstance.get(`/admin/customers/get/${id}`)
}

export const UpdateCustomerStatus = (id , data) => {
    return axiosInstance.patch(`/admin/customers/update/${id}` , data)
}

export const exportAllData = (params) => {
    return axiosInstance.get(`/admin/customers/export` , {params})
}

export const Resend_Password = (id) => {
    return axiosInstance.get(`/admin/resendPassword/${id}`)
}