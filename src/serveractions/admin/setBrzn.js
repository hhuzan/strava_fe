"use server";

import redoNovedades from "./redoNovedades";
import fbSaveActivities from "./fbSaveActivities";
import dbUpdateBrzn from "./dbUpdateBrzn";
import redoRanking from "./redoRanking";
import redoMonthlyRanking from "./redoMonthlyRanking";

const setBrzn = async (activity, brzn) => {
	await dbUpdateBrzn(activity.activityid, brzn);
	await Promise.all([redoRanking(), redoMonthlyRanking(), redoNovedades(), fbSaveActivities(activity.athleteid)]);
};

export default setBrzn;
