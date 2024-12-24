import { createSlice } from "@reduxjs/toolkit";
import profileIcon from "../../assets/default-profile-icon.png";

const initialState = {
  id: "",
  userName: "",
  email: "",
  password: "",
  image: profileIcon,
  access_token: "",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        userName = "",
        email = "",
        password = "",
        image = "",
        access_token = "",
      } = action.payload;
      state.id = _id;
      state.userName = userName;
      state.email = email;
      state.password = password;
      state.image = image;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.id = "";
      state.image = "";
      state.userName = "";
      state.password = "";
      state.email = "";
      state.access_token = "";
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
