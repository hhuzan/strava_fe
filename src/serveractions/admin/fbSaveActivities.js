"use server";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import dbReadActivities from "./dbReadActivities";

const fbSaveActivities = async (athleteid) => {
	console.log("fbSaveActivities START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	const data = await dbReadActivities(athleteid);
	const activities = { activities: data };
	await setDoc(doc(firestore, "activities" + anio, athleteid.toString()), activities);

	console.log("fbSaveActivities END: " + (Date.now() - inicio) + "ms");
};

export default fbSaveActivities;
