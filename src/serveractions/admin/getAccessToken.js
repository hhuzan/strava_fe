"use server";

import dbReadAccessToken from "./dbReadAccessToken";
import reAuthorize from "./reAuthorize";

const getAccessToken = async (athleteId) => {
	const row = await dbReadAccessToken(athleteId);
	if (row.expiresat * 1000 > Date.now() + 600000) {
		return row.accesstoken;
	}
	return await reAuthorize(athleteId);
};

export default getAccessToken;
