import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Clock, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

interface DashboardProps {
  onNewCase: () => void;
}

export function Dashboard({ onNewCase }: DashboardProps) {
  const stats = [
    {
      title: "Total Cases",
      value: "24",
      change: "+3 this month",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Active Cases",
      value: "8",
      change: "2 pending review",
      icon: Clock,
      trend: "neutral"
    },
    {
      title: "Completed Cases",
      value: "16",
      change: "+2 this week",
      icon: CheckCircle,
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "89%",
      change: "+5% this quarter",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const recentCases = [
    {
      id: "1",
      title: "Wrongful Termination - Pristina Corp",
      client: "Arben Krasniqi",
      status: "In Progress",
      priority: "High",
      lastUpdate: "2 hours ago"
    },
    {
      id: "2", 
      title: "Overtime Payment Dispute",
      client: "Blerta Hoxha",
      status: "Analysis",
      priority: "Medium",
      lastUpdate: "1 day ago"
    },
    {
      id: "3",
      title: "Workplace Harassment Case",
      client: "Driton Muja",
      status: "Draft Review",
      priority: "High",
      lastUpdate: "3 days ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-warning/10 text-warning";
      case "Analysis": return "bg-accent/10 text-accent";
      case "Draft Review": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-destructive/10 text-destructive";
      case "Medium": return "bg-warning/10 text-warning";
      case "Low": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your legal cases and activities</p>
        </div>
        <Button onClick={onNewCase} className="bg-gradient-to-r from-primary to-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Recent Cases
          </CardTitle>
          <CardDescription>
            Your most recently updated legal cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCases.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <h4 className="font-medium">{case_.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Client: {case_.client}</span>
                    <span>•</span>
                    <span>{case_.lastUpdate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(case_.priority)}>
                    {case_.priority}
                  </Badge>
                  <Badge className={getStatusColor(case_.status)}>
                    {case_.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onNewCase}>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Plus className="w-5 h-5 mr-2 text-primary" />
              Start New Case
            </CardTitle>
            <CardDescription>
              Begin a new work law case with AI assistance
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="w-5 h-5 mr-2 text-accent" />
              View All Cases
            </CardTitle>
            <CardDescription>
              Browse and manage all your legal cases
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <AlertCircle className="w-5 h-5 mr-2 text-warning" />
              Urgent Actions
            </CardTitle>
            <CardDescription>
              Cases requiring immediate attention
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}