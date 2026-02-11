import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ShieldCheck, Search, BarChart3, Lock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-navy">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-navy to-navy opactiy-50"></div>
          <div className="container relative z-10 max-w-screen-xl flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Live: AI-Powered Fraud Detection v1.0
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl max-w-4xl mb-6 text-glow">
              Safeguarding India's <span className="text-emerald-500">Public Subsidies</span> from Leakage & Fraud
            </h1>

            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Detect anomalies in PDS, PM-KISAN, and MGNREGA using advanced analytics.
              Analyze thousands of records in seconds and visualize leakage impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20 shadow-lg">
                  Analyze Data Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
                  View Live Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl w-full">
              <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                <dt className="text-sm font-medium text-gray-400">Potential Leakage Detected</dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-white">₹1.5 Lakh Cr</dd>
              </div>
              <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                <dt className="text-sm font-medium text-gray-400">Beneficiaries Analyzed</dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-white">2.4 Crore+</dd>
              </div>
              <div className="flex flex-col items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                <dt className="text-sm font-medium text-gray-400">Schemes Covered</dt>
                <dd className="mt-2 text-3xl font-bold tracking-tight text-white">4 Major Programs</dd>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-black/20">
          <div className="container max-w-screen-xl">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Platform Capabilities</h2>
              <p className="mt-4 text-lg text-gray-400">
                Data-driven insights to help government agencies prioritize audits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card/50 p-8 rounded-xl border border-border/50">
                <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Anomaly Detection</h3>
                <p className="text-gray-400 leading-relaxed">
                  Identify duplicate beneficiaries, deceased claims, and impossible geographic transactions automatically.
                </p>
              </div>

              <div className="bg-card/50 p-8 rounded-xl border border-border/50">
                <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Impact Visualization</h3>
                <p className="text-gray-400 leading-relaxed">
                  Interactive heatmaps and charts showing leakage concentration by state, district, and scheme logic.
                </p>
              </div>

              <div className="bg-card/50 p-8 rounded-xl border border-border/50">
                <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure Processing</h3>
                <p className="text-gray-400 leading-relaxed">
                  Enterprise-grade security ensuring beneficiary data privacy and encrypted analysis reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 relative overflow-hidden">
          <div className="container max-w-3xl text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Ready to safeguard public funds?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Join the mission to ensure every rupee reaches the intended beneficiary.
            </p>
            <Link href="/upload">
              <Button size="lg" className="text-lg px-8 bg-white text-navy hover:bg-gray-100">
                Start Free Analysis
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
