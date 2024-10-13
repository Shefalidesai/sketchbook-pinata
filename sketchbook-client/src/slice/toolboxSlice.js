import { createSlice } from '@reduxjs/toolkit'
import { CANVAS_TOOLS, COLORS } from '@/constants'

const initialState = {
    [CANVAS_TOOLS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [CANVAS_TOOLS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [CANVAS_TOOLS.UNDO]: {},
    [CANVAS_TOOLS.REDO]: {},
    [CANVAS_TOOLS.DOWNLOAD]: {},
}

export const toolboxSlice = createSlice({
    name: 'toolbox',
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size
        }
    }
})

export const {changeColor, changeBrushSize} = toolboxSlice.actions

export default toolboxSlice.reducer