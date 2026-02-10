"use client";

import { useState } from "react";
import setBrzn from "@/serveractions/admin/setBrzn";

const Brzn = ({ relative, activityid, setActivityBrzn }) => {
	const [isChecked, setIsChecked] = useState(relative.brzn);

	const checkHandler = async () => {
		const estado = isChecked;
		await setBrzn(relative, !estado);
		if (relative.activityid === activityid) {
			setActivityBrzn(!estado);
		}
		relative.brzn = !estado; //TODO Que hace?
		setIsChecked(!estado);
	};

	return <input type="checkbox" checked={isChecked} onChange={checkHandler} />;
};

export default Brzn;
