"use client";
import React, { useRef } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorder({
    children,
    duration = 2000,
    className,
    containerClassName,
    borderRadius = "1.75rem",
}: {
    children: React.ReactNode;
    duration?: number;
    className?: string;
    containerClassName?: string;
    borderRadius?: string;
}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pathRef = useRef<any>(null);
    const progress = useMotionValue<number>(0);

    useAnimationFrame((time) => {
        const length = pathRef.current?.getTotalLength();
        if (length) {
            const pxPerMillisecond = length / duration;
            progress.set((time * pxPerMillisecond) % length);
        }
    });

    const x = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).x
    );
    const y = useTransform(
        progress,
        (val) => pathRef.current?.getPointAtLength(val).y
    );

    const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

    return (
        <div
            className={cn(
                "bg-transparent relative text-xl  h-16 w-40 p-[1px] overflow-hidden ",
                containerClassName
            )}
            style={{
                borderRadius: borderRadius,
            }}
        >
            <div
                className="absolute inset-0"
                style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="absolute h-full w-full"
                    width="100%"
                    height="100%"
                >
                    <rect
                        fill="none"
                        width="100%"
                        height="100%"
                        rx={borderRadius}
                        ry={borderRadius}
                        ref={pathRef}
                    />
                </svg>
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        display: "inline-block",
                        transform,
                    }}
                >
                    <div
                        className={cn(
                            "h-20 w-20 opacity-[0.8] bg-[radial-gradient(#2563eb_40%,transparent_60%)]",
                            className
                        )}
                    />
                </motion.div>
            </div>

            <div
                className={cn(
                    "relative bg-white border border-slate-100 backdrop-blur-xl text-slate-900 flex items-center justify-center w-full h-full text-sm antialiased",
                    className
                )}
                style={{
                    borderRadius: `calc(${borderRadius} * 0.96)`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
