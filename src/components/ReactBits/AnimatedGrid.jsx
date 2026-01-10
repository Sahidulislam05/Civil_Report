import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedGrid = ({ color = "rgba(100, 100, 100, 0.2)" }) => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeWidth="1" />
                    </pattern>
                </defs>
                <motion.rect
                    width="100%"
                    height="100%"
                    fill="url(#grid-pattern)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: [0, 20, 0], y: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </svg>
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-base-100" />
        </div>
    );
};

export default AnimatedGrid;
