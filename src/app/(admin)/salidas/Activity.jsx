"use client";

import formatDate from "@/utils/formatDate";
import formatdistance from "@/utils/formatdistance";
import { useState } from "react";
import Relatives from "./Relatives";

const Activity = ({ activity, setLoading }) => {
	const [showRel, setShowRel] = useState(false);
	const [activityBrzn, setActivityBrzn] = useState(activity.brzn);
	return (
		<li className="py-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-900 dark:text-slate-100">
			<div onClick={() => setShowRel(!showRel)}>
				<div>{activity.name}</div>
				<div className="flex flex-row gap-4">
					<p>{formatDate(activity.date)}</p>
					<p>{activityBrzn && "✅"}</p>
					<p>{formatdistance(activity.distance, 1)}</p>
				</div>
			</div>
			{showRel && <Relatives activityid={activity.activityid} setLoading={setLoading} setActivityBrzn={setActivityBrzn} />}
		</li>
	);
};

export default Activity;
