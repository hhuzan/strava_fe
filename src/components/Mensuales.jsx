"use client";

const Zzzz = ({ tops, athleteid, mes, str }) => {
	const finded = tops.find((t) => t.athleteid === athleteid && t.mes === mes);
	if (finded) return <p className="underline font-semibold text-red-800 dark:text-yellow-500">{str}</p>;
	return <p>{str}</p>;
};

const Mensuales = ({ tops, athleteid }) => {
	return (
		<div className="flex text-xs text-slate-300 dark:text-slate-700">
			<div>
				<Zzzz tops={tops} athleteid={athleteid} mes={1} str={"Ene"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={4} str={"Abr"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={7} str={"Jul"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={10} str={"Oct"} />
			</div>
			<div>
				<Zzzz tops={tops} athleteid={athleteid} mes={2} str={"Feb"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={5} str={"May"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={8} str={"Ago"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={11} str={"Nov"} />
			</div>
			<div>
				<Zzzz tops={tops} athleteid={athleteid} mes={3} str={"Mar"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={6} str={"Jun"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={9} str={"Sep"} />
				<Zzzz tops={tops} athleteid={athleteid} mes={12} str={"Dic"} />
			</div>
		</div>
	);
};

export default Mensuales;
