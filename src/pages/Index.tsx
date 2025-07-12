import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard";
import { NewCase } from "@/components/new-case";
import { LawsuitEditor } from "@/components/lawsuit-editor";

export type AppView = "dashboard" | "new-case" | "lawsuit-editor";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");
  const [currentCase, setCurrentCase] = useState<any>(null);

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNewCase={() => setCurrentView("new-case")} />;
      case "new-case":
        return (
          <NewCase
            onComplete={(caseData) => {
              setCurrentCase(caseData);
              setCurrentView("lawsuit-editor");
            }}
            onBack={() => setCurrentView("dashboard")}
          />
        );
      case "lawsuit-editor":
        return (
          <LawsuitEditor
            caseData={currentCase}
            onClose={() => setCurrentView("dashboard")}
          />
        );
      default:
        return <Dashboard onNewCase={() => setCurrentView("new-case")} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
          
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b bg-card flex items-center px-6 shadow-sm">
              <SidebarTrigger />
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-foreground">
                  Kosovo Work Law Assistant
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Legal Case Management
                </p>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              {renderView()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
