"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signUpAction } from "@/app/actions/auth"; // adjust path if needed
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 bg-zinc-900/60 rounded-2xl shadow-lg backdrop-blur-md border border-zinc-700"
      >
        <h1 className="text-3xl font-semibold mb-6 text-center">Create an Account</h1>

        <form
          action={async (formData) => {
            try {
              await signUpAction(formData);
            } catch (err: any) {
              console.error(err);
              setError("Failed to sign up. Please try again.");
            }
          }}
          className="flex flex-col space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mt-2">{error}</p>
          )}

          <SubmitButton />
        </form>

        <p className="text-sm text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex justify-center items-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg font-medium transition-colors"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Sign Up"
      )}
    </button>
  );
}
