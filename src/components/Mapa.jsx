"use client";
import { MapContainer, TileLayer, useMap, Polyline } from "react-leaflet";

const decode = (encodedString) => {
	var index = 0,
		lat = 0,
		lng = 0,
		shift = 0,
		result = 0,
		byte = null,
		latitude_change,
		longitude_change,
		factor = Math.pow(10, 5);
	var dec = {
		path: [],
		minlat: 10000000,
		maxlat: -10000000,
		minlng: 20000000,
		maxlng: -20000000,
	};

	while (index < encodedString.length) {
		byte = null;
		shift = 1;
		result = 0;

		do {
			byte = encodedString.charCodeAt(index++) - 63;
			result += (byte & 0x1f) * shift;
			shift *= 32;
		} while (byte >= 0x20);

		latitude_change = result & 1 ? (-result - 1) / 2 : result / 2;
		shift = 1;
		result = 0;

		do {
			byte = encodedString.charCodeAt(index++) - 63;
			result += (byte & 0x1f) * shift;
			shift *= 32;
		} while (byte >= 0x20);

		longitude_change = result & 1 ? (-result - 1) / 2 : result / 2;
		lat += latitude_change;
		lng += longitude_change;
		dec.path.push([lat / factor, lng / factor]);

		if (lat < dec.minlat) {
			dec.minlat = lat;
		}
		if (lat > dec.maxlat) {
			dec.maxlat = lat;
		}
		if (lng < dec.minlng) {
			dec.minlng = lng;
		}
		if (lng > dec.maxlng) {
			dec.maxlng = lng;
		}
	}
	dec.minlat /= factor;
	dec.maxlat /= factor;
	dec.minlng /= factor;
	dec.maxlng /= factor;
	return dec;
};

const Mapa = ({ encodedString }) => {
	const dec = decode(encodedString);

	const ZoomSetter = () => {
		const zoom = useMap().getBoundsZoom([
			[dec.minlat, dec.minlng],
			[dec.maxlat, dec.maxlng],
		]);
		useMap().setZoom(zoom);
	};

	if (encodedString) {
		return (
			<MapContainer
				center={[(dec.maxlat + dec.minlat) / 2, (dec.maxlng + dec.minlng) / 2]}
				zoom={11}
				style={{ height: "240px", width: "100%" }}
				scrollWheelZoom={false}
				attributionControl={false}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<ZoomSetter />
				<Polyline
					pathOptions={{
						color: "red",
						opacity: 0.8,
						weight: 3,
					}}
					positions={dec.path}
				/>
			</MapContainer>
		);
	}
};

export default Mapa;
