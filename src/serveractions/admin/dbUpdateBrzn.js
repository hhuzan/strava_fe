"use server";

import { sql } from "@vercel/postgres";

const dbUpdateBrzn = async (activityid, brzn) => {
	await sql`UPDATE activities
	SET brzn = ${brzn}
    WHERE activityid = ${activityid} `;
};

export default dbUpdateBrzn;
