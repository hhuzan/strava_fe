"use client";
//TODO: convertir en server

import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import fetchUsage from "./fetchUsage";
import fetchRanking from "@/serveractions/fetchranking";

const Usage = () => {
	const [working, setWorking] = useState(true);
	const [data, setData] = useState([]);
	const [data2, setData2] = useState([
		["Fecha", "Conexioness"],
		[new Date(2025, 0, 1), 10],
	]);
	const [data3, setData3] = useState([]);

	useEffect(() => {
		const loadFb = async () => {
			const usage = await fetchUsage();
			const ranking = await fetchRanking();

			const groupByAthleteid = usage
				.reduce((acc, [athleteid, date]) => {
					let group = acc.find((item) => item[0] === athleteid);
					if (!group) {
						group = [athleteid, []];
						acc.push(group);
					}
					group[1].push(date);
					return acc;
				}, [])
				.sort(([, a], [, b]) => b.length - a.length);

			const usage2 = usage.map((a) => {
				return [a[0], new Date(a[1].getFullYear(), a[1].getMonth(), a[1].getDate())];
			});

			const groupByDate = usage2
				.reduce((acc, [athleteid, date]) => {
					let group = acc.find((item) => item[1].getTime() === date.getTime());
					if (!group) {
						group = [[], date];
						acc.push(group);
					}
					group[0].push(athleteid);
					return acc;
				}, [])
				.map((a) => [a[1], a[0].length])
				.sort(([d1], [d2]) => d1 - d2);

			groupByDate.splice(0, 0, ["Fecha", "Conexiones"]);

			var dataArray = [[{ type: "number" }]];
			groupByAthleteid.forEach((row) => {
				let ath = ranking.find((o) => o.athleteid === row[0]);
				if (ath === undefined) {
					dataArray[0].push({ type: "datetime", label: row[0].toString() });
				} else {
					dataArray[0].push({ type: "datetime", label: (ath.firstname + " " + ath.lastname).substring(0, 20) });
				}
			});

			groupByAthleteid.forEach((row, indexRow) => {
				row[1].forEach((date) => {
					const linea = Array(dataArray[0].length);
					linea[0] = indexRow;
					linea[indexRow + 1] = date;
					dataArray.push(linea);
				});
			});

			const usage3 = [];
			usage.forEach((row) => {
				const d1 = new Date(row[1].getFullYear(), row[1].getMonth(), row[1].getDate());
				const d2 = new Date(row[1].getFullYear(), row[1].getMonth(), row[1].getDate());
				d2.setDate(d2.getDate() + 1);
				let ath = ranking.find((o) => o.athleteid === row[0]);
				if (ath === undefined) {
					usage3.push([row[0].toString(), d1, d2]);
				} else {
					usage3.push([(ath.firstname + " " + ath.lastname).substring(0, 20), d1, d2]);
				}
			});

			const frecuencia = usage3.reduce((acc, [nombre]) => {
				acc[nombre] = (acc[nombre] || 0) + 1;
				return acc;
			}, {});

			const ordenado = usage3.sort((a, b) => {
				const freqA = frecuencia[a[0]];
				const freqB = frecuencia[b[0]];
				return freqB - freqA;
			});

			setData3(usage3);
			setData2(groupByDate);
			setData(dataArray);
			setWorking(false);
		};
		loadFb();
	}, []);

	if (working)
		return (
			<div className="flex h-screen items-center justify-center">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				>
					<span className="!absolute -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
						Loading...
					</span>
				</div>
			</div>
		);

	return (
		<main className="flex flex-col gap-16 p-4">
			<div className="bg-white" onDragOver={(e) => e.preventDefault()}>
				<Chart chartType="Timeline" data={data3} options={{ height: 400 }} />
			</div>

			<div className="bg-white" onDragOver={(e) => e.preventDefault()}>
				<Chart
					chartType="ScatterChart"
					data={data}
					options={{
						title: "Conexiones",
						orientation: "vertical",
						height: 720,
						hAxis: { format: "dd/MM", minorGridlines: { count: 1 } },
						vAxis: {
							textPosition: "none",
							direction: -1,
							minorGridlines: { count: 0 },
							gridlines: { count: 0 },
							baselineColor: "transparent",
						},
						chartArea: {
							left: 30,
							top: 30,
							right: 180,
							bottom: 30,
						},
						legend: { textStyle: { fontSize: 12 } },
						tooltip: { showColorCode: true },
					}}
				/>
			</div>

			<div className="bg-white" onDragOver={(e) => e.preventDefault()}>
				<Chart
					chartType="ColumnChart"
					data={data2}
					options={{
						hAxis: {
							format: "dd/MM",
							gridlines: {},
							minorGridlines: { count: 0 },
						},
						legend: { position: "none" },
					}}
				/>
			</div>

			<div className="bg-white" onDragOver={(e) => e.preventDefault()}>
				<Chart
					chartType="Calendar"
					data={data2}
					options={{
						calendar: {
							daysOfWeek: "DLMMJVS",
						},
						noDataPattern: {
							backgroundColor: "#FFFFFF",
							color: "#F7EAD8",
						},
					}}
				/>
			</div>
		</main>
	);
};

export default Usage;
