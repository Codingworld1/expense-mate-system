
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { X, Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar open={isMobile ? false : sidebarOpen} className="flex-shrink-0" />
      
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        !isMobile && sidebarOpen ? "ml-64" : "ml-0"
      )}>
        <header className="h-16 px-6 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              US
            </div>
          </div>
        </header>
        
        <main className="p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};
