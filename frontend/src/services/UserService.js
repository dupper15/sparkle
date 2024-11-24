import axios from "axios"

axios.defaults.withCredentials = true;
export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_KEY}/user/login`, data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_KEY}/user/sign-up`, data)
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${import.meta.env.VITE_API_KEY}/user/get-detail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const refreshToken = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_KEY}/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_KEY}/user/logout`)
    return res.data
}

export const updateInfoUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_KEY}/user/update-info/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


export const changePassword = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${import.meta.env.VITE_API_KEY}/user/change-password/${id}`, data,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}