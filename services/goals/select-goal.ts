import { supabase } from "@/lib/supabase";

export const getUserGoals = async (
	userId: string,
	role: string,
	setGoals: (goals: any[]) => void,
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!userId) throw new Error("User ID is required");

		const isAdmin = ["Super Admin", "Admin"].includes(role);

		const { data, error } = await supabase
			.from("contributors")
			.select(
				`
				contributor_id,
				role,
				status,
				goals!inner (
					goal_id,
					title,
					goal,
					status,
					created_by,
					created_at
					${isAdmin ? ", pubToken, priToken" : ""}
				)
				`,
			)
			.eq("user_id", userId)
			.eq("status", "Active")
			.eq("goals.status", "Active")
			.order("created_at", { ascending: false });

		if (error) throw error;

		const goals = (data || []).map((row: any) => row.goals).filter(Boolean);

		setGoals(goals);
	} catch (error: any) {
		console.error("Get user goals error:", error);
		showAlert(500, error.message || "Failed to fetch goals");
	} finally {
		setIsLoading(false);
	}
};
