"use server";

import dbReadNovedades from "./dbReadNovedades";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

const redoNovedades = async () => {
	console.log("redoNovedades START");
	const inicio = Date.now();

	const anio = process.env.NEXT_PUBLIC_ANIO;
	const novedades = await dbReadNovedades();
	const oNovedades = { novedades: novedades };
	await setDoc(doc(firestore, "brzn" + anio, "novedades"), oNovedades);

	console.log("redoNovedades END: " + (Date.now() - inicio) + "ms");
};

export default redoNovedades;
