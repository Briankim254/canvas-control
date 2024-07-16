import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }
  if (user?.verification == "VERIFIED") {
    redirect("/admin/dashboard");
  }

  return <div>{children}</div>;
};

export default LayoutPage;
