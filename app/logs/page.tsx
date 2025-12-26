"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function LogsPage() {
	const [selectedGoal, setSelectedGoal] = useState<string>("");
	return (
		<main className="min-h-screen flex flex-col">
			<Header selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} />
			<div className="flex-1 p-4 pt-24 flex flex-col items-center">
				<div className="max-w-300 w-full">
					<h1 className="text-2xl font-bold mb-4">Logs: {selectedGoal}</h1>
					<p>Welcome to your logs page. </p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
