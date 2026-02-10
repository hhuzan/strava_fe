"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Strava from "./Strava";
import Menu from "./Menu";
import initAthlete from "@/utils/initAthlete";
import Disabled from "./Disabled";
import fetchRanking from "@/serveractions/fetchranking";
import fbSaveUsage from "@/app/(admin)/usage/fbSaveUsage";

const AuthWrapper = ({ children }) => {
	const [estado, setEstado] = useState("loading");
	const searchParams = useSearchParams();
	const spAthleteid = searchParams.get("athleteid");
	const router = useRouter();

	useEffect(() => {
		const callInitAthlete = async (athleteid) => {
			await initAthlete(athleteid);
			router.replace(`/`);
		};

		const callGetRanking = async (athleteid) => {
			const ranking = await fetchRanking(athleteid);
			if (ranking.some((athlete) => athlete.athleteid == athleteid)) {
				let valid = new Date();
				valid.setHours(0, 0, 0, 0);
				localStorage.setItem("valid", valid);
				setEstado("enabled");
			} else {
				setEstado("disabled");
			}
			await fbSaveUsage(new Date(), athleteid);
		};

		const callGetRankingXXXX = async (athleteid) => {
			const ranking = await fetchRanking(athleteid);
			if (ranking.some((athlete) => athlete.athleteid == athleteid)) {
				setEstado("enabled");
			} else {
				setEstado("disabled");
			}
			await fbSaveUsage(new Date(), athleteid);
		};

		const isLocalStorageAvailable = () => {
			var test = "test";
			try {
				localStorage.setItem(test, test);
				if (localStorage.getItem(test) === test) {
					localStorage.removeItem(test);
					return true;
				}
				return false;
			} catch (e) {
				return false;
			}
		};

		if (!isLocalStorageAvailable()) {
			if (spAthleteid) {
				callGetRankingXXXX(Number(spAthleteid));
			} else {
				setEstado("strava");
			}
		} else {
			const athleteid = localStorage.getItem("athleteid");
			const prueba = localStorage.getItem("prueba");
			if (prueba == "enabled") {
				// localStorage.clear();
				setEstado("enabled");
			} else {
				if (spAthleteid && !athleteid) {
					localStorage.setItem("athleteid", spAthleteid);
					callInitAthlete(spAthleteid);
				} else {
					if (athleteid) {
						const valid = new Date(localStorage.getItem("valid"));
						const fecha = new Date();
						fecha.setHours(0, 0, 0, 0);
						if (!valid || valid < fecha) {
							callGetRanking(Number(athleteid));
						} else {
							setEstado("enabled");
						}
					} else {
						setEstado("strava");
					}
				}
			}
		}
	}, []);

	if (estado === "strava") return <Strava />;
	if (estado === "loading")
		return (
			<main className="flex justify-center py-1">
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
			</main>
		);

	if (estado === "disabled") return <Disabled />;
	return (
		<>
			<Menu />
			{children}
		</>
	);
};

export default AuthWrapper;
