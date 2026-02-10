// "use server";

import dbReadRefreshToken from "./dbReadRefreshToken";
import dbUpdateAuthorization from "./dbUpdateAuthorization";

const reAuthorize = async (athleteID) => {
	console.log("reAuthorize START");
	const inicio = Date.now();

	const authorizationURL = "https://www.strava.com/oauth/token";
	const refreshToken = await dbReadRefreshToken(athleteID);
	const res = await fetch(authorizationURL, {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
			client_secret: process.env.STRAVA_CLIENT_SECRET,
			refresh_token: refreshToken,
			grant_type: "refresh_token",
		}),
	});
	if (!res.ok) {
		throw new Error("Fetch response in reAuthorize not OK.");
	}
	const authorization = await res.json();
	await dbUpdateAuthorization(athleteID, authorization);

	console.log("reAuthorize END: ", Date.now() - inicio, "ms");
	return authorization.access_token;
};

export default reAuthorize;
