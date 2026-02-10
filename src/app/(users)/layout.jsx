import "../globals.css";
import "leaflet/dist/leaflet.css";
import AuthWrapper from "@/components/AuthWrapper";
import { ThemeProvider } from "next-themes";

const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata = {
	title: "BiRuedas ZN",
	description: "Ranking BiRuedas ZN",
	charset: "UTF-8",
	manifest: "/manifest.json",
	metadataBase: new URL(appUrl),
};

export default function RootLayout({ children }) {
	const titulo = "BiRuedas ZN 20" + process.env.NEXT_PUBLIC_ANIO;
	return (
		<html lang="es" suppressHydrationWarning>
			<body className="flex justify-center bg-primary">
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="flex flex-col w-lg max-w-[96vw] gap-2">
						<main>
							<div className="flex justify-around items-center bg-slate-900 dark:bg-slate-600 mt-1 mb-2">
								<h1 className="text-3xl text-slate-300 font-bold">{titulo}</h1>
								<img width={100} height={43} src="logo_strava.png" alt="Strava" />
							</div>
							<AuthWrapper>{children}</AuthWrapper>
						</main>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
