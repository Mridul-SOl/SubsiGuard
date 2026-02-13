"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowRight, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.login(email, password);

            if (response.success) {
                // Store auth details
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));

                toast.success("Login successful", {
                    description: `Welcome back, ${response.user.full_name || response.user.username}`,
                });
                router.push("/dashboard");
            }
        } catch (err: any) {
            toast.error("Login failed", {
                description: err.message || "Invalid credentials",
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[url('/login-bg.png')] bg-cover bg-center bg-no-repeat relative overflow-hidden p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-0"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
                        Subsi<span className="text-blue-600">Guard</span>
                    </div>
                    <p className="text-slate-500 text-sm">Official Government Fraud Detection Portal</p>
                </div>

                <GlassCard className="p-8 backdrop-blur-md bg-white/80">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                        <p className="text-slate-500 text-sm">Enter your credentials to access the dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                                Email / Username
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="admin"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 bg-white/50 border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="admin"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 bg-white/50 border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-slate-400">
                        Project for Hackathon • Mock Authentication
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
