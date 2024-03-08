import Image from 'next/image';
import IonImage from '@/public/images/ion.png';
import ToneImage from '@/public/images/tone.png';
import MonarchImage from '@/public/images/monarch.png';
import RoninImage from '@/public/images/ronin.png';
import NorthstarImage from '@/public/images/northstar.png';
import LegionImage from '@/public/images/legion.png';
import ScorchImage from '@/public/images/scorch.png';

const GetTitanImage = ({ titan }: { titan: string }) => {
    switch (titan.toLowerCase()) {
        case 'ion':
            return <Image src={IonImage} alt="Ion" title="Ion"/>;
        case 'tone':
            return <Image src={ToneImage} alt="Tone" title="Tone"/>;
        case 'monarch':
            return <Image src={MonarchImage} alt="Monarch" title="Monarch"/>;
        case 'ronin':
            return <Image src={RoninImage} alt="Ronin" title="Ronin"/>;
        case 'northstar':
            return <Image src={NorthstarImage} alt="Northstar" title="Northstar"/>;
        case 'legion':
            return <Image src={LegionImage} alt="Legion" title="Legion"/>;
        case 'scorch':
            return <Image src={ScorchImage} alt="Scorch" title="Scorch"/>;
        default:
            return null; 
    }
};

export default GetTitanImage;