'use client'
import {Gamer} from './PickGamersBar'
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {disableSelectedOption} from '../../redux/actions';
import {State} from '../../redux/reducers';
import {useAppDispatch, useAppSelector} from '../../redux/hooks'

type Props = {
    gamers: Gamer[]
};
const GamersList: React.FC<Props> = ({gamers}) => {
    
    const dispatch = useAppDispatch();
    const selectedOptions = useAppSelector((state: State) => state.selectedOptions);
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
                                required
                        >
                            <option value="" style={{display: "none"} }>-Player {index + 1}-</option>
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
            <select className="select select-ghost select-bordered  max-w-xs flex flex-col space-y-4 text-white"
                    required
            >
                <option value="" style={{display: "none"} }>-Server-</option>
                <option value="EU">EU</option>
                <option value="NY">NY</option>
            </select>
        </>
    );
}

export default GamersList;