"use server";

import { sql } from "@vercel/postgres";

const dbReadRelatives = async (activityid) => {
	console.log("dbReadRel START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT ath.athleteid, firstname, lastname, act2.name,
        act2.date, act2.distance, act2.activityid, act2.brzn,
        (LEAST(act1.maxlat, act2.maxlat) - GREATEST(act1.minlat, act2.minlat)) *
        (LEAST(act1.maxlng, act2.maxlng) - GREATEST(act1.minlng, act2.minlng)) *
        (LEAST(EXTRACT(EPOCH FROM act1.date) + act1.etime, EXTRACT(EPOCH FROM act2.date) + act2.etime) - 
        GREATEST(EXTRACT(EPOCH FROM act1.date), EXTRACT(EPOCH FROM act2.date))) AS coinsidence
        FROM activities act1, activities act2, athletes ath
        WHERE act1.activityid = ${activityid}
        AND act2.athleteid = ath.athleteid 
        AND act1.date<= act2.date + make_interval(0,0,0,0,0,0,act2.etime)
        AND act2.date<= act1.date + make_interval(0,0,0,0,0,0,act1.etime)
        AND act1.minlat <= act2.maxlat
        AND act2.minlat <= act1.maxlat
        AND act1.minlng <= act2.maxlng
        AND act2.minlng <= act1.maxlng
        AND (
	        act2.sporttype = 'Ride'
            OR act2.sporttype = 'GravelRide'
            OR act2.sporttype = 'MountainBikeRide'
        )
        AND act2.deleted = FALSE
        ORDER BY coinsidence DESC`;

	console.log("dbReadRel END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadRelatives;
