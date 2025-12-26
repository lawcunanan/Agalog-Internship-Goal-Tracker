import { supabase } from "@/lib/supabase";

export const updateProfile = async (
	userId: string,
	values: { full_name?: string; section?: string },
	showAlert: (status: number, message: string) => void,
	setIsLoading: (loading: boolean) => void,
) => {
	setIsLoading(true);
	try {
		if (!userId) {
			throw new Error("User ID is required");
		}
		const { error } = await supabase
			.from("users")
			.update(values)
			.eq("user_id", userId);

		if (error) {
			throw error;
		}

		showAlert(200, "Profile updated successfully");
	} catch (error: any) {
		console.error("Error updating profile", error);
		showAlert(500, error.message);
	} finally {
		setIsLoading(false);
	}
};
