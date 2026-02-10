"use server";

import { sql } from "@vercel/postgres";

const decode = (encodedString) => {
	var index = 0,
		lat = 0,
		lng = 0,
		shift = 0,
		result = 0,
		byte = null,
		latitude_change,
		longitude_change;
	var dec = {
		minlat: 10000000,
		maxlat: -10000000,
		minlng: 20000000,
		maxlng: -20000000,
	};

	while (index < encodedString.length) {
		byte = null;
		shift = 1;
		result = 0;

		do {
			byte = encodedString.charCodeAt(index++) - 63;
			result += (byte & 0x1f) * shift;
			shift *= 32;
		} while (byte >= 0x20);

		latitude_change = result & 1 ? (-result - 1) / 2 : result / 2;
		shift = 1;
		result = 0;

		do {
			byte = encodedString.charCodeAt(index++) - 63;
			result += (byte & 0x1f) * shift;
			shift *= 32;
		} while (byte >= 0x20);

		longitude_change = result & 1 ? (-result - 1) / 2 : result / 2;
		lat += latitude_change;
		lng += longitude_change;

		if (lat < dec.minlat) {
			dec.minlat = lat;
		}
		if (lat > dec.maxlat) {
			dec.maxlat = lat;
		}
		if (lng < dec.minlng) {
			dec.minlng = lng;
		}
		if (lng > dec.maxlng) {
			dec.maxlng = lng;
		}
	}
	if (dec.minlat === 10000000 || dec.maxlat === -10000000 || dec.minlng === 20000000 || dec.maxlng === -20000000) {
		dec = {
			minlat: 0,
			maxlat: 0,
			minlng: 0,
			maxlng: 0,
		};
	}
	return dec;
};

const dbSaveActivity = async (act) => {
	console.log("dbSaveActivity START");
	const inicio = Date.now();

	console.log(act.athlete.id, act.name, act.start_date_local, act.distance);

	const dec = decode(act.map.summary_polyline);

	await sql`INSERT INTO activities (activityid, athleteid, distance, mtime, etime, sporttype,
        name, date, manual, flagged, minlat, maxlat, minlng, maxlng, deleted)  
        VALUES (${act.id},
            ${act.athlete.id},
            ${act.distance},
            ${act.moving_time},
            ${act.elapsed_time},
            ${act.sport_type},
            ${act.name},
            ${act.start_date},
            ${act.manual},
            ${act.flagged},
            ${dec.minlat},
            ${dec.maxlat},
            ${dec.minlng},
            ${dec.maxlng},
			FALSE)
     ON CONFLICT (activityid) DO UPDATE 
        SET distance = ${act.distance},
            mtime = ${act.moving_time},
            etime = ${act.elapsed_time},
            sporttype = ${act.sport_type},
            name = ${act.name},
            date = ${act.start_date},
            manual = ${act.manual},
            flagged = ${act.flagged},
            minlat = ${dec.minlat},
            maxlat = ${dec.maxlat},
            minlng = ${dec.minlng},
            maxlng = ${dec.maxlng},
			deleted = FALSE`;

	console.log("dbSaveActivity END: " + (Date.now() - inicio) + "ms");
};

export default dbSaveActivity;
