"use server";

import { sql } from "@vercel/postgres";

const dbSaveAthlete = async (athlete, stats) => {
	console.log("dbSaveAthlete START");
	const inicio = Date.now();

	await sql`INSERT INTO athletes (athleteid, firstname, lastname, profile, enabled, anual_strava)  
             VALUES (${athlete.id}, ${athlete.firstname}, ${athlete.lastname},
			 ${athlete.profile}, FALSE, ${stats.ytd_ride_totals.distance})
             ON CONFLICT (athleteid) DO UPDATE
             SET firstname = ${athlete.firstname}, lastname = ${athlete.lastname},
			 profile =  ${athlete.profile}, anual_strava = ${stats.ytd_ride_totals.distance} `;

	console.log("dbSaveAthlete END: " + (Date.now() - inicio) + "ms");
};

export default dbSaveAthlete;
