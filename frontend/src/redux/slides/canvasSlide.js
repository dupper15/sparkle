import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  background: "",
  componentArray: [],
};

export const canvasSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateCanvas: (state, action) => {
      console.log("Payload for updateProject:", action.payload);
      const { _id = "", background = "", componentArray = [] } = action.payload;
      state.id = _id;
      state.background = background;
      state.componentArray = componentArray;
    },
  },
});

export const { updateCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;
