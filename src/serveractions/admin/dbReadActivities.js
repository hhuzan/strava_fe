"use server";

import { sql } from "@vercel/postgres";

const dbReadActivities = async (athleteid) => {
	console.log("dbReadActivities START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT activityid, date, name, activities.distance::integer, manual, brzn, flagged
        FROM athletes, activities
        WHERE athletes.athleteid = activities.athleteid
        AND athletes.athleteid = ${athleteid}
        AND (
            sporttype = 'Ride'
            OR sporttype = 'GravelRide'
            OR sporttype = 'MountainBikeRide'
        )
        AND deleted = FALSE
        ORDER BY date DESC `;

	console.log("dbReadActivities END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadActivities;
