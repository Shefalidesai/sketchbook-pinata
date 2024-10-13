import { createSlice } from '@reduxjs/toolkit'
import { CANVAS_TOOLS } from '@/constants'

const initialState = {
    activeMenuItem: CANVAS_TOOLS.PENCIL,
    actionMenuItem: null
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        menuItemClick: (state, action) => {
            state.activeMenuItem = action.payload
        },
        actionItemClick: (state, action) => {
            state.actionMenuItem = action.payload
        }
    }
})

export const {menuItemClick, actionItemClick} = menuSlice.actions

export default menuSlice.reducer