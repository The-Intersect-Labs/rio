"use client";

import { useState } from "react";
import Image from "next/image";
import signupImage from "../../assets/signup.png";
import Google from "../../assets/google.svg";
import Apple from "../../assets/apple.svg";
import LinkedIn from "../../assets/linkedin.svg";
import X from "../../assets/x.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

export default function LoginPage() {
    const router = useRouter();
    const { signIn, signInWithGoogle, configured } = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const isFormValid = formData.email.trim() && formData.password.trim();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await signIn(formData.email.trim(), formData.password);
            router.push("/dashboard");
        } catch (err) {
            setError((err as Error).message.replace("Firebase: ", ""));
        } finally {
            setSubmitting(false);
        }
    };

    const handleGoogle = async () => {
        setError(null);
        try {
            await signInWithGoogle();
            router.push("/dashboard");
        } catch (err) {
            setError((err as Error).message.replace("Firebase: ", ""));
        }
    };

    return (
        <main className="flex h-screen items-center">

            <div className="w-full max-w-[700px]">
                <Image
                    src={signupImage}
                    alt="RIO signup preview"
                    className="block h-screen w-full"
                    priority
                />
            </div>
            <section className="w-full flex justify-center">
                <div className="max-w-[500px] w-full">
                    <h2 className="my-4 text-3xl text-center font-bold tracking-tight text-slate-950">
                        Welcome Back!
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {!configured && (
                            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
                                Auth isn&apos;t configured yet — set NEXT_PUBLIC_FIREBASE_* in .env.local.
                            </p>
                        )}
                        {error && (
                            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                        )}
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Email Address</span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] not-placeholder-shown:border-[#2563EB] not-placeholder-shown:border-2 focus:border-2"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] not-placeholder-shown:border-[#2563EB] not-placeholder-shown:border-2 focus:border-2"
                            />
                        </label>
                        <div className="flex justify-between">
                            <label className="flex items-center gap-2 text-sm text-slate-600">
                                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]" />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-[#2563EB] hover:text-[#2563EB]">Forgot password?</a>
                        </div>
                        <button
                            type="submit"
                            disabled={!isFormValid || submitting || !configured}
                            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] disabled:bg-[#C9D8FA] disabled:cursor-not-allowed cursor-pointer"
                        >
                            {submitting ? "Logging in…" : "Log In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account? <Link href="/register" className="font-semibold text-sky-600 hover:text-sky-700">Sign Up</Link>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        <span>Or continue with</span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="flex flex-col gap-4 mt-5">
                        <button
                            type="button"
                            onClick={handleGoogle}
                            disabled={!configured}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Image src={Google} alt="Google logo" className="h-5 w-5" />
                            Google
                        </button>
                        <div className="flex justify-between gap-8 w-full">
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                                <Image src={LinkedIn} alt="LinkedIn logo" className="h-5 w-5" />
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                                <Image src={X} alt="X logo" className="h-5 w-5" />
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                                <Image src={Apple} alt="Apple logo" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
