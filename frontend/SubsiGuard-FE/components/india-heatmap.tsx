"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Fix for default marker icon in Next.js
import L from 'leaflet';

// Coordinates for Indian states (approximate centers)
const STATE_COORDINATES: Record<string, [number, number]> = {
    "Uttar Pradesh": [26.8467, 80.9462],
    "Maharashtra": [19.7515, 75.7139],
    "Bihar": [25.0961, 85.3131],
    "West Bengal": [22.9868, 87.8550],
    "Madhya Pradesh": [22.9734, 78.6569],
    "Tamil Nadu": [11.1271, 78.6569],
    "Rajasthan": [27.0238, 74.2179],
    "Karnataka": [15.3173, 75.7139],
    "Gujarat": [22.2587, 71.1924],
    "Andhra Pradesh": [15.9129, 79.7400],
    "Kerala": [10.8505, 76.2711],
    "Telangana": [18.1124, 79.0193],
    "Assam": [26.2006, 92.9376],
    "Punjab": [31.1471, 75.3412],
    "Haryana": [29.0588, 76.0856],
    "Delhi": [28.7041, 77.1025],
};

interface HeatmapData {
    state: string;
    value: number; // e.g., fraud amount or count
    riskScore: number;
}

interface IndiaHeatmapProps {
    data: HeatmapData[];
    className?: string;
}

// Component to update map view when center changes
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, 5);
    }, [center, map]);
    return null;
}

export function IndiaHeatmap({ data, className }: IndiaHeatmapProps) {
    // Center of India
    const center: [number, number] = [22.5937, 78.9629];
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Card className={className}>
                <CardHeader>
                    <CardTitle>Geographic Risk Distribution</CardTitle>
                    <CardDescription>Visualizing high-risk areas across states</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center bg-muted/20">
                    <p className="text-muted-foreground animate-pulse">Loading Map...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Geographic Risk Distribution</CardTitle>
                <CardDescription>Visualizing high-risk areas across states</CardDescription>
            </CardHeader>
            <CardContent className="p-0 relative h-[450px]">
                <MapContainer
                    center={center}
                    zoom={4}
                    scrollWheelZoom={false}
                    className="h-full w-full rounded-b-xl z-0"
                    style={{ background: '#0f172a' }} // Match dark theme
                >
                    {/* Dark themed tiles */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    <MapUpdater center={center} />

                    {data.map((item) => {
                        const coords = STATE_COORDINATES[item.state];
                        if (!coords) return null;

                        // Size based on value/count (normalized)
                        const maxValue = Math.max(...data.map(d => d.value));
                        const radius = 10 + (item.value / maxValue) * 40;

                        // Color based on risk score
                        let color = "#10b981"; // emerald (low risk)
                        if (item.riskScore > 70) color = "#ef4444"; // red (high risk)
                        else if (item.riskScore > 40) color = "#eab308"; // yellow (medium)

                        return (
                            <CircleMarker
                                key={item.state}
                                center={coords}
                                radius={radius}
                                pathOptions={{
                                    fillColor: color,
                                    fillOpacity: 0.6,
                                    color: color,
                                    weight: 1,
                                }}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-1">
                                        <h3 className="font-bold text-sm mb-1">{item.state}</h3>
                                        <div className="flex flex-col gap-1 text-xs">
                                            <span className="flex justify-between gap-2">
                                                Leakage:
                                                <span className="font-mono">
                                                    ₹{(item.value / 100000).toFixed(1)}L
                                                </span>
                                            </span>
                                            <span className="flex justify-between gap-2">
                                                Risk Score:
                                                <Badge variant={item.riskScore > 70 ? "destructive" : "secondary"} className="h-5 px-1 py-0 text-[10px]">
                                                    {item.riskScore}/100
                                                </Badge>
                                            </span>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            </CardContent>
        </Card>
    );
}
