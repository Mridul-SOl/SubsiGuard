"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, ShieldCheck, AlertTriangle, MapPin } from "lucide-react";
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

      {/* Navbar Placeholder (for spacing) - Header is now in Layout */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-20 px-4 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/90 z-0"></div>
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

      {/* Impact Stats (Bento Grid) */}
      <section className="py-20 px-4">
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
    </div>
  );
}
