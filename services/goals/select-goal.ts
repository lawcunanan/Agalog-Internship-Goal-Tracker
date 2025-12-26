import { supabase } from "@/lib/supabase";

export const getUserGoals = async (
	userId: number,
	setGoals: (goals: any[]) => void,
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!userId) throw new Error("User ID is required");

		const { data, error } = await supabase
			.from("contributors")
			.select(
				`
                    id,
                    role,
                    status,
                    goals (
                    id,
                    title,
                    goal,
                    status,
                    created_at
                    )
                `,
			)
			.eq("user_id", userId)
			.eq("status", "Active")
			.neq("goals.status", "Inactive");

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
