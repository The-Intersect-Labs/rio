"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import signupImage from "../../assets/signup.png";
import { Check, X as XIcon } from "lucide-react";
import Google from "../../assets/google.svg";
import Apple from "../../assets/apple.svg";
import LinkedIn from "../../assets/linkedin.svg";
import X from "../../assets/x.svg";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const passwordRequirements = {
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
    };

    const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

    const isPasswordMatching =
        formData.confirmPassword === "" || formData.password === formData.confirmPassword;

    const isFormValid =
        formData.name.trim() &&
        formData.email.trim() &&
        isPasswordValid &&
        formData.confirmPassword.trim() &&
        isPasswordMatching &&
        formData.agreeToTerms;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) router.push("/onboarding");
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
                        Create account
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] not-placeholder-shown:border-[#2563EB] not-placeholder-shown:border-2 focus:border-2"
                            />
                        </label>

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

                        <div>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                    placeholder="Password"
                                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2563EB] not-placeholder-shown:border-[#2563EB] not-placeholder-shown:border-2 focus:border-2"
                                />
                            </label>
                            {isPasswordFocused && (
                                <div className="mt-3 space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        {passwordRequirements.minLength ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <XIcon className="h-4 w-4 text-slate-300" />
                                        )}
                                        <span className={passwordRequirements.minLength ? "text-emerald-600" : "text-slate-400"}>
                                            At least 8 characters
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {passwordRequirements.hasUppercase ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <XIcon className="h-4 w-4 text-slate-300" />
                                        )}
                                        <span className={passwordRequirements.hasUppercase ? "text-emerald-600" : "text-slate-400"}>
                                            At least one uppercase letter
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {passwordRequirements.hasNumber ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <XIcon className="h-4 w-4 text-slate-300" />
                                        )}
                                        <span className={passwordRequirements.hasNumber ? "text-emerald-600" : "text-slate-400"}>
                                            At least one number
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-2 ${!isPasswordMatching && formData.confirmPassword
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-slate-200 focus:border-[#2563EB] not-placeholder-shown:border-[#2563EB] not-placeholder-shown:border-2"
                                        }`}
                                />
                            </label>
                            {!isPasswordMatching && formData.confirmPassword && (
                                <span className="mt-1 block text-xs text-red-500">Invalid password</span>
                            )}
                        </div>

                        <label className="flex items-start gap-3 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                            />
                            <span>I agree to the <a href="#" className="font-semibold text-sky-600 underline decoration-sky-300">Terms</a> and <a href="#" className="font-semibold text-sky-600 underline decoration-sky-300">Privacy Policy</a>.</span>
                        </label>

                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className="inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] disabled:bg-[#C9D8FA] disabled:cursor-not-allowed cursor-pointer"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Already have an account? <Link href="/login" className="font-semibold text-sky-600 hover:text-sky-700">Log In</Link>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                        <span className="h-px flex-1 bg-slate-200" />
                        <span>Or continue with</span>
                        <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="flex flex-col gap-4 mt-5">
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
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
