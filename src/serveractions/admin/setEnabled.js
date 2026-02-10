"use server";

import redoRanking from "./redoRanking";
import redoNovedades from "./redoNovedades";
import redoMonthlyRanking from "./redoMonthlyRanking";
import fbSaveActivities from "./fbSaveActivities";
import dbUpdateEnabled from "./dbUpdateEnabled";

export const setEnabled = async (athleteid, enabled) => {
	await dbUpdateEnabled(athleteid, enabled);
	await Promise.all([redoRanking(), redoMonthlyRanking(), redoNovedades(), fbSaveActivities(athleteid)]);
};
