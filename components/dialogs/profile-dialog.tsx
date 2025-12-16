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
import { X } from "lucide-react";

export function ProfileDialog({ children }: { children: React.ReactNode }) {
	const [name, setName] = useState("Juan Dela Cruz");
	const [section, setSection] = useState("BSIT 3-A");

	const handleSaveProfile = () => {
		if (!name.trim() || !section.trim()) {
			alert("Please fill in all fields");
			return;
		}

		// Handle save logic here
		alert(`Profile updated!\nName: ${name}\nSection: ${section}`);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-125">
				<AlertDialogHeader>
					<div className="flex items-center justify-between">
						<AlertDialogTitle>Edit Profile</AlertDialogTitle>
						<AlertDialogCancel className="border-none shadow-none p-0 h-auto bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent">
							<X className="h-4 w-4" />
						</AlertDialogCancel>
					</div>
					<AlertDialogDescription>
						Update your name and section information.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="space-y-4">
					<div>
						<Label htmlFor="name" className="text-sm">
							Name
						</Label>
						<Input
							id="name"
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1.5"
						/>
					</div>

					<div>
						<Label htmlFor="section" className="text-sm">
							Section
						</Label>
						<Input
							id="section"
							type="text"
							placeholder="Enter your section"
							value={section}
							onChange={(e) => setSection(e.target.value)}
							className="mt-1.5"
						/>
					</div>

					<Button onClick={handleSaveProfile} className="w-full">
						Save Changes
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
