import { DISABLE_SELECTED_OPTION, DisableSelectedOptionAction } from './actions';
export interface State {
    selectedOptions: string[];
}

const initialState: State = {
    selectedOptions: new Array(10).fill(''),
};

const reducer = (state = initialState, action:DisableSelectedOptionAction): State => {
    switch (action.type) {
        case DISABLE_SELECTED_OPTION:
            const { index, value } = action.payload;
            const updatedSelectedOptions = [...state.selectedOptions];
            updatedSelectedOptions[index] = value;
            return {
                ...state,
                selectedOptions: updatedSelectedOptions,
            };
        default:
            return state;
    }
};

export default reducer;