import Image from "next/image";

const Strava = () => {
	const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;
	const redirectUri = encodeURIComponent(`${appUrl}/exchange_token`);
	const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=activity:read`;
	return (
		<div className="flex flex-col gap-32 items-center py-32">
			<Image className="h-32 w-32 rounded-full" src="/logo192.png" alt="Logo BiRuedas ZN" width={512} height={512} />
			<a
				href={authUrl}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
			>
				Conectar con Strava
			</a>
		</div>
	);
};

export default Strava;
