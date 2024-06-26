import Image from 'next/image';
import PilotBackgroundPhoto from '@/public/images/background/bg1920.png';

const BackgroundImage = () => {

    return (
        <div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%]">
            <Image  className="absolute inset-0 m-auto min-w-[50%] min-h-[50%]"  src={PilotBackgroundPhoto} alt="Pilot"/>
        </div>

    );
};
export default BackgroundImage