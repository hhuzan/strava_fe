"use server";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fbSavePolyline = async (activity) => {
	console.log("fbSavePolyline START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	const polyline = {
		athleteid: activity.athlete.id,
		type: activity.type,
		name: activity.name,
		polyline: activity.map.summary_polyline,
	};
	await setDoc(doc(firestore, "polylines" + anio, activity.id.toString()), polyline);

	console.log("fbSavePolyline END: " + (Date.now() - inicio) + "ms");
};

export default fbSavePolyline;
