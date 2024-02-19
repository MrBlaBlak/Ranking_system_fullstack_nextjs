import Link from 'next/link';
import ProductCard from './components/ProductCard';
import Navbar from './components/Navbar'
import BackgroundImage from './components/BackgroundImage'

export default function Home() {
    return (
        <>
            <BackgroundImage/>
            <Navbar/>
            <main>
                <h1>Hello World</h1>
                <Link href="/users">Users</Link>
                <ProductCard></ProductCard>
            </main>


        </>

    )
}
