"use server";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";

const fetchUsage = async () => {
	const anio = process.env.NEXT_PUBLIC_ANIO;
	const usageRef = collection(firestore, "usage" + anio);
	const snapshot = await getDocs(usageRef);

	const res = [];
	snapshot.forEach((doc) => {
		const data = doc.data();
		Object.entries(data).forEach(([date, timestamp]) => {
			res.push([Number(doc.id), timestamp.toDate()]);
		});
	});
	return res;
};

export default fetchUsage;
