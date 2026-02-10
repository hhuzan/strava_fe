"use server";

import { sql } from "@vercel/postgres";

const dbReadAccessToken = async (athleteID) => {
	console.log("dbReadAccessToken START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT accesstoken, expiresat
            FROM accesstokens
            WHERE athleteid = ${athleteID}`;

	console.log("dbReadAccessToken END: " + (Date.now() - inicio) + "ms");
	return rows[0];
};

export default dbReadAccessToken;
