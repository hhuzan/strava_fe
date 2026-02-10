"use server";

import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchMonthly = async () => {
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const docRef = doc(firestore, "brzn" + anio, "monthly");
	const docSnap = await getDoc(docRef);
	return docSnap.data();
};

export default fetchMonthly;
