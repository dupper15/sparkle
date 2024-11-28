import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   id: '',
   height: '',
   width: '',
   canvasArray: [],
   editorArray: [],
   isPublic: [],
   owner: '',
   projectName: ''
}

export const projectSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateProject: (state, action) => {
            console.log("Payload for updateProject:", action.payload);
            const { _id = '', height= '', width= '', canvasArray= [] , editorArray= [], isPublic= false, owner= '', projectName= ''} = action.payload;
            state.id = _id
            state.height = height
            state.width = width
            state.canvasArray = canvasArray.map((canvas, index) => ({
                ...canvas,
                index: index // Cập nhật lại index cho mỗi phần tử trong canvasArray
            }));
            state.editorArray = editorArray
            state.isPublic = isPublic
            state.owner = owner
            state.projectName = projectName
        },
    }
})

export const { updateProject } = projectSlice.actions

export default projectSlice.reducer