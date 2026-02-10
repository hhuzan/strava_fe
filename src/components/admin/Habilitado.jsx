"use client";

import { useState } from "react";
import { setEnabled } from "@/serveractions/admin/setEnabled";

const Habilitado = ({ athlete, setLoading }) => {
	const [isChecked, setIsChecked] = useState(athlete.enabled);

	const checkHandler = async () => {
		const estado = isChecked;
		setLoading(true);
		await setEnabled(athlete.athleteid, !estado);
		setLoading(false);
		athlete.enabled = !estado;
		setIsChecked(!estado);
	};

	return <input type="checkbox" checked={isChecked} onChange={checkHandler} />;
};

export default Habilitado;
