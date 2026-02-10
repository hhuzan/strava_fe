const authorize = async (code) => {
	console.log("authorize START");
	const inicio = Date.now();

	const auth_link = "https://www.strava.com/oauth/token";
	const res = await fetch(auth_link, {
		method: "post",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
			client_secret: process.env.STRAVA_CLIENT_SECRET,
			code: code,
			grant_type: "authorization_code",
		}),
	});

	console.log("authorize END: ", Date.now() - inicio, "ms");
	const authorization = await res.json();
	console.log(authorization);
	return authorization;
};

export default authorize;
