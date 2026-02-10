const formatDate = (date) => {
	const temp = new Date(date.getTime());
	// temp.setHours(temp.getHours() - 3 + new Date().getTimezoneOffset() / 60);
	const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
	const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
	const hour = ("0" + temp.getHours()).slice(-2);
	const min = ("0" + temp.getMinutes()).slice(-2);
	return days[temp.getDay()] + " " + temp.getDate() + " " + months[temp.getMonth()] + " - " + hour + ":" + min;
};

export default formatDate;
