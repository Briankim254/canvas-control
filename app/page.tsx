import { auth } from "@/auth";
import { Dashbord1 } from "@/components/charts/dashboard1";
import { Dashboard2 } from "@/components/charts/dashboard2";
import { Dashboard3 } from "@/components/charts/dashboard3";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }

  if (user.verification == "UNVERIFIED") {
    redirect("/guest/verify");
  }

  if (user.verification == "VERIFIED") {
    redirect("/admin/dashboard");
  }

  return (
    <>
      <main className="">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          Welcome to Canvas Control
        </div>
      </main>
    </>
  );
}
