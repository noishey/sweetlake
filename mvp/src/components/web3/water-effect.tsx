'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

interface WaterEffectProps {
  className?: string;
}

export function WaterEffect({ className }: WaterEffectProps) {
  return (
    <div className={cn("relative w-full h-screen flex items-center justify-center", className)}>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Sweetlake Logo"
          width={700}
          height={700}
          className="h-[70vh] w-auto"
          priority
        />
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <DynamicWidget />
      </div>
    </div>
  );
} 