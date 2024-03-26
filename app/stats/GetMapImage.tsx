import Image from 'next/image';
import BoomtownImage from '../../public/images/maps/Boomtown.webp';
import ExoImage from '../../public/images/maps/Exoplanet.webp';
import EdenImage from '../../public/images/maps/Eden.webp';
import DrydockImage from '../../public/images/maps/Drydock.webp';
import AngelImage from '../../public/images/maps/AngelCity.webp';
import ColonyImage from '../../public/images/maps/Colony.webp';
import GlitchImage from '../../public/images/maps/Glitch.webp';
const GetMapImage = ({ map }: { map: string }) => {
    switch (map.toLowerCase()) {
        case 'boomtown':
            return <Image src={BoomtownImage} alt="Boomtown" title="Boomtown"/>;
        case 'exo':
            return <Image src={ExoImage} alt="Exo" title="Exo"/>;
        case 'eden':
            return <Image src={EdenImage} alt="Eden" title="Eden"/>;
        case 'drydock':
            return <Image src={DrydockImage} alt="Drydock" title="Drydock"/>;
        case 'angel':
            return <Image src={AngelImage} alt="Angel" title="Angel"/>;
        case 'colony':
            return <Image src={ColonyImage} alt="Colony" title="Colony"/>;
        case 'glitch':
            return <Image src={GlitchImage} alt="Glitch" title="Glitch"/>;
        default:
            return null;
    }
};
export default GetMapImage