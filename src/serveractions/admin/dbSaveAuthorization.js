"use server";

import { sql } from "@vercel/postgres";

const dbSaveAuthorization = async (authorization) => {
	console.log("dbSaveAuthorization START");
	const inicio = Date.now();

	await sql`INSERT INTO refreshtokens (athleteid, refreshtoken)  
			 VALUES (${authorization.athlete.id}, ${authorization.refresh_token}) ON CONFLICT (athleteid) DO UPDATE 
			 SET refreshtoken = ${authorization.refresh_token} `;
	await sql`INSERT INTO accesstokens (athleteid, accesstoken, expiresat)  
			 VALUES (${authorization.athlete.id}, ${authorization.access_token}, ${authorization.expires_at}) ON CONFLICT (athleteid) DO UPDATE 
			 SET accesstoken = ${authorization.access_token}, expiresat = ${authorization.expires_at} `;

	console.log("dbSaveAuthorization END: " + (Date.now() - inicio) + "ms");
};

export default dbSaveAuthorization;
