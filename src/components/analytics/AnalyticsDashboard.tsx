
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileDown, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Dummy data
const monthlyData = [
  { name: 'Jan', expenses: 4200, budget: 5000 },
  { name: 'Feb', expenses: 3800, budget: 5000 },
  { name: 'Mar', expenses: 5200, budget: 5000 },
  { name: 'Apr', expenses: 4900, budget: 5000 },
  { name: 'May', expenses: 4600, budget: 5000 },
  { name: 'Jun', expenses: 5800, budget: 6000 },
  { name: 'Jul', expenses: 5400, budget: 6000 },
  { name: 'Aug', expenses: 4700, budget: 6000 },
  { name: 'Sep', expenses: 5100, budget: 6000 },
  { name: 'Oct', expenses: 0, budget: 6000 },
  { name: 'Nov', expenses: 0, budget: 6000 },
  { name: 'Dec', expenses: 0, budget: 6000 },
];

const categoryData = [
  { name: 'Travel', value: 35 },
  { name: 'Food', value: 25 },
  { name: 'Office', value: 15 },
  { name: 'Software', value: 20 },
  { name: 'Marketing', value: 5 },
];

const departmentData = [
  { name: 'Sales', expenses: 12500 },
  { name: 'Engineering', expenses: 18700 },
  { name: 'Marketing', expenses: 9800 },
  { name: 'HR', expenses: 4500 },
  { name: 'Finance', expenses: 3200 },
];

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('year');
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track and analyze your company's expenses</p>
        </div>
        <Button variant="outline" onClick={showNotImplementedToast}>
          <FileDown className="w-4 h-4 mr-2" />
          Export Reports
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/30 p-4 rounded-lg border border-border">
        <div className="text-sm text-muted-foreground">
          Showing data for <span className="font-medium text-foreground">2023</span>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={showNotImplementedToast}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Expenses vs. Budget</CardTitle>
              <Button variant="ghost" size="icon" onClick={showNotImplementedToast}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => `$${value}`} 
                    width={60}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, undefined]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="expenses" 
                    fill="hsla(var(--primary))" 
                    name="Expenses" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    stroke="hsla(var(--expense-pending))" 
                    name="Budget" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Expense Distribution by Category</CardTitle>
              <Button variant="ghost" size="icon" onClick={showNotImplementedToast}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => {
                      const colors = [
                        'hsla(var(--primary))',
                        'hsla(var(--accent))',
                        'hsla(var(--expense-pending))',
                        'hsla(var(--expense-approved))',
                        'hsla(var(--expense-rejected))'
                      ];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, undefined]}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Expenses by Department</CardTitle>
            <Button variant="ghost" size="icon" onClick={showNotImplementedToast}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => `$${value}`}
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12 }} 
                  width={100}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Expenses']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="expenses" 
                  fill="hsla(var(--primary))" 
                  name="Expenses" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Needed for PieChart
const Cell = ({ fill, children }: any) => {
  return (
    <g fill={fill}>
      {children}
    </g>
  );
};
