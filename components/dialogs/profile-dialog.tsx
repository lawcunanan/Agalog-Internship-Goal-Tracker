"use client";

import type React from "react";
import { useState, useEffect, use } from "react";
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
import { updateProfile } from "@/services/users/update-profile";
import { UserDetails } from "@/providers/auth-provider";

export function ProfileDialog({
	children,
	userId,
	userDetails,
	showAlert,
}: {
	children: React.ReactNode;
	userId?: string;
	userDetails?: UserDetails | null;
	showAlert: (status: number, message: string) => void;
}) {
	const [full_name, setFullname] = useState<string>("");
	const [section, setSection] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSaveProfile = () => {
		if (!userId) {
			showAlert(500, "User ID is missing");
			return;
		}

		if (!full_name.trim() || !section.trim()) {
			showAlert(400, "Please fill in all fields");
			return;
		}

		// Handle save logic here
		updateProfile(userId, { full_name, section }, showAlert, setIsLoading);
	};

	useEffect(() => {
		if (userDetails?.full_name) {
			setFullname(userDetails.full_name);
		}
		if (userDetails?.section) {
			setSection(userDetails.section);
		}
	}, [userDetails]);

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className="sm:max-w-125">
				<AlertDialogHeader>
					<div className="flex items-center justify-between">
						<AlertDialogTitle>Edit Profile</AlertDialogTitle>
						<AlertDialogCancel className="border-none p-0">
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
							value={full_name}
							onChange={(e) => setFullname(e.target.value)}
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

					<Button
						onClick={handleSaveProfile}
						className="w-full"
						disabled={isLoading}
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
