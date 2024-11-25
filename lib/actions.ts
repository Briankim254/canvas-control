"use server";

import { login } from "@/auth";

export async function authenticate(formData: FormData) {
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

    if (!response.ok) {
      return { error: `Failed to login: ${response.statusText}` };
    }
    const res = await response.json();

    console.log(res);
    if (res.message !== "success") {
      return { error: res.message || "Something went wrong." };
    }
    await login(res.data);
    return { success: true };
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: error.message || "Something went wrong." };
      }
    }
  }
}
