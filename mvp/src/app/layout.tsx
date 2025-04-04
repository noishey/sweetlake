import './globals.css';
import { Urbanist } from 'next/font/google';
import Navbar from '@/components/ui/navbar';
import DynamicProvider from '@/components/web3/dynamic-provider';
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
        <DynamicProvider>
          <main className="pt-16">{children}</main>
        </DynamicProvider>
      </body>
    </html>
  );
}
