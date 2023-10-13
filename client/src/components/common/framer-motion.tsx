import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const FadeIn: React.FC<Props> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="h-full w-full overflow-hidden"
        // slide up
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: 20 }}
        // transition={{ duration: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
