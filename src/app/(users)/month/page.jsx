import fetchMonthly from "@/serveractions/fetchmonthly";
import Ciclista from "@/components/Ciclista";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Month = async () => {
	const monthly = await fetchMonthly();

	return (
		<ol role="list" className="flex flex-col gap-1">
			{monthly.ranking.map((ciclista, index) => {
				return <Ciclista key={ciclista.athleteid} ciclista={ciclista} index={index} tops={monthly.tops} />;
			})}
		</ol>
	);
};

export default Month;
