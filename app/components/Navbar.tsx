import React from 'react';
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="absolute left-0 right-0 p-4 h-3/4 flex flex-col justify-center">
            <div className="container mx-auto ">
                <ul className="flex flex-col space-y-4 text-white">
                    <Link href="/pickGamers"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Start a new Match</Link>
                    <Link href="/stats"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Leaderboard</Link>
                    <Link href="/map-stats"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Maps Stats</Link>
                    <Link href="/elims-stats"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Elimination Stats</Link>
                    <Link href="/cap-stats"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg hover:text-gray-300 transition duration-300">Flag Capture Stats</Link>
                    <Link href="/titan-stats"
                          className="btn btn-outline btn-wide btn-xs sm:btn-sm md:btn-md lg:btn-lg  hover:text-gray-300 transition duration-300">Titan Stats</Link>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;