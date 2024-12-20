import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const formatDateTime: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "2-digit",
	hour: "numeric",
	minute: "numeric",
};

export const formatDate: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "long",
	day: "2-digit",
};


export function ISODate(date: string) {
	return new Date(date) || new Date();
}

export function ISOString(date: Date) {
	return date?.toISOString().split("T")[0];
}


export function convertToDateTimeLocalFormat(
	inputDate: string | null | undefined
): string {
	if (inputDate) {
		const date = new Date(inputDate);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}
	return "";
}

export function gerarCodigoUnico(texto: string = ''): string {
	// Pega todas as letras do texto em maiúsculo
	const todasLetras = texto
		.toUpperCase()
		.replace(/[^A-Z]/g, ''); // Remove caracteres não alfabéticos

	// Seleciona 5 letras aleatórias do texto
	let letras = '';
	for (let i = 0; i < 7; i++) {
		if (todasLetras.length > 0) {
			const indiceAleatorio = Math.floor(Math.random() * todasLetras.length);
			letras += todasLetras[indiceAleatorio];
		} else {
			letras += 'X';
		}
	}

	// Gera números baseados no timestamp atual
	const timestamp = Date.now().toString();
	const numeros = timestamp.slice(-4); // Pega os últimos 4 dígitos

	return `${letras}-${numeros}`;
}