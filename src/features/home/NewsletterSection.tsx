import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="border-t border-border py-16 text-center">
      <div className="mx-auto max-w-xl space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          Join the Aurel list
        </h2>
        <p className="text-muted-foreground">
          New arrivals and quiet offers, once a month. No spam.
        </p>

        {submitted ? (
          <p role="status" className="text-brand">
            Thanks, you are on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
}
