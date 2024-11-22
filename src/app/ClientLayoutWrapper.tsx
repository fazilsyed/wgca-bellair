'use client'
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import ClientLayout from '@/components/ClientLayout';
import { CartProvider } from '@/context/CartContext';

export default function ClientLayoutWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#00A6B2] rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <CartProvider>
      <ClientLayout>{children}</ClientLayout>
    </CartProvider>
  );
} 