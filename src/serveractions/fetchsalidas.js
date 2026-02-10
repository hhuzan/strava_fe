"use server";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchSalidas = async (athleteid) => {
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const docRef = doc(firestore, "activities" + anio, athleteid.toString());
	const docSnap = await getDoc(docRef);
	const salidas = await docSnap.data().activities;
	salidas.forEach((salida) => {
		salida.date = salida.date.seconds;
	});
	return salidas;
};

export default fetchSalidas;
