'use client'
import React from 'react';
import {Gamer} from './PickGamersBar'
import StoreProvider from '../api/StoreProvider';
import GamersList from './GamersList'
type Props = {
    gamers: Gamer[]
};
const StoreWrapperForGamersList: React.FC<Props>= ({gamers}) => {
    return (
        <StoreProvider>
            <GamersList gamers={gamers}></GamersList>
        </StoreProvider>
    );
}

export default StoreWrapperForGamersList;