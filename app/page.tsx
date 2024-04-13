import Link from 'next/link';
import Navbar from './components/Navbar'
import BackgroundImage from './components/BackgroundImage'
import LoadDataButton from './components/LoadDataButton'

export default function Home() {
    return (
        <div>
                <BackgroundImage/>
                <Navbar/>
        </div>

    )
}
