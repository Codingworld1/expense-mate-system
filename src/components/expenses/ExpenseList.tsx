
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, ChevronDown, Clock, FileText, Filter, Plus, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Dummy data
const expenses = [
  { id: 1, description: 'Team lunch at Olive Garden', amount: 89.99, category: 'Food', date: '2023-09-15', status: 'approved', attachments: 1 },
  { id: 2, description: 'Office supplies from Staples', amount: 42.50, category: 'Office', date: '2023-09-12', status: 'pending', attachments: 2 },
  { id: 3, description: 'Uber to client meeting', amount: 25.00, category: 'Travel', date: '2023-09-10', status: 'approved', attachments: 0 },
  { id: 4, description: 'Software subscription', amount: 99.99, category: 'Software', date: '2023-09-08', status: 'rejected', attachments: 1 },
  { id: 5, description: 'Hotel for conference', amount: 450.00, category: 'Travel', date: '2023-09-05', status: 'approved', attachments: 3 },
  { id: 6, description: 'Client dinner', amount: 120.75, category: 'Food', date: '2023-09-03', status: 'pending', attachments: 1 },
  { id: 7, description: 'Marketing materials print', amount: 150.00, category: 'Marketing', date: '2023-08-28', status: 'approved', attachments: 0 },
  { id: 8, description: 'Train tickets', amount: 78.50, category: 'Travel', date: '2023-08-25', status: 'approved', attachments: 2 },
];

type Status = 'all' | 'pending' | 'approved' | 'rejected';

export const ExpenseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status>('all');
  const { toast } = useToast();
  
  const showNotImplementedToast = () => {
    toast({
      title: "Feature not implemented",
      description: "This feature is not available in the demo version.",
      variant: "default",
    });
  };
  
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground mt-1">Manage and track your expenses</p>
        </div>
        <Button onClick={showNotImplementedToast} className="sm:self-end">
          <Plus className="w-4 h-4 mr-2" />
          New Expense
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search expenses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <StatusFilter 
            status="all"
            currentStatus={statusFilter}
            setStatus={setStatusFilter}
          />
          <StatusFilter 
            status="pending"
            currentStatus={statusFilter}
            setStatus={setStatusFilter}
          />
          <StatusFilter 
            status="approved"
            currentStatus={statusFilter}
            setStatus={setStatusFilter}
          />
          <StatusFilter 
            status="rejected"
            currentStatus={statusFilter}
            setStatus={setStatusFilter}
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={showNotImplementedToast}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium">{expense.description}</div>
                          {expense.attachments > 0 && (
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <FileText className="h-3 w-3 mr-1" />
                              {expense.attachments} attachment{expense.attachments > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">${expense.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{expense.category}</td>
                    <td className="px-6 py-4">{expense.date}</td>
                    <td className="px-6 py-4">
                      <ExpenseStatus status={expense.status as Status} />
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); showNotImplementedToast(); }}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredExpenses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">No expenses found</div>
                <Button variant="outline" className="mt-4" onClick={showNotImplementedToast}>
                  <Filter className="w-4 h-4 mr-2" />
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatusFilterProps {
  status: Status;
  currentStatus: Status;
  setStatus: (status: Status) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ status, currentStatus, setStatus }) => {
  const isActive = status === currentStatus;
  
  const getLabel = () => {
    switch (status) {
      case 'all': return 'All';
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
    }
  };
  
  const getIcon = () => {
    switch (status) {
      case 'all': return null;
      case 'pending': return <Clock className="w-3 h-3 mr-1" />;
      case 'approved': return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case 'rejected': return <X className="w-3 h-3 mr-1" />;
    }
  };
  
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={() => setStatus(status)}
      className={cn(
        "h-9 flex items-center",
        status === 'pending' && isActive && "bg-expense-pending text-black hover:bg-expense-pending/90",
        status === 'approved' && isActive && "bg-expense-approved text-white hover:bg-expense-approved/90",
        status === 'rejected' && isActive && "bg-expense-rejected text-white hover:bg-expense-rejected/90"
      )}
    >
      {getIcon()}
      {getLabel()}
    </Button>
  );
};

interface ExpenseStatusProps {
  status: Status;
}

const ExpenseStatus: React.FC<ExpenseStatusProps> = ({ status }) => {
  if (status === 'all') return null;
  
  return (
    <div className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      status === 'pending' && "bg-expense-pending/20 text-expense-pending",
      status === 'approved' && "bg-expense-approved/20 text-expense-approved",
      status === 'rejected' && "bg-expense-rejected/20 text-expense-rejected"
    )}>
      {status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
      {status === 'approved' && <Check className="w-3 h-3 mr-1" />}
      {status === 'rejected' && <X className="w-3 h-3 mr-1" />}
      <span className="capitalize">{status}</span>
    </div>
  );
};
