import axiosInstance from "../AxiosInstance";

export const CreateRequest = (data) => {
    return axiosInstance.post('/admin/request/createRequest', data)
}

export const GetClients = (params) => {
    return axiosInstance.get('/admin/request/getClientOptions' , {params})
}

export const GetAllPolicy = ( client_id) => {
    return axiosInstance.get(`/admin/request/getClientPolicyOptions?client_id=${client_id}`)
}

export const GetAllRequest = (params) => {
    return axiosInstance.get('/admin/request/getAllRequests' , {params})
}

export const GetRequestDetail = (id) => {
    return axiosInstance.get(`/admin/request/get/${id}`)
}

export const FileUpload = (data) => {
    return axiosInstance.post('/upload-file-base64', data)
}

export const CreateRaiseRequest = (data) => {
    return axiosInstance.post('/admin/request/createRequest', data)
}

export const UpdateRaiseRequest = (data) => {
    return axiosInstance.patch('/admin/request/updateRequest', data)
}

export const DeleteRequest = (data) => {
    return axiosInstance.delete(`/admin/request/deleteRequest` , {data})
}

export const UpdateRequestStatus = (data) => {
    return axiosInstance.patch('/admin/request/updateStatus', data)
}

export const getAgents = (params) => {
    return axiosInstance.get('/admin/request/getAgentOptions' , {params})
}
