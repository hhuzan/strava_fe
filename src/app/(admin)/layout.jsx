import "../globals.css";
import "leaflet/dist/leaflet.css";

export const metadata = {
	title: "BiRuedas ZN",
	description: "Ranking BiRuedas ZN",
	charset: "UTF-8",
	manifest: "/manifest.json",
	metadataBase: new URL("https://brzn25.vercel.app/"),
};

const RootLayout = ({ children }) => {
	return (
		<html lang="es">
			<body className="bg-bg">{children}</body>
		</html>
	);
};

export default RootLayout;
