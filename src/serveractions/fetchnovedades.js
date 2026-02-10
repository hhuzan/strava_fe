"use server";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchNovedades = async () => {
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const docRef = doc(firestore, "brzn" + anio, "novedades");
	const docSnap = await getDoc(docRef);
	return await docSnap.data().novedades;
};

export default fetchNovedades;
