import { supabase } from "@/lib/supabase";

export const updateGoalStatus = async (
	goalId: number,
	status: "Active" | "Completed" | "Archived",
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!goalId) throw new Error("Goal ID is required");
		if (!status) throw new Error("Status is required");

		const { error } = await supabase
			.from("goals")
			.update({ status })
			.eq("id", goalId);

		if (error) throw error;

		showAlert(200, `Goal marked as ${status}`);
	} catch (error: any) {
		console.error("Update goal status error:", error);
		showAlert(500, error.message || "Failed to update goal status");
	} finally {
		setIsLoading(false);
	}
};
