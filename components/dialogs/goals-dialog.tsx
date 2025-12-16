"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Edit2, Copy, Trash2, X } from "lucide-react";

const MOCK_GOALS = [
	{
		id: 1,
		title: "Summer Internship 2024",
		hours: 400,
		privateToken: "priv_abc123xyz",
		publicToken: "pub_xyz789def",
		dateAdded: new Date("2024-01-15"),
	},
	{
		id: 2,
		title: "Fall Internship 2024",
		hours: 600,
		privateToken: "priv_def456uvw",
		publicToken: "pub_uvw321ghi",
		dateAdded: new Date("2024-06-20"),
	},
];

type Goal = {
	id: number;
	title: string;
	hours: number;
	privateToken: string;
	publicToken: string;
	dateAdded: Date;
};

export function GoalsDialog({ children }: { children: React.ReactNode }) {
	const [mode, setMode] = useState<"join" | "create">("join");
	const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
	const [selectedGoal, setSelectedGoal] = useState<string>(
		String(goals[0]?.id || ""),
	);

	// Join mode state
	const [joinToken, setJoinToken] = useState("");

	// Create mode state
	const [createTitle, setCreateTitle] = useState("");
	const [createGoal, setCreateGoal] = useState("");

	const [editingId, setEditingId] = useState<number | null>(null);

	const handleJoinGoal = () => {
		if (!joinToken.trim()) {
			alert("Please enter a token");
			return;
		}
		// Handle join logic here
		alert(`Joining goal with token: ${joinToken}`);
		setJoinToken("");
	};

	const handleCreateGoal = () => {
		if (!createTitle.trim() || !createGoal.trim()) {
			alert("Please fill in all fields");
			return;
		}

		const hours = Number(createGoal);
		if (isNaN(hours) || hours <= 0) {
			alert("Please enter a valid goal");
			return;
		}

		if (hours > 2000) {
			alert("Maximum goal is 2000 hours");
			return;
		}

		const newGoal: Goal = {
			id: Math.max(...goals.map((g) => g.id), 0) + 1,
			title: createTitle,
			hours,
			privateToken: `priv_${Math.random().toString(36).substring(2, 15)}`,
			publicToken: `pub_${Math.random().toString(36).substring(2, 15)}`,
			dateAdded: new Date(),
		};

		setGoals([...goals, newGoal]);
		setCreateTitle("");
		setCreateGoal("");
		alert("Goal created successfully!");
	};

	const handleEditGoal = (goal: Goal) => {
		setEditingId(goal.id);
		setCreateTitle(goal.title);
		setCreateGoal(String(goal.hours));
		setMode("create");
	};

	const handleSaveEdit = () => {
		if (!editingId) return;

		if (!createTitle.trim() || !createGoal.trim()) {
			alert("Please fill in all fields");
			return;
		}

		const hours = Number(createGoal);
		if (isNaN(hours) || hours <= 0) {
			alert("Please enter a valid goal");
			return;
		}

		if (hours > 2000) {
			alert("Maximum goal is 2000 hours");
			return;
		}

		setGoals(
			goals.map((goal) =>
				goal.id === editingId ? { ...goal, title: createTitle, hours } : goal,
			),
		);
		setEditingId(null);
		setCreateTitle("");
		setCreateGoal("");
		alert("Goal updated successfully!");
	};

	const handleDeleteGoal = (id: number, index: number) => {
		if (index === 0) {
			alert("The first registered goal cannot be deleted");
			return;
		}
		setGoals(goals.filter((goal) => goal.id !== id));
	};

	const copyToClipboard = (text: string, type: string) => {
		navigator.clipboard.writeText(text);
		alert(`${type} token copied to clipboard!`);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-[700px]">
				<AlertDialogHeader>
					<div className="flex items-center justify-between">
						<AlertDialogTitle>Manage Goals</AlertDialogTitle>
						<AlertDialogCancel className="border-none shadow-none p-0 h-auto bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent">
							<X className="h-4 w-4" />
						</AlertDialogCancel>
					</div>
					<AlertDialogDescription>
						Join an existing goal or create your own internship goal.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="space-y-6">
					{/* Mode Switcher */}
					<div className="flex gap-2 border-b">
						<Button
							variant={mode === "join" ? "default" : "ghost"}
							onClick={() => {
								setMode("join");
								setEditingId(null);
								setCreateTitle("");
								setCreateGoal("");
							}}
							className="rounded-b-none"
						>
							Join Goal
						</Button>
						<Button
							variant={mode === "create" ? "default" : "ghost"}
							onClick={() => {
								setMode("create");
								setJoinToken("");
							}}
							className="rounded-b-none"
						>
							Create Goal
						</Button>
					</div>

					{/* Join Mode */}
					{mode === "join" && (
						<div className="flex gap-2 items-end">
							<div className="flex-1">
								<Label htmlFor="join-token" className="text-sm">
									Token
								</Label>
								<Input
									id="join-token"
									type="text"
									placeholder="Enter goal token"
									value={joinToken}
									onChange={(e) => setJoinToken(e.target.value)}
									className="mt-1.5"
								/>
							</div>
							<Button onClick={handleJoinGoal} size="sm">
								Join
							</Button>
						</div>
					)}

					{/* Create Mode */}
					{mode === "create" && (
						<div className="space-y-4">
							<div className="flex gap-2 items-end">
								<div className="flex-1">
									<Label htmlFor="create-title" className="text-sm">
										Title
									</Label>
									<Input
										id="create-title"
										type="text"
										placeholder="Enter goal title"
										value={createTitle}
										onChange={(e) => setCreateTitle(e.target.value)}
										className="mt-1.5"
									/>
								</div>
								<div className="flex-1">
									<Label htmlFor="create-goal" className="text-sm">
										Goal (Hours)
									</Label>
									<Input
										id="create-goal"
										type="number"
										placeholder="Enter hours"
										value={createGoal}
										onChange={(e) => setCreateGoal(e.target.value)}
										max="2000"
										className="mt-1.5"
									/>
								</div>
								<Button
									onClick={editingId ? handleSaveEdit : handleCreateGoal}
									size="sm"
								>
									{editingId ? "Update" : "Create"}
								</Button>
							</div>
						</div>
					)}

					{/* Goals List */}
					<div className="space-y-3">
						<Label className="text-sm font-medium">Registered Goals</Label>
						<div className="border rounded-lg divide-y max-h-80 overflow-y-auto">
							{goals.length === 0 ? (
								<div className="p-4 text-center text-muted-foreground text-sm">
									No goals registered yet
								</div>
							) : (
								<RadioGroup
									value={selectedGoal}
									onValueChange={setSelectedGoal}
								>
									{goals.map((goal, index) => (
										<div
											key={goal.id}
											className="p-4 hover:bg-muted/50 transition-colors"
										>
											<div className="flex items-start gap-3">
												<RadioGroupItem
													value={String(goal.id)}
													id={`goal-${goal.id}`}
													className="h-4 w-4 mt-1"
												/>

												<div className="flex-1 min-w-0">
													<label
														htmlFor={`goal-${goal.id}`}
														className="cursor-pointer block"
													>
														<p className="text-sm font-medium">{goal.title}</p>
														<p className="text-xs text-muted-foreground">
															{goal.hours} hours • Added{" "}
															{goal.dateAdded.toLocaleDateString()}
														</p>
													</label>

													<div className="flex gap-2 mt-2 flex-wrap">
														<Button
															size="sm"
															variant="outline"
															className="h-7 text-xs bg-transparent"
															onClick={() =>
																copyToClipboard(goal.privateToken, "Private")
															}
														>
															<Copy className="h-3 w-3 mr-1" />
															Private
														</Button>
														<Button
															size="sm"
															variant="outline"
															className="h-7 text-xs bg-transparent"
															onClick={() =>
																copyToClipboard(goal.publicToken, "Public")
															}
														>
															<Copy className="h-3 w-3 mr-1" />
															Public
														</Button>
													</div>
												</div>

												<div className="flex gap-1">
													<Button
														size="sm"
														variant="ghost"
														className="h-8 w-8 p-0"
														onClick={() => handleEditGoal(goal)}
													>
														<Edit2 className="h-4 w-4" />
													</Button>
													<Button
														size="sm"
														variant="ghost"
														className="h-8 w-8 p-0 text-destructive hover:text-destructive"
														disabled={index === 0}
														onClick={() => handleDeleteGoal(goal.id, index)}
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</div>
										</div>
									))}
								</RadioGroup>
							)}
						</div>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
