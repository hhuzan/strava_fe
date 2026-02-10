import { permanentRedirect } from "next/navigation";
import authorize from "@/utils/authorize";
import dbSaveAuthorization from "@/serveractions/admin/dbSaveAuthorization";
import dbSaveAthlete from "@/serveractions/admin/dbSaveAthlete";
import dbDeleteActivities from "@/serveractions/admin/dbDeleteActivities";

const getAthlete = async (access_token) => {
	console.log("getAthlete START");
	const inicio = Date.now();

	const url = `https://www.strava.com/api/v3/athlete?access_token=${access_token}`;
	const athlete = await fetch(url);

	console.log("getAthlete END: ", Date.now() - inicio, "ms");
	return await athlete.json();
};

const getAthleteStats = async (access_token, id) => {
	console.log("getAthleteStats START");
	const inicio = Date.now();

	const url = `https://www.strava.com/api/v3/athletes/${id}/stats/?access_token=${access_token}`;
	const stats = await fetch(url);

	console.log("getAthleteStats END: ", Date.now() - inicio, "ms");
	return await stats.json();
};

const setAthlete = async (accessToken) => {
	const athlete = await getAthlete(accessToken);
	const stats = await getAthleteStats(accessToken, athlete.id);
	//TODO: paralelizar
	await dbSaveAthlete(athlete, stats);
	// await dbDeleteActivities(athlete.id);
	//TODO: borrar polylines
};

export const GET = async (request) => {
	const code = request.nextUrl.searchParams.get("code");
	const authorization = await authorize(code);
	// code to update server data
	await dbSaveAuthorization(authorization);
	await setAthlete(authorization.access_token);
	permanentRedirect("/?athleteid=" + authorization.athlete.id);
};
