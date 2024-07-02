"use client";

import React, { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Heading, Heading4 } from "@/src/components/atoms";

interface ModalTemplateProps {
  children: React.ReactNode;
  onClose: (toClose: boolean) => void;
  title?: string;
  subtitle?: string;
}

const ModalTemplate: React.FC<ModalTemplateProps> 
= ({ children, onClose, title, subtitle }) => {

  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}  
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="scroll-none fixed left-0 top-0 z-50 flex
        h-full w-full items-center justify-center"
    >
      <button
        id="close"
        onClick={() => onClose(true)}
        className="h-full w-full bg-gray-50
        bg-opacity-50 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0, x: '-50%', y: '-50%'}}  
        animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%'}} 
        exit={{ opacity: 0, scale: 0, x: '-50%', y: '-50%'}} 
        className="absolute left-1/2 top-1/2 flex
          w-[670px] flex-col items-center justify-center gap-4 
          rounded-3xl border-b border-gray-200
          bg-white px-10 py-12 text-center shadow-xl backdrop-blur-none"
      >
        {!!title && (
          <Heading text={title} font="normal"/>
        )}
        {!!subtitle && (
          <Heading4 
            text={subtitle} 
            font="medium" 
            classes="mb-2 text-gray-80"
          />
        )}
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default memo(ModalTemplate);
