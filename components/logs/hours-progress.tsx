"use client";

import { Progress } from "@/components/ui/progress";

interface HoursProgressProps {
	completed: number;
	required: number;
	description?: string;
}

export function HoursProgress({
	completed,
	required,
	description = "Total hours completed vs required internship goal.",
}: HoursProgressProps) {
	const percentage =
		required > 0 ? Math.min(100, (completed / required) * 100) : 0;

	return (
		<div className="mb-16 space-y-4">
			<div className="flex items-baseline gap-3 text-3xl sm:text-5xl font-light text-muted-foreground">
				<span className="text-foreground font-medium">
					{completed.toFixed(2)}
				</span>
				<span>/</span>
				<span className="font-bold text-blue-700">{required}</span>
				<span className="text-2xl font-normal">Hours</span>
			</div>

			<Progress value={percentage} className="h-3" />

			<p className="text-sm sm:text-base text-muted-foreground">
				{description}
			</p>
		</div>
	);
}
