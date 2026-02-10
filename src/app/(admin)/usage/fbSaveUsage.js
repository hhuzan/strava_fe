"use server";

import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const fbSaveUsage = async (date, athleteid) => {
	console.log("fbSaveUsage START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	let fieldName;
	fieldName = Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		timeZone: "America/Argentina/Buenos_Aires",
	}).format(date);
	const [day, month, year] = fieldName.split("/");
	fieldName = year + month + day;

	const usage = {
		[fieldName]: date,
	};
	await setDoc(doc(firestore, "usage" + anio, athleteid.toString()), usage, { merge: true });

	console.log("fbSaveUsage END: " + (Date.now() - inicio) + "ms");
};

export default fbSaveUsage;
