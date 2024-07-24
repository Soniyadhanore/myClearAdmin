import axiosInstance from "../AxiosInstance";

export const login = (data) => {
    return axiosInstance.post('/auth/login', data)
}

export const forgotPassword = (data) => {
    return axiosInstance.post('/auth/forget-password', data)
}

export const resetPassword = (data) => {
    return axiosInstance.post('/auth/reset-password', data)
}

export const changePassword = (data) => {
    return axiosInstance.patch('/auth/change-password', data)
}

export const logout = () => {
    return axiosInstance.delete('/auth/logout')
}

export const getProfile = () => {
    return axiosInstance.get('/auth/me')
}

export const profileUpdate = (data) => {
    return axiosInstance.put('/admin/profile/update', data)
}