import { endCounterAtAtom, modeAtom, showSettingAtom } from "@/state";
import { useAtom, useSetAtom } from "jotai";
import { Orbitron } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const orbitron = Orbitron({ subsets: ["latin"] });

const Setting = () => {
	const [mode, setMode] = useAtom(modeAtom);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [modeTemp, setModeTemp] = useState<"increment" | "decrement">(mode);
	const setShowSetting = useSetAtom(showSettingAtom);
	const [endCounterAt, setEndCounterAt] = useAtom(endCounterAtAtom);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const hours = Math.floor(endCounterAt / 3600);
		const minutes = Math.floor(endCounterAt / 60) - hours * 60;
		const seconds = endCounterAt - minutes * 60 - hours * 3600;

		setHours(hours);
		setMinutes(minutes);
		setSeconds(seconds);

		inputRef.current?.focus();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="absolute w-screen h-screen bg-black flex flex-col justify-center items-center top-0 left-0">
			<div
				className={`flex flex-row justify-center items-center ${orbitron.className}`}
			>
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0"
					value={hours < 10 ? `0${hours}` : hours}
					onChange={(e) => {
						if (isNaN(Number(e.target.value))) return;

						if (Number(e.target.value) > 23) {
							setHours(23);
							return;
						}

						setHours(Number(e.target.value || 0));
					}}
					ref={inputRef}
				/>
				{" : "}
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0"
					value={minutes < 10 ? `0${minutes}` : minutes}
					onChange={(e) => {
						if (isNaN(Number(e.target.value))) return;

						if (Number(e.target.value) > 59) {
							setMinutes(59);
							return;
						}

						setMinutes(Number(e.target.value || 0));
					}}
				/>
				{" : "}
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0"
					value={seconds < 10 ? `0${seconds}` : seconds}
					onChange={(e) => {
						if (isNaN(Number(e.target.value))) return;

						if (Number(e.target.value) > 59) {
							setSeconds(59);
							return;
						}

						setSeconds(Number(e.target.value || 0));
					}}
				/>
			</div>

			<div className="flex flex-row justify-center items-center mt-10">
				<div className="font-bold">mode</div>
				<div className="flex flex-row justify-center items-center">
					<div
						className={`flex flex-row justify-center items-center h-10 rounded-md border-1 m-2 p-2 ${
							modeTemp === "increment"
								? "bg-white text-black"
								: "bg-black text-white"
						} cursor-pointer`}
						onClick={() => setModeTemp("increment")}
					>
						increment
					</div>

					<div
						className={`flex flex-row justify-center items-center h-10 rounded-md border-1 m-2 p-2 ${
							modeTemp === "decrement"
								? "bg-white text-black"
								: "bg-black text-white"
						} cursor-pointer`}
						onClick={() => setModeTemp("decrement")}
					>
						decrement
					</div>
				</div>
			</div>

			<div
				className="cursor-pointer bg-stone-800 p-2 rounded-md w-24 flex items-center justify-center mt-6"
				onClick={() => {
					setShowSetting(false);
					setMode(modeTemp);
					const h = hours * 3600;
					const m = minutes * 60;
					const s = seconds;

					setEndCounterAt(h + m + s);
				}}
			>
				Save
			</div>
		</div>
	);
};

export default Setting;
