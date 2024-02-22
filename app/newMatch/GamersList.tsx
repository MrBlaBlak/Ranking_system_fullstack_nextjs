'use client'
import {Gamer} from './PickGamersBar'
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {disableSelectedOption} from '../redux/actions';
import {State} from '../redux/reducers';


type Props = {
    gamers: Gamer[]
};
// import GetGamers from  './GetGamers'
const GamersList: React.FC<Props> = ({gamers}) => {
    const dispatch = useDispatch();
    const selectedOptions = useSelector((state: State) => state.selectedOptions);
    const handleSelectChange = (index: number, value: string) => {
        dispatch(disableSelectedOption(index, value));
    };
    const gamersTable: string [] = new Array(10).fill({});
    return (
        <>

                {gamersTable.map((elem, index) => (
                        <select key={index}
                                className="select select-ghost select-bordered w-full max-w-xs flex flex-col space-y-4 text-white"
                                onChange={(e) => handleSelectChange(index, e.target.value)}
                        >
                            <option disabled selected>-Player {index + 1}-</option>
                            {
                                gamers.map((gamer) =>
                                    (<option key={gamer.id}
                                             disabled={selectedOptions.includes(gamer.name)}
                                             value={gamer.name}
                                             style={{
                                                 color: selectedOptions.includes(gamer.name) ? '#666' : 'inherit',
                                             }}
                                    >
                                        {gamer.name}
                                    </option>))
                            }
                        </select>
                    )
                )}

        </>
    );
}

export default GamersList;