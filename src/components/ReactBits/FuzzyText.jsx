import React from "react";
import { motion } from "framer-motion";

const FuzzyText = ({ children, fontSize = "4rem", fontWeight = 900, color = "white" }) => {
    const hoverVariant = {
        hover: {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1.05,
            transition: {
                duration: 0.3,
            },
        },
        initial: {
            opacity: 0.8,
            filter: "blur(0px)",
            scale: 1,
        },
    };

    const textVariant = {
        hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.h1
            variants={textVariant}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="text-center font-bold tracking-tighter"
            style={{ fontSize, fontWeight, color }}
        >
            {children}
        </motion.h1>
    );
};

export default FuzzyText;
