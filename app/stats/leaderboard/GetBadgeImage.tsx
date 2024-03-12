import Image from 'next/image';
import BronzeBadge from '@/public/images/badges/Bronze_Badge.png';
import SilverBadge from '@/public/images/badges/Silver_Badge.png';
import GoldBadge from '@/public/images/badges/Gold_Badge.png';
import PlatinumBadge from '@/public/images/badges/Platinum_Badge.png';
import DiamondBadge from '@/public/images/badges/Diamond_Badge.png';
import MastersBadge from '@/public/images/badges/Masters_Badge.png';
import ApexPredatorBadge from '@/public/images/badges/Apex_Predator_Badge.png';

const GetBadgeImage = ({mmr}: { mmr: number }) => {
        if (mmr > 620.1) {
            return <Image src={ApexPredatorBadge} alt="ApexPredator" title="Predator"/>;
        } else if (mmr > 610.1 && mmr < 620.1) {
            return <Image src={MastersBadge} alt="Masters" title="Masters"/>;
        } else if (mmr > 600.1 && mmr < 610.1) {
            return <Image src={DiamondBadge} alt="Diamond" title="Diamond"/>;
        } else if (mmr > 590.1 && mmr < 600.1) {
            return <Image src={PlatinumBadge} alt="Platinum" title="Platinum"/>;
        } else if (mmr > 580.1 && mmr < 590.1) {
            return <Image src={GoldBadge} alt="Gold" title="Gold"/>;
        } else if (mmr > 570.1 && mmr < 580.1) {
            return <Image src={SilverBadge} alt="Silver" title="Silver"/>;
        } else if (mmr < 570.1) {
            return <Image src={BronzeBadge} alt="Bronze" title="Bronze"/>;
        }
        else{
            return <Image src={BronzeBadge} alt=""/>;
        }
    };

export default GetBadgeImage