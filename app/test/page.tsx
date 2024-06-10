'use client'
import React from 'react';
import {useState, useEffect} from 'react';
import {addPlayerTest, removePlayerTest} from "@/app/api/gamers/routeDump"

function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        await addPlayerTest();
        setIsSubmitting(false);
    };
    const handleRemove = async () => {
        await removePlayerTest();
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <button disabled={isSubmitting}
                        type="submit"
                        className="btn btn-outline btn-success btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">Submit
                    {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
                </button>
            </form>
            <button onClick={handleRemove}
                    className="btn btn-outline btn-success btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">button
            </button>
        </>
    );
}

export default Page;