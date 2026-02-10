"use client";

import { useEffect, useState } from "react";
import dbReadRelatives from "@/serveractions/admin/dbReadRelatives";
// import DynMap from "@/components/DynMap";
import dynamic from "next/dynamic";
import formatDate from "@/utils/formatDate";
import formatdistance from "@/utils/formatdistance";
import Brzn from "./Brnz";

const Relatives = ({ activityid, setLoading, setActivityBrzn }) => {
	const [relatives, setRelatives] = useState([]);
	// const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const data = await dbReadRelatives(activityid);
			setRelatives(data);
			setLoading(false);
		};
		load();
	}, []);

	const DynMap = dynamic(() => import("@/components/DynMap"), { ssr: false });

	// if (isLoading) {
	// 	return (
	// 		<div className="flex items-center justify-center">
	// 			<div
	// 				className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-orange-800 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-orange-600"
	// 				role="status"
	// 			>
	// 				<span className="!absolute -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
	// 					Loading...
	// 				</span>
	// 			</div>
	// 		</div>
	// 	);
	// } else {
	return (
		<ol className="flex flex-col gap-1">
			{relatives.map((relative) => {
				return (
					<li key={relative.activityid} className="flex flex-col px-4 py-2 bg-white dark:bg-black dark:text-white">
						<div>
							{relative.firstname} {relative.lastname}
						</div>
						<div>{relative.name}</div>
						<div className="flex flex-row gap-4">
							<p>{formatDate(relative.date)}</p>
							<p>{formatdistance(relative.distance, 1)}</p>
							<Brzn relative={relative} activityid={activityid} setActivityBrzn={setActivityBrzn} />
						</div>
						<DynMap activityid={relative.activityid} />
					</li>
				);
			})}
		</ol>
	);
	// }
};

export default Relatives;
