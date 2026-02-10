"use client";

import fetchSalidas from "@/serveractions/fetchsalidas";
import Salida from "@/components/Salida";
import { useState, useEffect } from "react";

const Salidas = ({ athleteid, tops }) => {
	const [salidas, setSalidas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			const data = await fetchSalidas(athleteid);
			if (tops) {
				const month = new Date().getMonth();
				const filtered = data.filter((salida) => new Date(salida.date * 1000).getMonth() == month);
				setSalidas(filtered);
			} else {
				setSalidas(data);
			}
			setIsLoading(false);
		};
		load();
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				>
					<span className="!absolute -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
						Loading...
					</span>
				</div>
			</div>
		);
	} else {
		return (
			<ol className="flex flex-col gap-1">
				{salidas.map((salida, index) => {
					return <Salida key={index} index={index} orden={salidas.length - index} salida={salida} />;
				})}
			</ol>
		);
	}
};

export default Salidas;
