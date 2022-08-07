import { configureStore } from '@reduxjs/toolkit'
import ProfileImageSlicer from './ProfileImageSlicer'

export default configureStore({
    reducer: {
        profileImage: ProfileImageSlicer,
    },
})