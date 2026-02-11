"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { signUpAction } from "@/app/actions/auth";
import { Loader2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function SignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 bg-zinc-900/60 rounded-2xl shadow-lg backdrop-blur-md border border-zinc-700"
      >
        <div className="flex items-center justify-center mb-6">
          <ShieldAlert className="h-12 w-12 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-semibold mb-3 text-center">Restricted Access</h1>
        <p className="text-sm text-zinc-400 text-center mb-6">
          Registration is limited to authorized administrators only.
        </p>

        {success ? (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center mb-6">
            ✅ Account created successfully! Redirecting...
          </div>
        ) : (
          <form
            action={async (formData) => {
              try {
                setError(null);
                await signUpAction(formData);
                setSuccess(true);
              } catch (err: unknown) {
                console.error(err);
                if (err instanceof Error) {
                  setError(err.message);
                } else {
                  setError("Failed to sign up. Please try again.");
                }
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
              <label className="block text-sm font-medium mb-1">
                Email <span className="text-xs text-zinc-500">(Must be authorized)</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="admin@example.com"
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
                minLength={8}
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-zinc-500 mt-1">Minimum 8 characters</p>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <SubmitButton />
          </form>
        )}

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-200 text-center">
            ⚠️ Only authorized email addresses can register. If you already have an account, please sign in.
          </p>
        </div>

        <p className="text-sm text-zinc-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/blogs/sign-in"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Sign in
          </Link>
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
        "Create Admin Account"
      )}
    </button>
  );
}
