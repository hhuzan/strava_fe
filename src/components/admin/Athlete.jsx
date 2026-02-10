import Habilitado from "./Habilitado";
import Link from "next/link";
import imageURL from "@/utils/imageurl";
import Image from "next/image";

const Athlete = ({ athlete, setLoading }) => {
	return (
		<li className="flex justify-between pl-4 pr-12 py-2 odd:bg-slate-200 even:bg-white font-semibold text-lg">
			{/* <Link href={"/admin/ciclista?athleteId=" + }> */}

			<div className="flex gap-2">
				<Link href={"https://www.strava.com/athletes/" + athlete.athleteid}>
					<Image
						className="h-8 w-8 rounded-lg"
						src={imageURL(athlete.profile)}
						alt={athlete.firstname}
						width={32}
						height={32}
					/>
				</Link>
				{athlete.firstname} {athlete.lastname}
				{athlete.distance > 0 && athlete.anual_strava == 0 && (
					<div className="text-slate-500 italic">[Perfil Restringido]</div>
				)}
				{athlete.anual_strava > 0 &&
					(athlete.distance - athlete.anual_strava > 50 || athlete.distance - athlete.anual_strava < -50) && (
						<div className="text-red-500 font-bold underline">
							{Math.round((athlete.distance - athlete.anual_strava) / 100) / 10 + " Km"}
						</div>
					)}
			</div>
			{/* </Link> */}

			<Habilitado athlete={athlete} setLoading={setLoading} />
		</li>
	);
};

export default Athlete;
