import { sql } from "@vercel/postgres";

const dbUpdateEnabled = async (athleteid, enabled) => {
	await sql`UPDATE athletes
	SET enabled = ${enabled}
    WHERE athleteid = ${athleteid} `;
};

export default dbUpdateEnabled;
