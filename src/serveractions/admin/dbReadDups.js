"use server";

import { sql } from "@vercel/postgres";

const dbReadDups = async () => {
	console.log("dbReadDups START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT
        athl.firstname, athl.lastname,
        act1.name as name1, act1.sporttype AS sporttype1, 
        act1.date AT TIME ZONE 'America/Argentina/Buenos_Aires' AT TIME ZONE 'America/Argentina/Buenos_Aires' AS date1, act1.etime AS etime1,
        act1.distance AS distance1,
        act1.activityid as activityid1,
        act2.name AS name2, act2.sporttype AS sporttype2,
        act2.date AT TIME ZONE 'America/Argentina/Buenos_Aires' AT TIME ZONE 'America/Argentina/Buenos_Aires' AS date2, act2.etime AS etime2,
        act2.distance AS distance2,
        act2.activityid as activityid2
        FROM activities AS act1, activities AS act2, athletes AS athl
        WHERE act1.athleteid = act2.athleteid
        AND act1.athleteid = athl.athleteid
        AND act1.activityid <> act2.activityid
        AND act2.date > act1.date
        AND act2.date < act1.date + make_interval(secs => act1.etime)
        AND act1.deleted = FALSE
        AND act2.deleted = FALSE
        ORDER BY athl.firstname, athl.lastname, act1.date; `;

	console.log("dbReadDups END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadDups;
