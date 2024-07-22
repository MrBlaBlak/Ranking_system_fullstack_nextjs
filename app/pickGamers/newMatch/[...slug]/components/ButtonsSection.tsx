import React, { MouseEventHandler } from 'react';
import Link from 'next/link'
type Props = {isSubmitting: boolean,
handleGetRandomStats: MouseEventHandler<HTMLButtonElement>
};
const ButtonsSection = ({isSubmitting, handleGetRandomStats}: Props) => {
    return (
        <div className="flex justify-center gap-5">
            <button disabled={isSubmitting}
                    type="submit"
                    className="btn btn-outline btn-success btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">Submit
                {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
            </button>
            <Link href="/pickGamers"
                  className="btn btn-outline btn-error btn-xs sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 ">Go
                back
            </Link>
            <button type="button"
                    onClick={handleGetRandomStats}
                    className="btn btn-outline btn-accent btn-xs  sm:btn-xs md:btn-sm lg:btn-md hover:text-gray-300 transition duration-300 pr-5">Get
                Random
            </button>
        </div>
    )
};
export default ButtonsSection;