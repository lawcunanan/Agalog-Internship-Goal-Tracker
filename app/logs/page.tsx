"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HoursProgress } from "@/components/logs/hours-progress";

export default function LogsPage() {
	const [selectedGoal, setSelectedGoal] = useState<string>("");

	return (
		<div className="min-h-screen flex flex-col relative md:overflow-hidden">
			<Header selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />
			<main className="flex-1 w-full max-w-300 mx-auto px-6 grid md:grid-cols-2 gap-20 h-screen ">
				<div className="flex flex-col pt-28 md:pt-42 w-full lg:max-w-md">a</div>
				<div className="md:overflow-y-auto no-scrollbar pt-0 md:pt-42 ">
					<HoursProgress completed={200.23} required={400} />
					<Footer />
				</div>
			</main>
		</div>
	);
}
