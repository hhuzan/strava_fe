import dbReadDups from "../../../serveractions/admin/dbReadDups";
import Dup from "./Dup";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Dups = async () => {
	const dups = await dbReadDups();

	return (
		<ul role="list" className="flex flex-col gap-12 p-2 text-slate-900 dark:text-slate-100 text-sm">
			{dups.map((dup, index) => {
				return <Dup key={index} dup={dup} />;
			})}
		</ul>
	);
};

export default Dups;
