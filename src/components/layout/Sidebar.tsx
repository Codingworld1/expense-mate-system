
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  CreditCard, 
  FilePlus, 
  Home, 
  Settings, 
  Users, 
  FileText,
  CheckCircle
} from 'lucide-react';

interface SidebarProps {
  open?: boolean;
  className?: string;
}

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: Home },
  { title: 'Expenses', href: '/expenses', icon: CreditCard },
  { title: 'New Expense', href: '/expenses/new', icon: FilePlus },
  { title: 'Approvals', href: '/approvals', icon: CheckCircle },
  { title: 'Reports', href: '/reports', icon: FileText },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
];

const secondaryNavItems: NavItem[] = [
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Users', href: '/users', icon: Users },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  open = true,
  className
}) => {
  const location = useLocation();
  
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 w-64 transform bg-sidebar transition-transform duration-300 ease-in-out",
        open ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <CreditCard size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">ExpenseMate</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <nav className="space-y-1">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60 mb-2">Main</p>
            {mainNavItems.map((item) => (
              <NavLink 
                key={item.href}
                item={item}
                active={location.pathname === item.href}
              />
            ))}
          </nav>
          
          <nav className="space-y-1">
            <p className="px-3 text-xs font-medium uppercase tracking-wider text-sidebar-foreground/60 mb-2">Admin</p>
            {secondaryNavItems.map((item) => (
              <NavLink 
                key={item.href}
                item={item}
                active={location.pathname === item.href}
              />
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="p-3 rounded-lg bg-sidebar-accent/20 text-sidebar-foreground/80">
            <div className="text-sm">Current budget</div>
            <div className="flex items-end justify-between mt-1">
              <div className="text-lg font-medium text-sidebar-foreground">$24,500</div>
              <div className="text-xs text-sidebar-foreground/60">of $50,000</div>
            </div>
            <div className="mt-2 h-1.5 w-full bg-sidebar-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '49%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

interface NavLinkProps {
  item: NavItem;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ item, active }) => {
  const { title, href, icon: Icon } = item;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
        active 
          ? "bg-primary text-primary-foreground" 
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground"
      )}
    >
      <Icon size={18} className={cn("mr-3 flex-shrink-0")} />
      <span>{title}</span>
    </Link>
  );
};
