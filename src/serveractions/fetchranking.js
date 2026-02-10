"use server";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchRanking = async (athleteid) => {
	if (athleteid != undefined) {
		console.log("fetchRanking:", athleteid);
	}
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const docRef = doc(firestore, "brzn" + anio, "ranking");
	const docSnap = await getDoc(docRef);
	return await docSnap.data().ranking;
};

export default fetchRanking;
