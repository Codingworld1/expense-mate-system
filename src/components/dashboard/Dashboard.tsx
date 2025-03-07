
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, CheckCircle2, Clock, FileText, PieChart, RefreshCcw, UserIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Dummy data
const recentExpenses = [
  { id: 1, description: 'Team lunch at Olive Garden', amount: 89.99, category: 'Food', date: '2023-09-15', status: 'approved' },
  { id: 2, description: 'Office supplies from Staples', amount: 42.50, category: 'Office', date: '2023-09-12', status: 'pending' },
  { id: 3, description: 'Uber to client meeting', amount: 25.00, category: 'Travel', date: '2023-09-10', status: 'approved' },
  { id: 4, description: 'Software subscription', amount: 99.99, category: 'Software', date: '2023-09-08', status: 'rejected' },
];

export const Dashboard = () => {
  const { toast } = useToast();
  
  const showNotImplementedToast = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature is not available in the demo version.",
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your expense dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Expenses"
          value="$12,580"
          change="+12.5%"
          trend="up"
          icon={FileText}
          onClick={showNotImplementedToast}
        />
        <StatCard 
          title="Pending Approval"
          value="6"
          change="-2"
          trend="down"
          icon={Clock}
          onClick={showNotImplementedToast}
        />
        <StatCard 
          title="Budget Utilization"
          value="49%"
          change="+5%"
          trend="up"
          icon={PieChart}
          onClick={showNotImplementedToast}
        />
        <StatCard 
          title="Expenses this Month"
          value="$4,280"
          change="-8.3%"
          trend="down"
          icon={RefreshCcw}
          onClick={showNotImplementedToast}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <Button variant="ghost" size="sm" onClick={showNotImplementedToast}>View all</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <Link to="#" key={expense.id} onClick={(e) => { e.preventDefault(); showNotImplementedToast(); }}>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {expense.status === 'approved' && <CheckCircle2 className="h-5 w-5 text-expense-approved" />}
                        {expense.status === 'pending' && <Clock className="h-5 w-5 text-expense-pending" />}
                        {expense.status === 'rejected' && <X className="h-5 w-5 text-expense-rejected" />}
                      </div>
                      <div>
                        <p className="font-medium">{expense.description}</p>
                        <p className="text-sm text-muted-foreground">{expense.date} • {expense.category}</p>
                      </div>
                    </div>
                    <div className="font-medium">${expense.amount}</div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <div className="font-medium mb-1">Team lunch reimbursement</div>
                <div className="text-sm text-muted-foreground mb-2">Submitted by John Doe • 2 days ago</div>
                <div className="font-medium mb-3">$78.50</div>
                <div className="flex space-x-2">
                  <Button size="sm" className="w-full" variant="outline" onClick={showNotImplementedToast}>View</Button>
                  <Button size="sm" className="w-full" onClick={showNotImplementedToast}>Approve</Button>
                </div>
              </div>
              
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <div className="font-medium mb-1">Office supplies</div>
                <div className="text-sm text-muted-foreground mb-2">Submitted by Jane Smith • 1 day ago</div>
                <div className="font-medium mb-3">$45.99</div>
                <div className="flex space-x-2">
                  <Button size="sm" className="w-full" variant="outline" onClick={showNotImplementedToast}>View</Button>
                  <Button size="sm" className="w-full" onClick={showNotImplementedToast}>Approve</Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={showNotImplementedToast}>
                  View all pending approvals
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon: Icon, onClick }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className={`flex items-center space-x-1 mt-4 text-sm ${trend === 'up' ? 'text-expense-approved' : 'text-expense-rejected'}`}>
          {trend === 'up' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
          <span>{change} from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};
