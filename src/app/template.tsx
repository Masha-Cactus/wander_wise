"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import { 
  LayoutRouterContext 
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef } from "react";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const variants = {
  hidden: { opacity: 0, x: 100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -100 },
};

export default function Template({ children }: { children: React.ReactNode }){ 
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div 
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear", duration: 0.5 }}
        className="w-full h-full overflow-x-hidden"
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>    
    </AnimatePresence> 
  );
}