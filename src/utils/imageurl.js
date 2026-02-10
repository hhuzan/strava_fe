const imageURL = (profile) => {
	const res = profile.replace("height=256&width=256", "height=64&width=64");
	if (res.substring(0, 4) === "http") {
		return res;
	}
	if (res.substring(0, 1) != "/") {
		return "/" + res;
	}
};

export default imageURL;
