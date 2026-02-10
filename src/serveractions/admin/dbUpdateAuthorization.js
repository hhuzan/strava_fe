"use server";

import { sql } from "@vercel/postgres";

const dbUpdateAuthorization = async (athleteid, aut) => {
	console.log("dbUpdateAuthorization START");
	const inicio = Date.now();

	await sql`UPDATE refreshtokens SET refreshtoken = ${aut.refresh_token}
	            WHERE athleteid = ${athleteid}`;

	await sql`UPDATE accesstokens SET accesstoken = ${aut.access_token} , expiresat = ${aut.expires_at} 
                WHERE athleteid = ${athleteid}`;

	console.log("dbUpdateAuthorization END: " + (Date.now() - inicio) + "ms");
};

export default dbUpdateAuthorization;
