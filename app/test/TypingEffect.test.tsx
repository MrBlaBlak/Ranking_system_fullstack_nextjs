// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import modalReducer, { setCounter, setFinishedTalking, setIsModalOpen, setIsWaiting } from "@/app/redux/modalSlice";
// import TypingEffect from "@/app/components/modal/TypingEffect";
// import {it, expect, describe, vi} from 'vitest'
// import { RootState } from "@/app/redux/store";
//
// // Create a mock store with initial state
// const createMockStore = (initialState: RootState) => {
//     return configureStore({
//         reducer: {
//             modal: modalReducer,
//         },
//         preloadedState: initialState,
//     });
// };
//
// // Mock Redux hooks
// vi.mock("@/app/redux/hooks", () => ({
//     useAppDispatch: () => vi.fn(),
//     useAppSelector: (selector: (state: RootState) => any) => selector(mockStore.getState()),
// }));
//
// describe("TypingEffect Component", () => {
//     let mockStore;
//     const initialState = {
//         modal: {
//             isModalOpen: true,
//             finishedTalking: false,
//             needHelp: false,
//             counter: 0,
//             isWaiting: false,
//         },
//     };
//
//     beforeEach(() => {
//         mockStore = createMockStore(initialState);
//     });
//
//     it("renders initial text correctly", () => {
//         render(
//             <Provider store={mockStore}>
//                 <TypingEffect textList={[["Hello, world!"]]} period={1000} />
//             </Provider>
//         );
//         expect(screen.getByText("")).toBeInTheDocument();
//     });
//
//     it("types and deletes text correctly", () => {
//         vi.useFakeTimers();
//
//         render(
//             <Provider store={mockStore}>
//                 <TypingEffect textList={[["Hello, world!"]]} period={1000} />
//             </Provider>
//         );
//
//         // Simulate time passing for typing
//         vi.advanceTimersByTime(20);
//         expect(screen.getByText("H")).toBeInTheDocument();
//         vi.advanceTimersByTime(20);
//         expect(screen.getByText("He")).toBeInTheDocument();
//         vi.advanceTimersByTime(20 * 11); // Advance time for full text typing
//         expect(screen.getByText("Hello, world!")).toBeInTheDocument();
//
//         // Simulate time passing for deletion
//         vi.advanceTimersByTime(1000); // Wait period
//         vi.advanceTimersByTime(40 * 13); // Advance time for full text deletion
//         expect(screen.getByText("")).toBeInTheDocument();
//
//         vi.useRealTimers();
//     });
//
//     it("dispatches Redux actions correctly", () => {
//         const mockDispatch = vi.fn();
//         vi.mock("@/app/redux/hooks", () => ({
//             useAppDispatch: () => mockDispatch,
//             useAppSelector: (selector: (state: RootState) => any) => selector(mockStore.getState()),
//         }));
//
//         render(
//             <Provider store={mockStore}>
//                 <TypingEffect textList={[["Hello, world!"]]} period={1000} />
//             </Provider>
//         );
//
//         vi.useFakeTimers();
//         vi.advanceTimersByTime(20 * 11); // Advance time for full text typing
//         expect(mockDispatch).toHaveBeenCalledWith(setFinishedTalking(true));
//
//         vi.advanceTimersByTime(1000); // Wait period
//         expect(mockDispatch).toHaveBeenCalledWith(setIsWaiting(true));
//
//         vi.advanceTimersByTime(40 * 13); // Advance time for full text deletion
//         expect(mockDispatch).toHaveBeenCalledWith(setCounter(1));
//
//         vi.useRealTimers();
//     });
// });
import React from 'react';

type Props = {};
const TypingEffectTest = ({}: Props) => {
    return (<></>)
};
export default TypingEffectTest;