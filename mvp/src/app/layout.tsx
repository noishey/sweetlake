import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Sweetlake',
  description: '---',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white`}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
