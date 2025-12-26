import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const role = searchParams.get("role") ?? "Student";
	const next = searchParams.get("next") ?? "/";

	if (!code) {
		return NextResponse.redirect(`${origin}/unauthorized`);
	}

	const forwardedHost = request.headers.get("x-forwarded-host");
	const isLocalEnv = process.env.NODE_ENV === "development";
	let redirectUrl = `${origin}${next}`;

	if (!isLocalEnv && forwardedHost) {
		redirectUrl = `https://${forwardedHost}${next}`;
	}

	const response = NextResponse.redirect(redirectUrl);
	const cookieStore = request.cookies;

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => cookieStore.getAll(),
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value, options }) => {
						request.cookies.set(name, value);
						response.cookies.set(name, value, options);
					});
				},
			},
		},
	);

	const { data: sessionData, error: sessionError } =
		await supabase.auth.exchangeCodeForSession(code);

	if (sessionError || !sessionData.session) {
		return NextResponse.redirect(`${origin}/unauthorized`);
	}

	const user = sessionData.session.user;

	const allowedRoles = ["Student", "Admin"];
	const safeRole = allowedRoles.includes(role) ? role : "Student";

	const { data: existingUser } = await supabase
		.from("users")
		.select("user_id")
		.eq("user_id", user.id)
		.single();

	if (!existingUser) {
		await supabase.from("users").insert({
			user_id: user.id,
			email: user.email,
			full_name: user.user_metadata.full_name ?? "",
			avatar_url: user.user_metadata.avatar_url ?? "",
			role: safeRole,
			status: "Active",
		});
	}

	return response;
}
