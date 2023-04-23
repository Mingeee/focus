import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const endCounterAtAtom = atomWithStorage<number>("endCounterAt", 10);
export const modeAtom = atomWithStorage<"increment" | "decrement">(
	"mode",
	"increment"
);
export const historyAtom = atomWithStorage<
	{
		id: string;
		date: string;
		duration: string;
		focus: string;
	}[]
>("history", []);

export const counterAtom = atom<number>(0);
export const timerIdAtom = atom<NodeJS.Timer | null>(null);
export const showSettingAtom = atom<boolean>(false);
