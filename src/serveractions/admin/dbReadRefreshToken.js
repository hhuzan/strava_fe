"use server";

import { sql } from "@vercel/postgres";

const dbReadRefreshToken = async (athleteID) => {
	console.log("dbReadRefreshToken START");
	const inicio = Date.now();

	const { rows } = await sql`SELECT refreshtoken
            FROM refreshtokens
            WHERE athleteid = ${athleteID}`;

	console.log("dbReadRefreshToken END: " + (Date.now() - inicio) + "ms");
	return rows[0].refreshtoken;
};

export default dbReadRefreshToken;
