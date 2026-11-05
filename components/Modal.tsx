import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal({ children, show }: {children: React.ReactNode, show: boolean}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md'
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='flex w-11/12 flex-col gap-4 rounded-[var(--radius-card)] border border-line-strong bg-bg-elev p-6 text-fg sm:w-2/3 md:w-2/5 lg:w-3/6 xl:w-2/6' 
          >
         {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
