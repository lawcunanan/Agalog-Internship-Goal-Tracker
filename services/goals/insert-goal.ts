import { supabase } from "@/lib/supabase";
import { generateToken } from "@/lib/utils/generateToken";

export const insertGoal = async (
	userId: number,
	values: { title?: string; goal?: number },
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);

	try {
		if (!userId) {
			throw new Error("User ID is required");
		}

		const pubToken = generateToken(6);
		const priToken = generateToken(6);

		const { data: goalData, error: goalError } = await supabase
			.from("goals")
			.insert([
				{
					...values,
					status: "Active",
					created_by: userId,
					pubToken,
					priToken,
				},
			])
			.select("id")
			.single();

		if (goalError || !goalData) {
			throw goalError;
		}

		const goalId = goalData.id;

		const { error: contributorError } = await supabase
			.from("contributors")
			.insert([
				{
					goal_id: goalId,
					user_id: userId,
					status: "Active",
					role: "Owner",
				},
			]);

		if (contributorError) {
			throw contributorError;
		}

		showAlert(200, "Goal inserted successfully");
	} catch (error: any) {
		console.error("Error inserting goal:", error);
		showAlert(500, error.message || "Error inserting goal");
	} finally {
		setIsLoading(false);
	}
};
