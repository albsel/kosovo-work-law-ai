import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  MessageCircle, 
  BarChart3, 
  BookOpen, 
  FileText,
  CheckCircle,
  File
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NewCaseProps {
  onComplete: (caseData: any) => void;
  onBack: () => void;
}

type CaseStep = "metadata" | "upload" | "case" | "analyze" | "reference" | "lawsuit";

const steps = [
  { id: "metadata", title: "Case Details", icon: FileText },
  { id: "upload", title: "Upload Documents", icon: Upload },
  { id: "case", title: "Explain Case", icon: MessageCircle },
  { id: "analyze", title: "AI Analysis", icon: BarChart3 },
  { id: "reference", title: "Legal References", icon: BookOpen },
  { id: "lawsuit", title: "Generate Lawsuit", icon: FileText },
];

export function NewCase({ onComplete, onBack }: NewCaseProps) {
  const [currentStep, setCurrentStep] = useState<CaseStep>("metadata");
  const [caseData, setCaseData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    description: "",
    documents: [] as File[],
    caseExplanation: "",
    analysis: null,
    references: null,
    lawsuit: null
  });

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as CaseStep);
    } else {
      onComplete(caseData);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as CaseStep);
    } else {
      onBack();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "metadata":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Case Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Case Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Wrongful Termination Case"
                    value={caseData.title}
                    onChange={(e) => setCaseData({...caseData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Full name"
                    value={caseData.clientName}
                    onChange={(e) => setCaseData({...caseData, clientName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="email@example.com"
                    value={caseData.clientEmail}
                    onChange={(e) => setCaseData({...caseData, clientEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientPhone">Client Phone</Label>
                  <Input
                    id="clientPhone"
                    placeholder="+383 XX XXX XXX"
                    value={caseData.clientPhone}
                    onChange={(e) => setCaseData({...caseData, clientPhone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="description">Brief Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief overview of the case..."
                  value={caseData.description}
                  onChange={(e) => setCaseData({...caseData, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case "upload":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Upload Documents</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop your documents here</p>
                <p className="text-muted-foreground mb-4">
                  Upload employment contracts, termination letters, payslips, or any relevant documents
                </p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
              {caseData.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Uploaded Documents:</h4>
                  <div className="space-y-2">
                    {caseData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{file.name}</span>
                        <Badge variant="secondary">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "case":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Explain Your Case</h3>
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">AI Legal Assistant</p>
                    <p className="text-sm text-muted-foreground">
                      Please explain your case in detail. I'll analyze it according to Kosovo Work Law.
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder="Describe what happened, when it occurred, who was involved, and what outcome you're seeking..."
                  value={caseData.caseExplanation}
                  onChange={(e) => setCaseData({...caseData, caseExplanation: e.target.value})}
                  rows={8}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        );

      case "analyze":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Analysis</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Case Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-medium text-success mb-2">Strong Legal Grounds</h4>
                    <p className="text-sm">
                      Based on your case description and uploaded documents, there appear to be valid grounds for legal action under Kosovo Work Law.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Findings:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Potential violation of termination procedures (Article 67, Kosovo Labor Law)
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Insufficient notice period provided
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-success mr-2 mt-0.5 flex-shrink-0" />
                        Evidence suggests discriminatory practices
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "reference":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal References</h3>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Kosovo Labor Law Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border border-l-4 border-l-primary bg-primary/5">
                      <p className="font-medium">Article 67 - Termination Procedures</p>
                      <p className="text-sm text-muted-foreground">
                        Employer must provide written notice and valid reasons for termination...
                      </p>
                    </div>
                    <div className="p-3 border border-l-4 border-l-accent bg-accent/5">
                      <p className="font-medium">Article 24 - Equal Treatment</p>
                      <p className="text-sm text-muted-foreground">
                        All employees have the right to equal treatment regardless of...
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Precedent Cases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Case No. 123/2023 - Similar Termination Dispute</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Supreme Court ruling on wrongful termination with similar circumstances
                      </p>
                      <Badge variant="secondary">Plaintiff Won</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "lawsuit":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Generated Lawsuit Draft</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Lawsuit Document</span>
                    <Badge className="bg-success text-success-foreground">
                      Ready for Review
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    AI has generated a complete lawsuit draft based on your case
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg bg-muted/30 max-h-96 overflow-y-auto">
                    <div className="space-y-4 text-sm">
                      <div className="text-center">
                        <h4 className="font-bold">BASIC COURT OF PRISTINA</h4>
                        <h4 className="font-bold">CIVIL DIVISION</h4>
                      </div>
                      
                      <div>
                        <p><strong>Plaintiff:</strong> {caseData.clientName}</p>
                        <p><strong>Address:</strong> [Address to be filled]</p>
                        <p><strong>Represented by:</strong> [Attorney Name]</p>
                      </div>

                      <div>
                        <p><strong>Defendant:</strong> [Company Name]</p>
                        <p><strong>Address:</strong> [Company Address]</p>
                      </div>

                      <div className="text-center">
                        <h5 className="font-bold">LAWSUIT</h5>
                        <h5 className="font-bold">FOR WRONGFUL TERMINATION AND DAMAGES</h5>
                      </div>

                      <div>
                        <p><strong>FACTS:</strong></p>
                        <p className="text-muted-foreground">
                          The plaintiff was employed by the defendant company under an employment contract dated [Date]. 
                          On [Termination Date], the defendant unlawfully terminated the plaintiff's employment in violation 
                          of Article 67 of the Kosovo Labor Law...
                        </p>
                      </div>

                      <div>
                        <p><strong>LEGAL GROUNDS:</strong></p>
                        <p className="text-muted-foreground">
                          The termination violates Article 67 of the Kosovo Labor Law, which requires proper notice and 
                          valid reasons for termination. The defendant failed to comply with these requirements...
                        </p>
                      </div>

                      <div>
                        <p><strong>RELIEF SOUGHT:</strong></p>
                        <ul className="list-disc list-inside text-muted-foreground">
                          <li>Reinstatement to previous position</li>
                          <li>Payment of lost wages and benefits</li>
                          <li>Compensation for damages</li>
                          <li>Legal costs and attorney fees</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button variant="outline" onClick={() => onComplete(caseData)}>
                      <FileText className="w-4 h-4 mr-2" />
                      Edit Document
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline">Save Draft</Button>
                      <Button>Download PDF</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-2xl font-bold">New Case</h2>
            <p className="text-muted-foreground">Create a new work law case with AI assistance</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} />
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs
                    ${index <= currentStepIndex 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"}
                  `}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-center max-w-16">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStepIndex === steps.length - 1 ? "Complete Case" : "Continue"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}