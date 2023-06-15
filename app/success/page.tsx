"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default async function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectPage = searchParams.get("redirect");

  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: localStorage.getItem("localStoredCartItems"),
    });
    if (!response.ok) {
      throw new Error(`Invalid response: ${response.status}`);
    }
  } catch (err) {
    console.error(err);
  }

  router.push(redirectPage ? redirectPage : "/");

  return (
    <p>This will never be shown...</p>
  );
}
