"use server";

import { sql } from "@vercel/postgres";

const dbDeleteActivities = async (athleteid) => {
	console.log("dbDeleteActivities START");
	const inicio = Date.now();

	await sql`UPDATE activities SET deleted = TRUE  WHERE athleteid = ${athleteid}`;

	console.log("dbDeleteActivities END: " + (Date.now() - inicio) + "ms");
};

export default dbDeleteActivities;
