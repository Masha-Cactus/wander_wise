"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }){ 
  const pathname = usePathname();

  return (
    <motion.main 
      key={pathname}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "easeInOut", duration: 0.75 }}
      className="grow overflow-hidden bg-gray-10"
    >
      {children}
    </motion.main>    
  );
}