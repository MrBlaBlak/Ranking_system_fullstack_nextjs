'use client'
import React, {useEffect, useState} from 'react';


type Props = {};
const TestComponent = ({}: Props) => {
    const [variable, setVariable] = useState(true);
    const [variable2, setVariable2] = useState(true);
    useEffect(() => {
        console.log("HelloWorld")
    }, [variable, variable2])
    useEffect(() => {
        console.log("HelloWorld2")
    },[])
    return (<>
        <button onClick={() => {
            setVariable((prevState) => !prevState)
            console.log(variable)

        }}>a</button>
        <button onClick={() => {
            setVariable2((prevState) => !prevState)
        }}>b</button>
        <button onClick={() => {
            setVariable((prevState) => !prevState)
            setVariable2((prevState) => !prevState)
        }}>c</button>
    </>)
};
export default TestComponent;