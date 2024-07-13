import React from "react";

function guestPage() {
  return (
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-left lg:text-center">
          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
            Free and Premium themes, UI Kit&apos;s, templates and landing pages built
            with Tailwind CSS, HTML &amp; Next.js.
          </p>

          <a
            className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600"
            title="read more"
          >
            {" "}
            Read more about the offer »{" "}
          </a>
        </div>
      </div>
    </section>
  );
}

export default guestPage;
