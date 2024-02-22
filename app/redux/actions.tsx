export const DISABLE_SELECTED_OPTION = 'DISABLE_SELECTED_OPTION';
export interface DisableSelectedOptionAction {
    type: typeof DISABLE_SELECTED_OPTION;
    payload: {
        index: number;
        value: string;
    };
}
export const disableSelectedOption= (index: number, value: string) => ({
    type: DISABLE_SELECTED_OPTION,
    payload: { index, value },
});