import { supabase } from "@/lib/supabase";

export const updateGoalDetails = async (
	goalId: string,
	values: {
		title?: string;
		goal?: number;
	},
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!goalId) throw new Error("Goal ID is required");

		const { error } = await supabase
			.from("goals")
			.update({
				title: values.title,
				goal: values.goal || 400,
			})
			.eq("goal_id", goalId);

		if (error) throw error;

		showAlert(200, "Goal updated successfully");
	} catch (error: any) {
		console.error("Update goal details error:", error);
		showAlert(500, error.message || "Failed to update goal");
	} finally {
		setIsLoading(false);
	}
};
