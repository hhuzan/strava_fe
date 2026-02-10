"use client";

import dbReadAthletes from "@/serveractions/admin/dbReadAthletes";
import Athlete from "@/components/admin/Athlete";
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "@/components/admin/Login";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

const Admin = () => {
	const [athletes, setAthletes] = useState([]);
	const [user, setUser] = useState(auth.currentUser);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			const data = await dbReadAthletes();
			setAthletes(data);
			setLoading(false);
		};
		load();
	}, []);

	onAuthStateChanged(auth, (firebaseUser) => {
		setUser(firebaseUser);
	});

	const handleLogout = () => {
		try {
			signOut(auth);
		} catch {
			(error) => {
				alert(error);
			};
		}
	};

	if (!user) return <Login />;

	if (loading)
		return (
			<div className="flex h-screen items-center justify-center">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]"
					role="status"
				>
					<span className="!absolute -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
						Loading...
					</span>
				</div>
			</div>
		);

	return (
		<div>
			<div className="flex justify-end p-2 md:p-4">
				<button
					className="bg-linear-to-b w-32 from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase rounded"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
			<div className="flex justify-center">
				<ol className="flex flex-col w-lg max-w-[96vw]">
					<li className="flex justify-between px-4 py-2 bg-black font-semibold text-lg text-white">
						<div className="flex gap-2">Ciclista</div>
						<p>Habilitado</p>
					</li>
					{athletes.map((athlete) => {
						return <Athlete key={athlete.athleteid} athlete={athlete} setLoading={setLoading} />;
					})}
				</ol>
			</div>
		</div>
	);
};

export default Admin;
