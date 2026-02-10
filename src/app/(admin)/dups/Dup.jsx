"use client";

import formatdistance from "@/utils/formatdistance";
import formatDate from "@/utils/formatDate";
import dynamic from "next/dynamic";

const Dup = ({ dup }) => {
	const DynMap = dynamic(() => import("@/components/DynMap"), { ssr: false });

	return (
		<li className="flex flex-col p-2 gap-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
			<div className="flex justify-center font-bold text-lg">
				{dup.firstname} {dup.lastname}
			</div>
			<div className="flex flex-col">
				<div className="font-semibold">{dup.name1}</div>
				<div className="flex flex-row justify-around">
					<div>{formatDate(dup.date1)}</div>
					<div>{Math.round(dup.etime1 / 60)}min</div>
					<div>{formatdistance(dup.distance1, 1)}</div>
				</div>
				<DynMap activityid={dup.activityid1} />
			</div>
			<div className="flex flex-col">
				<div className="font-semibold">{dup.name2}</div>
				<div className="flex flex-row justify-around">
					<div>{formatDate(dup.date2)}</div>
					<div>{Math.round(dup.etime2 / 60)}min</div>
					<div>{formatdistance(dup.distance2, 1)}</div>
				</div>
				<DynMap activityid={dup.activityid2} />
			</div>
		</li>
	);
};

export default Dup;
