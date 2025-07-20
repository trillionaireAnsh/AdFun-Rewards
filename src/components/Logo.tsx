import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <Gift className={cn('text-primary', className)} />
);
