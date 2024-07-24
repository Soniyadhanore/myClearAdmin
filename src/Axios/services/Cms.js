import axiosInstance from "../AxiosInstance";

export const getCmsData = () => {
    return axiosInstance.get('/admin/pages/getAllPages')
}

export const UpdateCmsStatus = (data) => {
    return axiosInstance.put('/admin/pages/update-status/terms-condition', data)
}

export const getCmsDetail = () => {
    return axiosInstance.get(`/admin/pages/get/terms-condition/`)
}