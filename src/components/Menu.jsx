"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
	const pathname = usePathname();
	const selected =
		"inline-block p-2 border-b-2 rounded-t-lg text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500";
	const unselected =
		"inline-block p-2 border-b-2 rounded-t-lg border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
	return (
		<nav className="bg-slate-200 dark:bg-slate-800 text-lg font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
			<ul className="flex flex-wrap -mb-px">
				<li className="me-2">
					<Link href="/" className={pathname === "/" ? selected : unselected}>
						Ranking
					</Link>
				</li>
				<li className="me-2">
					<Link href="/month" className={pathname === "/month" ? selected : unselected}>
						Mes
					</Link>
				</li>
				<li className="me-2">
					<Link href="/news" className={pathname === "/news" ? selected : unselected}>
						News
					</Link>
				</li>
				<li className="me-2">
					<Link href="/rules" className={pathname === "/rules" ? selected : unselected}>
						Reglas
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
