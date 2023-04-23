import Head from "next/head";

import Timer from "@/components/timer";
import { useAtom, useAtomValue } from "jotai";
import { historyAtom, showSettingAtom, timerIdAtom } from "@/state";
import Setting from "@/components/setting";
import { SettingsRounded } from "@mui/icons-material";

export default function Home() {
	const [showSetting, setshowSetting] = useAtom(showSettingAtom);
	const timerId = useAtomValue(timerIdAtom);
	const [history, setHistory] = useAtom(historyAtom);

	return (
		<>
			<Head>
				<title>Focus | ASMR by mingeee</title>
				<meta name="description" content="Focus timer" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center p-24">
				{!showSetting && <Timer />}
				{showSetting && <Setting />}

				{!showSetting && !timerId && (
					<div onClick={() => setshowSetting(true)}>
						<div className="absolute top-5 right-5 opacity-50 hover:opacity-100 rounded-xl">
							<SettingsRounded className="cursor-pointer" />
						</div>
					</div>
				)}

				{history.length > 0 && (
					<div>
						<div className="absolute bottom-0 left-0 h-1/5 overflow-scroll overflow-x-hidden w-full">
							<div className="m-2 flex flex-row justify-between">
								<h2>Session History</h2>

								<div
									className="opacity-50 hover:opacity-100 cursor-pointer"
									onClick={() => setHistory([])}
								>
									Delete all
								</div>
							</div>
							{history.map((h) => (
								<div key={h.id}>
									<div>{h.date}</div>
									<div>Duration: {h.duration}</div>
									<div>Focus: {h.focus}</div>
								</div>
							))}
						</div>
					</div>
				)}
			</main>
		</>
	);
}
