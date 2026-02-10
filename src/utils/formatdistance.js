const formatdistance = (distance, dec) => {
	if (distance == 0) return "---";
	const numberFormatter = Intl.NumberFormat("es-AR");
	return numberFormatter.format(Math.round((distance / 1000) * Math.pow(10, dec)) / Math.pow(10, dec)) + " Km";
};

export default formatdistance;
