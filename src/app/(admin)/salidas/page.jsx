"use client";

import dbReadActivities from "@/serveractions/admin/dbReadActivities";
import dbReadAthletes from "@/serveractions/admin/dbReadAthletes";
import { useEffect, useState } from "react";
import Activity from "./Activity";

const Salidas = () => {
	const [activities, setActivities] = useState([]);
	const [athletes, setAthletes] = useState([]);
	const [athleteid, setAthleteid] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			const data = await dbReadAthletes();
			setAthletes(data);
			setLoading(false);
		};
		load();
	}, []);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			const data = await dbReadActivities(athleteid);
			setActivities(data);
			setLoading(false);
		};
		load();
	}, [athleteid]);

	return (
		<div className="flex flex-col gap-1">
			<div>
				<select
					onChange={(e) => {
						setAthleteid(e.target.value);
					}}
				>
					<option value="someOption">Selección...</option>
					{athletes.map((athlete) => {
						return (
							<option value={athlete.athleteid} key={athlete.athleteid}>
								{athlete.firstname} {athlete.lastname}
							</option>
						);
					})}
				</select>
			</div>
			<ol role="list" className="flex flex-col gap-1">
				{activities.map((activity) => {
					return <Activity key={activity.activityid} activity={activity} setLoading={setLoading} />;
				})}
			</ol>
		</div>
	);
};

export default Salidas;
