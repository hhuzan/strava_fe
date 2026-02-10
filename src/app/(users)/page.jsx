import fetchRanking from "@/serveractions/fetchranking";
import Ciclista from "@/components/Ciclista";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Home = async () => {
	const ranking = await fetchRanking();

	return (
		<ol role="list" className="flex flex-col gap-1">
			{ranking.map((ciclista, index) => {
				return <Ciclista key={ciclista.athleteid} ciclista={ciclista} index={index} />;
			})}
		</ol>
	);
};

export default Home;
