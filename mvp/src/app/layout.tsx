import './globals.css';
import { Urbanist } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import { GradientBackground } from '@/components/backgrounds/gradient-background';
import { Providers } from '@/components/web3/dynamic-provider';
import { WaterEffect } from '@/components/web3/water-effect';
import type { Metadata } from 'next';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sweetlake',
  description: 'A sleek modern experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} bg-[#0a0a0a] text-white`}>
        <GradientBackground />
        <Navbar />
        <Providers>
          <WaterEffect>
            {children}
          </WaterEffect>
        </Providers>
      </body>
    </html>
  );
}
