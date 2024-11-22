import axios from "axios"

export const loginUser = async (data) => {
    const res = await axios.post("http://localhost:5001/api/user/login", data)
    return res.data
}

export const signupUser = async (data) => {
    const res = await axios.post("http://localhost:5001/api/user/sign-up", data)
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axios.get(`http://localhost:5001/api/user/get-detail/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,

        }
    })
    return res.data
}