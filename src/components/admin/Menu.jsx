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
					<Link href="/admin" className={pathname === "/admin" ? selected : unselected}>
						Admin
					</Link>
				</li>
				<li className="me-2">
					<Link href="/salidas" className={pathname === "/salidas" ? selected : unselected}>
						Salidas
					</Link>
				</li>
				<li className="me-2">
					<Link href="/dups" className={pathname === "/dups" ? selected : unselected}>
						Dups
					</Link>
				</li>
				<li className="me-2">
					<Link href="/usage" className={pathname === "/usage" ? selected : unselected}>
						Uso
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Menu;
