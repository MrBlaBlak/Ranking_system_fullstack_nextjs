import {configureStore} from '@reduxjs/toolkit'
import disableSelectedOptionReducer from './selectedOptionsSlice'
import modalReducer from './modalSlice'

export const makeStore = () => {
    return configureStore({
        reducer:{
            modal: modalReducer,
            selectedOptions: disableSelectedOptionReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']