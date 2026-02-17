"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, ShieldCheck, AlertTriangle, MapPin, CheckCircle, BarChart3, Lock, Upload, Search, FileCheck, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <GridPattern
        width={50}
        height={50}
        x={-1}
        y={-1}
        className="opacity-50 text-slate-200 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />

      {/* Navbar Overlay - No spacer needed as header is absolute */}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-20 px-4 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 z-0"></div>
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              {t('app.tagline')}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-[1.1]">
              {t('hero.sovereign')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                {t('hero.benefits')}
              </span>
            </h1>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 px-8 text-base shadow-lg shadow-blue-600/20 transition-all hover:scale-105">
                  {t('hero.cta.dashboard')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-full h-12 px-8 text-base bg-white">
                  {t('hero.cta.learn')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('features.title') || "Why SubsiGuard?"}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {t('features.subtitle') || "Advanced technology meets government oversight for a leakage-free subsidy ecosystem."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI-Powered Detection</h3>
              <p className="text-slate-500 leading-relaxed">
                Proprietary machine learning models trained on millions of transaction records to identify suspicious patterns, ghost beneficiaries, and anomalies in real-time.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Analytics</h3>
              <p className="text-slate-500 leading-relaxed">
                Live dashboard providing instant visibility into disbursement flows, leakage hotspots, and scheme performance across districts and states.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Compliant</h3>
              <p className="text-slate-500 leading-relaxed">
                Enterprise-grade security with end-to-end encryption. Fully compliant with government data protection standards and Aadhaar data vault regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Streamlined process for rapid audit and verification.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg border-4 border-slate-50 mx-auto flex items-center justify-center mb-6 z-10 relative">
                <Upload className="w-10 h-10 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white">1</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Data</h3>
              <p className="text-slate-500 text-sm px-4">
                Securely upload beneficiary lists (CSV/Excel) or integrate via API for continuous monitoring.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg border-4 border-slate-50 mx-auto flex items-center justify-center mb-6 z-10 relative">
                <Search className="w-10 h-10 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Analysis</h3>
              <p className="text-slate-500 text-sm px-4">
                Our advanced algorithms scan for duplicates, ghost accounts, and eligibility mismatches instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg border-4 border-slate-50 mx-auto flex items-center justify-center mb-6 z-10 relative">
                <FileCheck className="w-10 h-10 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Actionable Insights</h3>
              <p className="text-slate-500 text-sm px-4">
                Receive detailed audit reports with flagged entries and recommended actions for field verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats (Bento Grid) */}
      <section className="pt-8 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">National Impact Overview</h2>
            <p className="text-slate-500">Real-time data processing across key subsidy schemes.</p>
          </div>

          <BentoGrid>
            <BentoGridItem
              title={t('stats.beneficiaries')}
              description="Records analyzed across PDS, KISAN, and MGNREGA schemes."
              header={<div className="text-4xl font-bold text-slate-900">24.5 Cr+</div>}
              icon={<FileText className="h-6 w-6 text-blue-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title={t('stats.leakage')}
              description="Estimated savings from pre-disbursement fraud detection."
              header={<div className="text-4xl font-bold text-emerald-600">₹450 Cr</div>}
              icon={<ShieldCheck className="h-6 w-6 text-emerald-500" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title={t('stats.anomalies')}
              description="High-risk cases requiring immediate manual verification."
              header={<div className="text-4xl font-bold text-orange-500">12,405</div>}
              icon={<AlertTriangle className="h-6 w-6 text-orange-500" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title={t('stats.coverage')}
              description="Deployed in 14 States and 3 Union Territories."
              header={<div className="text-4xl font-bold text-indigo-600">17 Regions</div>}
              icon={<MapPin className="h-6 w-6 text-indigo-500" />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-t border-slate-100 bg-white">
        <div className="container mx-auto text-center">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-8">Trusted Ecosystem Partners</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-bold text-slate-900">NIC</div>
            <div className="text-xl font-bold text-slate-900">UIDAI</div>
            <div className="text-xl font-bold text-slate-900">PFMS</div>
            <div className="text-xl font-bold text-slate-900">NPCI</div>
            <div className="text-xl font-bold text-slate-900">DBT Bharat</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-white text-lg font-bold mb-4">{t('app.name')}</h3>
              <p className="text-sm leading-relaxed text-slate-400 mb-6">
                Protecting public funds, ensuring they reach the rightful beneficiaries through advanced technology.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                <li><Link href="/upload" className="hover:text-blue-400 transition-colors">Audit Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">API Access</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li>New Delhi, India</li>
                <li>support@subsiguard.gov.in</li>
                <li>+91 11 2345 6789</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} SubsiGuard. All rights reserved. Government of India.</p>
            <div className="flex gap-6">
              <span>v1.0.0</span>
              <span>Security Audited</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
