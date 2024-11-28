import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/userSlide'
import projectReducer from './slides/projectSlide'
import canvasReducer from './slides/canvasSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    project: projectReducer,
    canvas: canvasReducer
  },
})