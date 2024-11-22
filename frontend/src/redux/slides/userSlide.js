import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userName: '',
   email: '',
   access_token: ''
}

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { userName, email, access_token } = action.payload
            state.userName = userName;
            state.email = email;
            state.access_token = access_token
        }
    }
})

export const { updateUser } = userSlice.actions

export default userSlice.reducer