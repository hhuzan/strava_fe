export const dynamic = "force-dynamic";
export const revalidate = 0;

const Rules = async () => {
	return (
		<div className="flex flex-col gap-1 list-disc text-slate-900 dark:text-slate-100 text-justify">
			<div className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg divide-y-2 divide-y-8 divide-transparent">
				<h2 className="font-semibold">OBJETIVO</h2>
				<p>
					El “Desafío BiRuedas” tiene como objetivo motivarnos en el uso de la bici y, justo es decirlo, cargarnos un poco
					entre nosotros, manteniendo siempre los límites de urbanidad y buenas costumbres.
				</p>
			</div>
			<div className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg divide-y-8 divide-transparent">
				<h2 className="font-semibold">CONTENIDO</h2>
				<p>
					Los kilómetros que se suman serán todos los que se carguen a la aplicación “Strava” en las distintas actividades
					de “Deportes de Ciclismo” (excepto bicicletas eléctricas y velo-móviles), sean en salidas con el grupo BR, con
					otros grupos o pedaleadas individuales.
				</p>
				<p>
					En caso de que por algún error involuntario se carguen salidas o kms “improcedentes” es esperable que el atleta
					subsane el error, sea anulando la salida o recortándola.
				</p>
				<p> Ejemplos de errores “involuntarios”:</p>
				<ol className="list-[lower-alpha] pl-8 divide-y-4 divide-transparent">
					<li>nos subimos al tren y no cerramos la aplicación,</li>
					<li>un amigo nos agregó en un grupo de salida,</li>
					<li>registramos la salida en dos equipos (celular + ciclocomputador, etc)</li>
					<li>
						no “pauseamos” la aplicación cuando nos detuvimos en el medio de la pedaleada (muchas veces el GPS anda como
						loco buscando antenas y se suman kms sin que la bici se haya movido).
					</li>
				</ol>
				<p>
					Para recortar la pedaleada se debe entrar en la “actividad” e ir a los tres puntitos del margen superior
					derecho.
				</p>
				<p>
					Es dable entender que tampoco se deberían sumar los kms en los que nos hayan remolcado (casos de descomposturas
					de la bici, del ciclistas o de ambos).
				</p>
			</div>
			<div className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg divide-y-8 divide-transparent">
				<h2 className="font-semibold">PERMANENCIA EN EL DESAFÍO</h2>
				<p>
					Si bien el Desafío tiene una duración anual (año calendario) las posiciones se publicarán en el Facebook del
					grupo con una periodicidad cuatrimestral, siendo condición necesaria para permanecer en el Desafío haber salido
					con el grupo al menos dos veces en cada período.
				</p>
				<p>
					El ciclista que no haya salido 2 veces con BR en el primer cuatrimestre podrá permanecer en el Desafío a partir
					del primero de mayo pero se le descontarán los kms acumulados en el primer cuatrimestre que podrá recuperar sólo
					si en el segundo cuatrimestre realiza 4 salidas con BR.
				</p>
				<p>
					El ciclista que no haya salido 2 veces con BR en el segundo cuatrimestre (o 4 veces en los casos descriptos en
					el párrafo anterior) podrá permanecer en el Desafío a partir del primero de septiembre pero se le descontarán
					los kms acumulados hasta el momento salvo que en el tercer cuatrimestre realice 6 salidas con BR. En estos casos
					se acumularan los kms anuales totales al final del año.
				</p>
			</div>
			<div className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg divide-y-8 divide-transparent">
				<h2 className="font-semibold">CAUSALES DE EXCLUSIÓN</h2>
				<p>Son causales de exclusión al Desafío las siguientes circunstancias:</p>
				<ol className="list-[lower-alpha] pl-8 divide-y-4 divide-transparent">
					<li>
						haber sido excluido del Grupo BR por mal comportamiento conforme lo dispongan los administradores del mismo
					</li>
					<li>no haber salido con el grupo de acuerdo a la recurrencia definida más arriba</li>
					<li>cargar pedaleadas o kms improcedentes con una recurrencia que permita entender un proceder doloso.</li>
				</ol>
			</div>
			<div className="py-2 px-4 bg-slate-100 dark:bg-slate-900 rounded-lg divide-y-8 divide-transparent">
				<p className="font-semibold">¡A pedalear!</p>
			</div>
		</div>
	);
};

export default Rules;
