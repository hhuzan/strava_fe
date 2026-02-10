"use server";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import dbReadRanking from "./dbReadRanking";

const redoRanking = async () => {
	console.log("redoRanking START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	const ranking = await dbReadRanking();
	const oRanking = { ranking: ranking };
	await setDoc(doc(firestore, "brzn" + anio, "ranking"), oRanking);

	console.log("redoRanking END: " + (Date.now() - inicio) + "ms");
};

export default redoRanking;
