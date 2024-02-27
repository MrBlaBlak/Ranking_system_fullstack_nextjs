import { DISABLE_SELECTED_OPTION, DisableSelectedOptionAction } from './actions';
import { combineReducers } from 'redux';
export interface State {
    selectedOptions: string[];
}

const initialState: State = {
    selectedOptions: new Array(10).fill(''),
};

const disableSelectedOptionReducer = (state = initialState, action:DisableSelectedOptionAction): State => {
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
const rootReducer = combineReducers({
    disableSelectedOptionReducer
});

export default disableSelectedOptionReducer;