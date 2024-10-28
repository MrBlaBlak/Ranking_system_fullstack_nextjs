import React from 'react';
import Link from "next/link";


type Props = {};
const Loading = ({}: Props) => {
    const mapOrder: string[] = ["boomtown", "exo", "eden", "drydock", "angel", "colony", "glitch"];
    return (<>
        <div className="overflow-x-auto h-dvh">
            <table className="table table-zebra table-sm">
                <thead className="sticky top-0 " data-theme="dark">
                <tr className="border-none">
                    <th>
                        <Link href="/"
                              className="btn btn-outline hover:text-gray-300 transition duration-300">Go back</Link>
                    </th>
                    {mapOrder.map((map) => (
                        <>
                            <th colSpan={3} key={`${map}_Header`}>
                                <div className="skeleton rounded-none h-32 w-full "></div>
                            </th>
                        </>
                    ))}
                </tr>
                <tr className="">
                    <th>Player</th>
                    {mapOrder.map((map) => (
                        <>
                            <th key={`${map}_Wins`}>Wins</th>
                            <th key={`${map}_Losses`}>Losses</th>
                            <th key={`${map}_WinPercent`}>Win%</th>
                        </>
                    ))}
                </tr>
                </thead>

            </table>
        </div>

    </>)
};
export default Loading;