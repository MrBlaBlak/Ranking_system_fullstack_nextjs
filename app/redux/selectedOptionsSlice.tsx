import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface State {
    selectedOptions: string[];
}
const initialState: State = {
    selectedOptions: new Array(10).fill(''),
};

const selectedOptionsSlice = createSlice({
    name: 'selectedOptions',
    initialState,
    reducers: {
        disableSelectedOption: (state, action: PayloadAction<{ index: number, value: string }>) => {
            const { index, value } = action.payload;
            const updatedSelectedOptions = [...state.selectedOptions];
            updatedSelectedOptions[index] = value;
            return {
                ...state,
                selectedOptions: updatedSelectedOptions,
            };
        },
    },
});
export const {
    disableSelectedOption,
} = selectedOptionsSlice.actions;

export default selectedOptionsSlice.reducer;