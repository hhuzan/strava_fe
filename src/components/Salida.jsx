"use client";

import formatTimestamp from "@/utils/formatTimestamp";
import formatdistance from "@/utils/formatdistance";
import DynMap from "@/components/DynMap";

const Salida = ({ salida, index, orden }) => {
	return (
		<li className="flex flex-col px-4 py-2 bg-white dark:bg-black dark:text-white">
			<div className="flex items-center gap-2">
				<p className="text-muted">{orden}</p>
				<div className="grow">
					<p className="text-center text-text font-semibold">{salida.name}</p>
					<div className="flex justify-around text-muted">
						<p>{formatTimestamp(salida.date)}</p>
						<p>
							{salida.brzn && "✅ "} {salida.flagged && "🚩"}
						</p>
						<p className={salida.manual ? "line-through text-red-700" : "font-bold"}>
							{formatdistance(salida.distance, 1)}
						</p>
					</div>
				</div>
			</div>
			{index < 16 && <DynMap activityid={salida.activityid} />}
		</li>
	);
};

export default Salida;
