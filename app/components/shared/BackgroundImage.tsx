import Image from 'next/image';
import PilotBackgroundPhoto from '@/public/images/background/bg1920_2.png';
import PilotBackgroundPhotoMobile from '@/public/images/background/bg1920_mobile.png';
type Props = {
    classProperties?: string;
}
const BackgroundImage = ({classProperties}: Props) => {

    return (
        <div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%]">
            <Image className={`hidden sm:block absolute inset-0 m-auto min-w-[50%] min-h-[50%]  ${classProperties}`} src={PilotBackgroundPhoto} alt="Pilot"/>
            <Image className={`sm:hidden absolute inset-0 m-auto min-w-[50%] min-h-[50%]  ${classProperties}`} src={PilotBackgroundPhotoMobile} alt="Pilot"/>
        </div>

    );
};
export default BackgroundImage