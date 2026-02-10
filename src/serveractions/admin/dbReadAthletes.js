"use server";

import { sql } from "@vercel/postgres";

const dbReadAthletes = async () => {
	const { rows } = await sql`SELECT athleteid, profile, firstname, lastname, enabled, anual_strava::integer,
		(SELECT sum(distance) AS distance
			FROM activities
    		WHERE activities.athleteid = athletes.athleteid
    		AND (
        		sporttype = 'Ride'
        		OR sporttype = 'GravelRide'
        		OR sporttype = 'MountainBikeRide')
			AND deleted = FALSE
    		GROUP BY athleteid )
        FROM athletes
        ORDER BY firstname, lastname `;

	return rows;
};

export default dbReadAthletes;
