'use client'
import Navbar from './components/Navbar'
import BackgroundImage from './components/BackgroundImage'



export default function Home() {

    return (
        <>
            <div id="stars" className="absolute inset-0"></div>
            <div id="stars2" className="absolute inset-0"></div>
            <div id="stars3" className="absolute inset-0"></div>

            <div>
                <BackgroundImage/>
                <nav className="relative flex left-8 sm:left-20 md:left-32 lg:left-40 xl:left-1/4 mt-4 py-10 px-4 ">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 xl:gap-0">
                        <Navbar/>
                    </div>
                </nav>
            </div>

        </>


    )
}
