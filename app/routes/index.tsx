import { Portal } from "@headlessui/react";
import { defer } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

function sleep(val: any, ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(val), ms));
}

export const loader = async () => {
  return defer({
    env: sleep(process.env.NODE_ENV, 1500),
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>@headlessui/react & Suspense issue</h1>

      <Portal>
        <h2>A portal </h2>
      </Portal>

      <Suspense fallback={<span>Loading ...</span>}>
        <Await resolve={data.env}>
          {(env) => <Portal>A suspense portal. Env: {env}</Portal>}
        </Await>
      </Suspense>
    </div>
  );
}
