"use client";

import { useEffect, useState } from "react";
import fetchPolyline from "@/serveractions/fetchpolyline";
import Mapa from "./Mapa";

const DynMap = ({ activityid }) => {
	const [encodedString, setSEncodedSring] = useState();

	useEffect(() => {
		const fetch = async () => {
			const string = await fetchPolyline(activityid);
			setSEncodedSring(string);
		};
		fetch();
	}, []);

	if (encodedString) {
		return <Mapa encodedString={encodedString} />;
	}
};

export default DynMap;
