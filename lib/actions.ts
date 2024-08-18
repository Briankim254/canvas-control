"use server";

import { login } from "@/auth";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(loginData);
    const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();

    console.log(res);
    if (res.message !== "success") {
      throw new Error("CredentialsSignin");
    }
    await login(res.data);
    return { authenticated: true };
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
