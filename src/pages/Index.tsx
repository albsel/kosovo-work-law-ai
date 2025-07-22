import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Dashboard } from "@/components/dashboard";
import { NewCase } from "@/components/new-case";
import { LawsuitEditor } from "@/components/lawsuit-editor";
import { DeepSeekSetup } from "@/components/openai-setup";
import { deepSeekService } from "@/lib/openai";

export type AppView = "dashboard" | "new-case" | "lawsuit-editor" | "case-submitted";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("dashboard");
  const [currentCase, setCurrentCase] = useState<any>(null);
  const [showDeepSeekSetup, setShowDeepSeekSetup] = useState(false);

  useEffect(() => {
    // Check if DeepSeek API key is configured
    setShowDeepSeekSetup(!deepSeekService.getApiKey());
  }, []);

  const handleCaseSubmission = async (caseData: any) => {
    // Simulate case submission (in real app, this would save to database)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentCase(caseData);
    setCurrentView("case-submitted");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNewCase={() => setCurrentView("new-case")} />;
      case "new-case":
        return (
          <NewCase
            onComplete={handleCaseSubmission}
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
      case "case-submitted":
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Case Successfully Submitted!</h2>
                <p className="text-muted-foreground">
                  Your case "{currentCase?.title}" has been processed and the lawsuit document has been generated.
                </p>
              </div>
              <div className="bg-muted/30 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-3">Next Steps:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                    Review the generated lawsuit document carefully
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                    Make any necessary edits or customizations
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                    Consult with a legal professional before filing
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                    File the lawsuit with the appropriate court
                  </li>
                </ul>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setCurrentView("lawsuit-editor");
                  }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Document
                </button>
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z" />
                  </svg>
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onNewCase={() => setCurrentView("new-case")} />;
    }
  };

  if (showDeepSeekSetup) {
    return (
      <div className="min-h-screen bg-background">
        <DeepSeekSetup onSetupComplete={() => setShowDeepSeekSetup(false)} />
      </div>
    );
  }

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
