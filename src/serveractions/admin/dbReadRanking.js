"use server";

import { sql } from "@vercel/postgres";

const dbReadRanking = async () => {
	console.log("dbReadRanking START");
	const inicio = Date.now();

	const { rows } = await sql`
		WITH filtered_activities AS (
			SELECT
				athleteid,
				distance,
				date,
				brzn
			FROM activities
			WHERE sporttype IN ('Ride', 'GravelRide', 'MountainBikeRide')
			  AND manual = FALSE
			  AND deleted = FALSE
		),
		activity_counts AS (
			SELECT
				athleteid,
				COUNT(*) FILTER (
					WHERE brzn = TRUE AND date >= DATE '2025-01-01' AND date < DATE '2025-05-01'
				) AS q1,
				COUNT(*) FILTER (
					WHERE brzn = TRUE AND date >= DATE '2025-05-01' AND date < DATE '2025-09-01'
				) AS q2,
				COUNT(*) FILTER (
					WHERE brzn = TRUE AND date >= DATE '2025-09-01' AND date < DATE '2026-01-01'
				) AS q3,
				COALESCE(SUM(distance) FILTER (WHERE date < DATE '2026-09-01'), 0)::integer AS early_distance,
				COALESCE(SUM(distance) FILTER (WHERE date >= DATE '2026-09-01'), 0)::integer AS late_distance
			FROM filtered_activities
			GROUP BY athleteid
		),
		final_result AS (
			SELECT
				a.athleteid,
				a.firstname,
				a.lastname,
				a.profile,
				COALESCE(
					CASE
						WHEN ( COALESCE(ac.q1, 0) >= 2 AND COALESCE(ac.q2, 0) >= 2 AND COALESCE(ac.q3, 0) >= 2 )
							OR ( COALESCE(ac.q2, 0) >= 4 AND COALESCE(ac.q3, 0) >= 2 )
							OR COALESCE(ac.q3, 0) >= 6
						THEN ac.early_distance + ac.late_distance
						ELSE ac.late_distance
					END, 0
				) AS distance,
				COALESCE(ac.q1, 0) AS q1,
				COALESCE(ac.q2, 0) AS q2,
				COALESCE(ac.q3, 0) AS q3
			FROM athletes a
			LEFT JOIN activity_counts ac ON a.athleteid = ac.athleteid
			WHERE a.enabled IS TRUE
		)
		SELECT *
		FROM final_result
		ORDER BY
			(distance > 0) DESC,
			distance DESC,
			firstname,
			lastname;
		`;

	console.log("dbReadRanking END: " + (Date.now() - inicio) + "ms");
	return rows;
};

export default dbReadRanking;
