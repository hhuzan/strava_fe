"use server";

import { sql } from "@vercel/postgres";

const dbReadMonthlyRanking = async () => {
	console.log("dbReadMonthlyRanking START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT athletes.athleteid, firstname, lastname, profile,
    			COALESCE(SUM(activities.distance), 0)::integer AS distance
		FROM athletes
		LEFT JOIN activities
       		ON athletes.athleteid = activities.athleteid
       		AND sporttype IN ('Ride', 'GravelRide', 'MountainBikeRide')
       		AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM NOW())
			AND manual = FALSE
			AND deleted = FALSE
		WHERE enabled IS TRUE
		GROUP BY athletes.athleteid, firstname, lastname, profile
		ORDER BY distance DESC, firstname, lastname; `;

	console.log("dbReadMonthlyRanking END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadMonthlyRanking;
