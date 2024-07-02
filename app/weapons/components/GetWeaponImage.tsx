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
const GetWeaponImage = ({ weapon, height, className }: { weapon: string, height: number, className?: string }) => {
    switch (weapon.toLowerCase()) {
        case 'car':
            return <Image className={className} src={CARImage} height={height} alt="CAR" title="CAR"/>;
        case 'r-97':
            return <Image className={className}  src={R97Image} height={height} alt="R97" title="R97"/>;
        case 'volt':
            return <Image className={className} src={VoltImage} height={height} alt="Volt" title="Volt"/>;
        case 'alternator':
            return <Image className={className} src={AlternatorImage} height={height} alt="Alternator" title="Alternator"/>;
        case 'r-101':
            return <Image className={className} src={R101Image} height={height} alt="R101" title="R101"/>;
        case 'flatline':
            return <Image className={className} src={FlatlineImage} height={height} alt="Flatline" title="Flatline"/>;
        case 'hemlok':
            return <Image className={className} src={HemlokImage} height={height} alt="Hemlok" title="Hemlok"/>;
        case 'g2':
            return <Image className={className} src={G2Image} height={height} alt="G2" title="G2"/>;
        case 'spitfire':
            return <Image className={className} src={SpitfireImage} height={height} alt="Spitfire" title="Spitfire"/>;
        default:
            return null;
    }
};
export default GetWeaponImage