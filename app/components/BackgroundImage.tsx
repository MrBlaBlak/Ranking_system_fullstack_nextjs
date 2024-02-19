import Image from 'next/image';
import PilotBackgroundPhoto from '@/public/images/landingImage.jpg';

const BackgroundImage = () => {
    return (
        <Image  className="bg-cover bg-center fixed" src={PilotBackgroundPhoto} alt="Pilot"/>
    );
};
export default BackgroundImage