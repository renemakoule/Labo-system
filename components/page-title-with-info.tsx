import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PageTitleWithInfoProps {
  title: string;
  infoText: string;
}

export function PageTitleWithInfo({ title, infoText }: PageTitleWithInfoProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <Info className="h-4 w-4 text-gray-500" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{infoText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}