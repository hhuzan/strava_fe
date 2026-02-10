"use server";

import { sql } from "@vercel/postgres";

const dbReadNovedades = async () => {
	console.log("dbReadNovedades START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT activityid, profile, firstname, lastname, activities.name,
	date, activities.distance::integer, manual, brzn, flagged
	FROM activities, athletes
	WHERE activities.athleteid = athletes.athleteid
	AND enabled IS TRUE
	AND (
		sporttype = 'Ride'
		OR sporttype = 'GravelRide'
		OR sporttype = 'MountainBikeRide'
	)
	AND deleted = FALSE
	ORDER BY date DESC
	LIMIT 50 `;

	console.log("dbReadNovedades END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadNovedades;
