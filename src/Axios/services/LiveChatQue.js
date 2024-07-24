import axiosInstance from "../AxiosInstance";

export const getchatqueue = (params) => {
    return axiosInstance.get('/admin/chat/get', {params})
}

export const getchatroom_message = (id) => {
    return axiosInstance.get(`/admin/chat/room/message/${id}`,)
}