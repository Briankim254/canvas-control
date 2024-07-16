import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import React from "react";

function guestPage() {
  return (
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 items-center justify-items-center ">
          <div>
            <ShieldAlert size={100} />
          </div>
          <h2 className="text-4xl font-extrabold text-white-900 sm:text-5xl">
            Verify your account
          </h2>
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
            Your account is not verified yet. Please wait if pending
            verification
          </p>
          <div className="mt-8">
            <SignOutButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default guestPage;

async function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={"default"} type="submit">
        Sign Out
      </Button>
    </form>
  );
}
