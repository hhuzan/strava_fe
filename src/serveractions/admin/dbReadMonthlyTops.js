"use server";

import { sql } from "@vercel/postgres";

const dbReadMonthlyTops = async () => {
	console.log("dbReadMonthlyTops START");
	const inicio = Date.now();

	const { rows } = await sql`
	WITH mensual AS (
    		SELECT athletes.athleteid, 
		        SUM(activities.distance) AS total_distance, 
        		EXTRACT(MONTH FROM date)::integer AS mes
    		FROM activities
    		JOIN athletes ON activities.athleteid = athletes.athleteid
    		WHERE enabled = TRUE
      		AND sporttype IN ('Ride', 'GravelRide', 'MountainBikeRide')
			AND manual = FALSE
			AND deleted = FALSE
    		GROUP BY athletes.athleteid, mes
		),
		max_mensual AS (
    		SELECT mes, 
		        MAX(total_distance) AS max_dist
    		FROM mensual
    		GROUP BY mes
		)
		SELECT athleteid, mensual.mes
		FROM mensual
		JOIN max_mensual
    	ON mensual.mes = max_mensual.mes AND mensual.total_distance =  max_mensual.max_dist
		ORDER BY  mensual.mes, athleteid; `;

	console.log("dbReadMonthlyTops END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadMonthlyTops;
