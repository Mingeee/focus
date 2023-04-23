import { useAtom, useAtomValue } from "jotai";
import { Orbitron } from "next/font/google";

import { endCounterAtAtom, historyAtom, modeAtom, timerIdAtom } from "@/state";
import { useEffect, useState } from "react";

import { ThumbDownOffAlt, ThumbUpOffAlt } from "@mui/icons-material";

const orbitron = Orbitron({ subsets: ["latin"] });

const Timer = () => {
	const mode = useAtomValue(modeAtom);
	const endCounterAt = useAtomValue(endCounterAtAtom);
	const [timerId, setTimerId] = useAtom(timerIdAtom);
	const [history, setHistory] = useAtom(historyAtom);

	const [counter, setCounter] = useState(
		mode === "increment" ? 0 : endCounterAt
	);

	const hours = Math.floor(counter / 3600);
	const minutes = Math.floor(counter / 60) - hours * 60;
	const seconds = counter - minutes * 60 - hours * 3600;

	const endCounterAtHours = Math.floor(endCounterAt / 3600);
	const endCounterAtMinutes =
		Math.floor(endCounterAt / 60) - endCounterAtHours * 60;
	const endCounterAtSeconds =
		endCounterAt - endCounterAtMinutes * 60 - endCounterAtHours * 3600;

	const formatTime = (time: number) => {
		return time < 10 ? `0${time}` : time;
	};

	const shouldShowStartButton = () => {
		return (
			((counter !== endCounterAt && mode === "increment") ||
				(counter !== 0 && mode === "decrement")) &&
			timerId === null
		);
	};

	const shouldShowFeedbackButtons = () => {
		return (
			((counter === endCounterAt && mode === "increment") ||
				(counter === 0 && mode === "decrement")) &&
			timerId === null
		);
	};

	useEffect(() => {
		const clearTimerAt = (endTimer: number) => {
			if (!timerId) {
				return;
			}

			if (counter === endTimer) {
				clearInterval(timerId);
				setTimerId(null);
			}
		};

		switch (mode) {
			case "increment":
				clearTimerAt(endCounterAt);
				break;
			case "decrement":
				clearTimerAt(0);
				break;
			default:
				clearTimerAt(endCounterAt);
				break;
		}
	}, [counter, mode, endCounterAt, timerId, setTimerId]);

	useEffect(() => {
		setCounter(mode === "increment" ? 0 : endCounterAt);
	}, [mode, endCounterAt]);

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<div className="opacity-30">
				<div className={orbitron.className}>
					{mode === "increment" ? (
						<div className="justify-center items-center flex">
							Goal - {formatTime(endCounterAtHours)}:
							{formatTime(endCounterAtMinutes)}:
							{formatTime(endCounterAtSeconds)}
						</div>
					) : (
						<div className="justify-center items-center flex">
							Goal - 00:00:00
						</div>
					)}
				</div>
			</div>

			<div
				className={`flex items-center justify-center sm:text-5xl md:text-8xl ${orbitron.className}`}
			>
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0 pointer-events-none"
					readOnly
					value={formatTime(hours)}
				/>{" "}
				:
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0 pointer-events-none"
					readOnly
					value={formatTime(minutes)}
				/>{" "}
				:
				<input
					className="flex-1 sm:w-20 md:w-56 text-center bg-black text-white sm:text-5xl md:text-8xl border-0 pointer-events-none"
					readOnly
					value={formatTime(seconds)}
				/>
			</div>

			<div className="flex items-center justify-center sm:h-32 md:h-52">
				{shouldShowStartButton() && (
					<div
						className="cursor-pointer bg-stone-800 p-2 rounded-md w-24 flex items-center justify-center"
						onClick={() => {
							if (timerId) {
								clearInterval(timerId);
							}

							if (mode === "increment") {
								const id = setInterval(() => {
									setCounter((prev) => prev + 1);
								}, 1000);

								setTimerId(id);
							}

							if (mode === "decrement") {
								const id = setInterval(() => {
									setCounter((prev) => prev - 1);
								}, 1000);

								setTimerId(id);
							}
						}}
					>
						Start
					</div>
				)}

				{shouldShowFeedbackButtons() && (
					<div className="flex flex-row justify-center items-center">
						Rate your session:
						<div>
							<ThumbDownOffAlt
								className="cursor-pointer m-2"
								onClick={() => {
									switch (mode) {
										case "increment":
											setCounter(0);
											break;
										case "decrement":
											setCounter(endCounterAt);
											break;
										default:
											setCounter(0);
											break;
									}

									const newHistory = [
										{
											id: crypto.randomUUID(),
											date: `${Intl.DateTimeFormat(navigator.language, {
												weekday: "long",
												month: "short",
												day: "numeric",
											}).format(new Date())}`,
											duration: `${formatTime(endCounterAtHours)}:${formatTime(
												endCounterAtMinutes
											)}:${formatTime(endCounterAtSeconds)}`,
											focus: "bad",
										},
										...history,
									];

									setHistory(newHistory);
								}}
							/>
							<ThumbUpOffAlt
								className="cursor-pointer m-2"
								onClick={() => {
									switch (mode) {
										case "increment":
											setCounter(0);
											break;
										case "decrement":
											setCounter(endCounterAt);
											break;
										default:
											setCounter(0);
											break;
									}

									const newHistory = [
										{
											id: crypto.randomUUID(),
											date: `${Intl.DateTimeFormat(navigator.language, {
												weekday: "long",
												month: "short",
												day: "numeric",
											}).format(new Date())}`,
											duration: `${formatTime(endCounterAtHours)}:${formatTime(
												endCounterAtMinutes
											)}:${formatTime(endCounterAtSeconds)}`,
											focus: "good",
										},
										...history,
									];

									setHistory(newHistory);
								}}
							/>
						</div>
					</div>
				)}

				{timerId !== null && (
					<div
						className="cursor-pointer bg-stone-800 p-2 rounded-md w-24 flex items-center justify-center"
						onClick={() => {
							if (timerId) {
								clearInterval(timerId);
							}

							setTimerId(null);
						}}
					>
						Pause
					</div>
				)}
			</div>
		</div>
	);
};

export default Timer;
