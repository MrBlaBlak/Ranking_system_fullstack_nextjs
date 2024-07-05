import React from 'react';

type Props = {
    showcaseTogether: boolean,
    setShowcaseTogether: Function
};
const CheckboxShowcaseTogether = ({showcaseTogether, setShowcaseTogether}: Props) => {
    return (
        <div className="mt-2">
            <input
                type="checkbox"
                id="showcaseTogether"
                checked={showcaseTogether}
                onChange={(e) => setShowcaseTogether(e.target.checked)}
            />
            <label htmlFor="showcaseTogether" className="ml-2">Showcase Together</label>
        </div>
    )
};
export default CheckboxShowcaseTogether;