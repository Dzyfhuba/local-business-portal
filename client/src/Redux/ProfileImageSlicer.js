import { createSlice } from '@reduxjs/toolkit'

export const ProfileImageSlicer = createSlice({
    name: 'profileImage',
    initialState: {
        value: '',
    },
    reducers: {
        update: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { update } = ProfileImageSlicer.actions

export default ProfileImageSlicer.reducer