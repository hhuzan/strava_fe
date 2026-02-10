const formatTimestamp = (timestamp) => {
	const date = new Date(timestamp * 1000 - 10800000 + new Date().getTimezoneOffset() * 60000);
	const dias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
	const mes = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
	const hours = ("0" + date.getHours()).slice(-2);
	const mins = ("0" + date.getMinutes()).slice(-2);
	return dias[date.getDay()] + " " + date.getDate() + " " + mes[date.getMonth()] + " - " + hours + ":" + mins;
};

export default formatTimestamp;
