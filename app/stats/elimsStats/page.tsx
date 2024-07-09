import Table from './components/Table'
import { getElimsStats } from '@/app/api/gamers/prismaActions';

interface ElimsStats {
    name: string;
    total_kills_on_map: number;
    times_map_was_played: number;
    max_kills_on_map: number;
    map: string;
}
async function Page() {
    const resultsKills: ElimsStats[] = await getElimsStats();
  
    return (
        <Table resultsKills={resultsKills}/>
    );
}export default Page;