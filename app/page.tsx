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

  return (
    <>
      <main className="">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Dashbord1 />
            <Dashboard3 />
          </div>
          <Dashboard2 />
        </div>
      </main>
    </>
  );
}
