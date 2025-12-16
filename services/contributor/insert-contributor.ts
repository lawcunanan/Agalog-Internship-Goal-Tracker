import { supabase } from "@/lib/supabase";

export const insertContributor = async (
	userId: number,
	role: "Student" | "Admin" | "Owner",
	token: string,
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!userId) throw new Error("User ID is required");
		if (!token) throw new Error("Token is required");

		const tokenColumn = role === "Student" ? "pubToken" : "priToken";

		const { data: goalData, error: goalError } = await supabase
			.from("goals")
			.select("id")
			.eq(tokenColumn, token)
			.eq("status", "Active")
			.single();

		if (goalError || !goalData) {
			throw new Error("Invalid or inactive token");
		}

		const goalId = goalData.id;

		const { error: contributorError } = await supabase
			.from("contributors")
			.insert([
				{
					goal_id: goalId,
					user_id: userId,
					status: "Active",
					role,
				},
			]);

		if (contributorError) {
			throw contributorError;
		}

		showAlert(200, "Successfully joined the goal");
	} catch (error: any) {
		console.error("Insert contributor error:", error);
		showAlert(500, error.message || "Failed to join goal");
	} finally {
		setIsLoading(false);
	}
};
