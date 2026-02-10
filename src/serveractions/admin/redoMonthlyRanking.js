"use server";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import dbReadMonthlyRanking from "./dbReadMonthlyRanking";
import dbReadMonthlyTops from "./dbReadMonthlyTops";

const redoMonthlyRanking = async () => {
	console.log("redoMonthlyRanking START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	const ranking = await dbReadMonthlyRanking();
	const tops = await dbReadMonthlyTops();
	const monthly = { ranking: ranking, tops: tops };
	await setDoc(doc(firestore, "brzn" + anio, "monthly"), monthly);

	console.log("redoMonthlyRanking END: " + (Date.now() - inicio) + "ms");
};

export default redoMonthlyRanking;
