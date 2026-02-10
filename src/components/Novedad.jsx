import Image from "next/image";
import Mapa from "./Mapa";
import formatTimestamp from "@/utils/formatTimestamp";
import formatdistance from "@/utils/formatdistance";
import imageURL from "@/utils/imageurl";
import fetchPolyline from "@/serveractions/fetchpolyline";

const Novedad = async ({ novedad }) => {
	const encodedString = await fetchPolyline(novedad.activityid);
	return (
		<li className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg">
			<div className="flex flex-col text-text">
				<div className="flex">
					<div className="py-1">
						<Image
							className="h-12 w-12 rounded-lg"
							src={imageURL(novedad.profile)}
							alt={novedad.firstname}
							width={48}
							height={48}
						/>
					</div>
					<div className="flex grow flex-col justify-around">
						<div className="flex justify-center text-xl font-medium">
							{novedad.firstname} {novedad.lastname}
						</div>
						<div className="flex justify-around text-muted text-sm">
							<p>{formatTimestamp(novedad.date.seconds)}</p>
							{novedad.brzn ? <p>✅</p> : <p></p>}
							{novedad.manual ? (
								<p className="line-through text-red-700">{formatdistance(novedad.distance, 1)}</p>
							) : (
								<p>{formatdistance(novedad.distance, 1)}</p>
							)}
						</div>
					</div>
				</div>
				<div className="font-medium p-1">{novedad.name}</div>
			</div>
			{<Mapa encodedString={encodedString} />}
		</li>
	);
};

export default Novedad;
