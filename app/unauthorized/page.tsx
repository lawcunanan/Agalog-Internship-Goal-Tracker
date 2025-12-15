import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center p-4">
			<div className="flex h-52 w-52 items-center justify-center rounded-full bg-destructive/5">
				<ShieldAlert className="h-24 w-24 text-destructive" />
			</div>
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
					Unauthorized Access
				</h1>
				<p className="max-w-150 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					You do not have permission to view this page. If you believe this is a
					mistake, please contact the administrator.
				</p>
			</div>
			<div className="flex gap-2">
				<Button asChild variant="default">
					<Link href="/">Go Home</Link>
				</Button>
			</div>
		</div>
	);
}
