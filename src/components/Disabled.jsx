import Image from "next/image";

const Disabled = () => {
	return (
		<div className="flex flex-col gap-32 items-center py-16">
			<Image className="h-32 w-32 rounded-full" src="/logo192.png" alt="Logo BiRuedas ZN" width={512} height={512} />
			<h1 className="text-3xl font-bold">&#8987;Esperando&#8987;</h1>
			<h3 className="text-xl font-bold">Te tiene que habilitar un admin.</h3>
		</div>
	);
};

export default Disabled;
