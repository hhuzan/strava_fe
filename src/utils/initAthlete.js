"use client";

import dbSaveActivity from "@/serveractions/admin/dbSaveActivity";
import fbSavePolyline from "@/serveractions/admin/fbSavePolyline";
import fbSaveActivities from "@/serveractions/admin/fbSaveActivities";
import getAccessToken from "@/serveractions/admin/getAccessToken";
import redoRanking from "@/serveractions/admin/redoRanking";
import redoMonthlyRanking from "@/serveractions/admin/redoMonthlyRanking";
import redoNovedades from "@/serveractions/admin/redoNovedades";

const delay = async (n) => {
	return new Promise((resolve) => setTimeout(resolve, n));
};

const zzzz = async (activities) => {};

//Laaargo (debe correr en client!!!!)
const saveActivities = async (accessToken) => {
	var page = 1;
	let activities = [];
	do {
		const url = `https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&after=1735700400&before=1767236399&page=${page++}}`;
		const res = await fetch(url);
		activities = await res.json();

		// const inicio = Date.now();

		// for (activity of activities) {
		// 	console.log(activity);
		// 	await dbSaveActivity(activity);
		// 	await fbSavePolyline(activity);
		// }

		await Promise.all(
			activities.map(async (activity) => {
				await Promise.all([dbSaveActivity(activity), fbSavePolyline(activity)]);
			})
		);

		// alert("initAthlete Batch END: " + (Date.now() - inicio) + "ms");
	} while (activities.length > 0);
};

const initAthlete = async (athleteId) => {
	const accessToken = await getAccessToken(athleteId);
	await saveActivities(accessToken);
	await fbSaveActivities(athleteId);
	// await redoRanking();
	// await redoMonthlyRanking();
	// await redoNovedades();
	// await Promise.all([redoRanking(), redoMonthlyRanking(), redoNovedades(), fbSaveActivities(athleteId)]);
};

export default initAthlete;
