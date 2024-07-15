import {createSlice } from '@reduxjs/toolkit';
const initialState = {
    isModalOpen: true,
    finishedTalking: false,
    needHelp: false,
    counter: 0,
    isWaiting: false
};
const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        },
        setFinishedTalking: (state, action) => {
            state.finishedTalking = action.payload;
        },
        setNeedHelp: (state, action) => {
            state.needHelp = action.payload;
        },
        setCounter: (state, action) => {
            if(action.payload>0){
                state.counter = action.payload + state.counter;
            }
            else {
                state.counter = 0
            }
        },
        setIsWaiting: (state, action) => {
            state.isWaiting = action.payload;
        }
    }
});
export const {
    setIsModalOpen,
    setFinishedTalking,
    setNeedHelp,
    setCounter,
    setIsWaiting
} = modalSlice.actions;
export default modalSlice.reducer;