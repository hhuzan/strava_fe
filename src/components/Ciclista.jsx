"use client";

import Image from "next/image";
import { useState } from "react";
import Salidas from "./Salidas";
import formatdistance from "@/utils/formatdistance";
import imageURL from "@/utils/imageurl";
import Mensuales from "./Mensuales";

const Numerito = ({ q }) => {
	if (q > 0) return <p className="font-semibold text-red-800 dark:text-yellow-500">{q}</p>;
	return <p>-</p>;
};

const TickQ1 = ({ q1 }) => {
	if (q1 >= 2) return <p>✅&nbsp;&nbsp;</p>;
	return <p>❌&nbsp;&nbsp;</p>;
};

const TickQ2 = ({ q1, q2 }) => {
	if (q1 >= 2 && q2 >= 2) return <p>✅&nbsp;&nbsp;</p>;
	if (q2 >= 4) return <p>✅&nbsp;&nbsp;</p>;
	return <p>❌&nbsp;&nbsp;</p>;
};

const TickQ3 = ({ q1, q2, q3 }) => {
	if (q1 >= 2 && q2 >= 2 && q3 >= 2) return <p>✅&nbsp;&nbsp;</p>;
	if (q2 >= 4 && q3 >= 2) return <p>✅&nbsp;&nbsp;</p>;
	if (q3 >= 6) return <p>✅&nbsp;&nbsp;</p>;
	return <p>❌&nbsp;&nbsp;</p>;
	return <p>➖&nbsp;&nbsp;</p>;
};

const isAdmin = () => {
	try {
		const athleteid = localStorage.getItem("athleteid");
		return athleteid === "27488709" || athleteid === "5955129";
	} catch (e) {
		return false;
	}
};

const Ciclista = ({ ciclista, index, tops }) => {
	const [showSalidas, setShowSalidas] = useState(false);
	return (
		<li className="py-1 bg-surface rounded-lg">
			<div className="flex items-center" onClick={() => setShowSalidas(!showSalidas)}>
				<p className="text-center text-4xl font-medium text-muted min-w-12">{ciclista.distance == 0 ? "-" : index + 1}</p>
				<Image
					className="h-16 w-16 rounded-lg"
					src={imageURL(ciclista.profile)}
					alt={ciclista.firstname}
					width={64}
					height={64}
				/>
				<div className="ml-1 grow text-center">
					<p className="text-xl h-12 overflow-hidden font-bold text-text">
						{ciclista.firstname} {ciclista.lastname}
					</p>
					<p className="text-xl font-medium text-muted truncate">{formatdistance(ciclista.distance, 0)}</p>
				</div>
				{tops && <Mensuales tops={tops} athleteid={ciclista.athleteid} />}
				{ciclista.q1 && (
					<div className="flex flex-col text-xs">
						<TickQ1 q1={ciclista.q1} />
						<TickQ2 q1={ciclista.q1} q2={ciclista.q2} />
						<TickQ3 q1={ciclista.q1} q2={ciclista.q2} q3={ciclista.q3} />
					</div>
				)}
				{ciclista.q1 && isAdmin() && (
					<div className="flex flex-col text-xs">
						<Numerito q={ciclista.q1} />
						<Numerito q={ciclista.q2} />
						<Numerito q={ciclista.q3} />
					</div>
				)}
			</div>
			{showSalidas && <Salidas athleteid={ciclista.athleteid} tops={tops} />}
		</li>
	);
};

export default Ciclista;
