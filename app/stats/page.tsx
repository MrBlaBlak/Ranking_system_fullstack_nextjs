import React from 'react';
import BackgroundImage from '../components/BackgroundImage'

function Page() {
    //workaround for importing async components 'GamersList' cannot be used as a JSX component. Its return type 'Promise<Element>' is not a valid JSX element.
    // const asyncPickGamersBar: JSX.Element = await PickGamersBar();
    return (
        <>
            <BackgroundImage/>
        </>
    );
}
;

export default Page;

