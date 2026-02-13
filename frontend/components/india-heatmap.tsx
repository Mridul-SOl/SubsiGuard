"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet components with NO SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import("react-leaflet").then((mod) => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export function IndiaHeatmap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-lg flex items-center justify-center text-slate-400">Loading Map...</div>;
    }

    const center: [number, number] = [20.5937, 78.9629]; // Center of India
    const dataPoints = [
        { lat: 28.7041, lng: 77.1025, city: "Delhi", risk: 85, cases: 1240 },
        { lat: 19.0760, lng: 72.8777, city: "Mumbai", risk: 65, cases: 890 },
        { lat: 12.9716, lng: 77.5946, city: "Bangalore", risk: 45, cases: 320 },
        { lat: 25.5941, lng: 85.1376, city: "Patna", risk: 92, cases: 2100 },
        { lat: 26.8467, lng: 80.9461, city: "Lucknow", risk: 88, cases: 1850 },
    ];

    const getColor = (risk: number) => {
        if (risk > 80) return "#ef4444"; // Red
        if (risk > 50) return "#f59e0b"; // Orange
        return "#10b981"; // Emerald
    };

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-slate-200 z-0 relative">
            <MapContainer center={center} zoom={4} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {dataPoints.map((point, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[point.lat, point.lng]}
                        pathOptions={{ color: getColor(point.risk), fillColor: getColor(point.risk), fillOpacity: 0.6 }}
                        radius={point.cases / 100} // Dynamic radius based on cases
                    >
                        <Popup>
                            <div className="text-sm font-sans">
                                <strong className="text-gov-navy block mb-1">{point.city}</strong>
                                Risk Score: <span style={{ color: getColor(point.risk) }} className="font-bold">{point.risk}</span><br />
                                Active Cases: {point.cases}
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
}
