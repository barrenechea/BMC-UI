import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export default function FourOhFour() {
  const navigate = useNavigate();
  return (
    <main className="flex h-[55rem] w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-center text-9xl font-bold text-neutral-400 dark:text-neutral-100">
          404
        </h1>
        <p className="mb-10 text-center text-4xl font-semibold">
          Sorry, Page Not Found
        </p>
        <Button
          type="button"
          size="lg"
          onClick={() => void navigate({ to: "/" })}
        >
          Back to home
        </Button>
      </div>
    </main>
  );
}
