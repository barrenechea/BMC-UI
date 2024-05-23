import { createFileRoute, redirect } from "@tanstack/react-router";
import { type AxiosError } from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useLoginMutation } from "@/lib/api/set";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      const redirectPath = (search as { redirect: string }).redirect || "/info";
      throw redirect({ to: redirectPath });
    }
  },
  component: Login,
});

function Login() {
  const { mutate: mutateLogin, isPending } = useLoginMutation();
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const rememberMe = (
      form.elements.namedItem("rememberMe") as HTMLInputElement
    ).checked;

    mutateLogin(
      { username, password },
      {
        onSuccess: (data) => {
          setMessage("");
          login(data.id, rememberMe);

          // force refresh the same page, natively
          window.location.reload();
        },
        onError: (error) => {
          const msg =
            (error as AxiosError).code === "ERR_BAD_REQUEST"
              ? "Invalid username or password"
              : "An error has occurred. Please try again later.";
          setMessage(msg);
        },
      }
    );
  };

  return (
    <div className="flex h-[32rem] w-full items-center justify-center md:h-[55rem]">
      <main className="size-full rounded-md bg-white p-10 pt-20 shadow-md dark:bg-neutral-900 md:h-auto md:w-96 md:pt-10">
        <h3 className="mb-8 text-center text-3xl font-bold">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              autoCorrect="off"
              autoCapitalize="off"
              name="username"
              label="Username"
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              autoCorrect="off"
              autoCapitalize="off"
              name="password"
              label="Password"
            />
          </div>
          <div className="mb-4 flex items-center">
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              aria-label="Remember me"
            />
            <label
              htmlFor="rememberMe"
              className="not-sr-only ml-2 text-sm font-semibold"
            >
              Remember me
            </label>
          </div>
          <div className="mb-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isPending}
              isLoading={isPending}
            >
              Login
            </Button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-red-500" id="responseMessage">
              {message}
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
