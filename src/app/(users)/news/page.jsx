import fetchNovedades from "@/serveractions/fetchnovedades";
import Novedad from "@/components/Novedad";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const News = async () => {
	const novedades = await fetchNovedades();

	return (
		<ol role="list" className="flex flex-col gap-1">
			{novedades.map((novedad, index) => {
				return <Novedad key={index} novedad={novedad} />;
			})}
		</ol>
	);
};

export default News;
