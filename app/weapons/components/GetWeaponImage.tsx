import Image from 'next/image';
import CARImage from '@/public/images/weapons/CAR.webp';
import R97Image from '@/public/images/weapons/R97.webp';
import VoltImage from '@/public/images/weapons/Volt.webp';
import AlternatorImage from '@/public/images/weapons/Alternator.webp';
import R101Image from '@/public/images/weapons/R101.webp';
import FlatlineImage from '@/public/images/weapons/Flatline.webp';
import G2Image from '@/public/images/weapons/G2A4.webp';
import HemlokImage from '@/public/images/weapons/Hemlok.webp';
import SpitfireImage from '@/public/images/weapons/Spitfire.webp';
const GetWeaponImage = ({ weapon }: { weapon: string }) => {
    switch (weapon.toLowerCase()) {
        case 'car':
            return <Image src={CARImage} height={100} alt="CAR" title="CAR"/>;
        case 'r-97':
            return <Image src={R97Image} height={100} alt="R97" title="R97"/>;
        case 'volt':
            return <Image src={VoltImage} height={100} alt="Volt" title="Volt"/>;
        case 'alternator':
            return <Image src={AlternatorImage} height={100} alt="Alternator" title="Alternator"/>;
        case 'r-101':
            return <Image src={R101Image} height={100} alt="R101" title="R101"/>;
        case 'flatline':
            return <Image src={FlatlineImage} height={100} alt="Flatline" title="Flatline"/>;
        case 'hemlok':
            return <Image src={HemlokImage} height={100} alt="Hemlok" title="Hemlok"/>;
        case 'g2':
            return <Image src={G2Image} height={100} alt="G2" title="G2"/>;
        case 'spitfire':
            return <Image src={SpitfireImage} height={100} alt="Spitfire" title="Spitfire"/>;
        default:
            return null;
    }
};
export default GetWeaponImage