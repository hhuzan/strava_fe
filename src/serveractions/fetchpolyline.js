"use server";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchPolyline = async (activityid) => {
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const docRef = doc(firestore, "polylines" + anio, activityid.toString());
	const docSnap = await getDoc(docRef);
	const data = docSnap.data();
	if (data) {
		return await data.polyline;
	}
};

export default fetchPolyline;
