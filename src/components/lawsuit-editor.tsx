import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Share, 
  MessageCircle, 
  Edit, 
  Save,
  FileText,
  Send,
  RefreshCw
} from "lucide-react";

interface LawsuitEditorProps {
  caseData: any;
  onClose: () => void;
}

export function LawsuitEditor({ caseData, onClose }: LawsuitEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [documentContent, setDocumentContent] = useState(`BASIC COURT OF PRISTINA
CIVIL DIVISION

Plaintiff: ${caseData?.clientName || "[Client Name]"}
Address: [Address to be filled]
Phone: ${caseData?.clientPhone || "[Phone Number]"}
Email: ${caseData?.clientEmail || "[Email Address]"}
Represented by: [Attorney Name]

v.

Defendant: [Company Name]
Address: [Company Address]
Registration Number: [Company Registration]

LAWSUIT
FOR WRONGFUL TERMINATION AND DAMAGES

TO THE HONORABLE COURT:

FACTS:

The plaintiff was employed by the defendant company under an employment contract dated [Date]. On [Termination Date], the defendant unlawfully terminated the plaintiff's employment in violation of Article 67 of the Kosovo Labor Law.

${caseData?.description || "[Case description]"}

The termination was carried out without proper notice and without valid reasons as required by law. The defendant failed to follow the mandatory procedures for employee termination as outlined in the Kosovo Labor Law.

LEGAL GROUNDS:

1. Article 67 of the Kosovo Labor Law - Termination Procedures
   The defendant violated the mandatory termination procedures by failing to provide adequate notice and valid reasons for termination.

2. Article 24 of the Kosovo Labor Law - Equal Treatment
   The termination appears to be discriminatory and violates the plaintiff's right to equal treatment in the workplace.

3. Article 69 of the Kosovo Labor Law - Compensation Rights
   The plaintiff is entitled to compensation for wrongful termination and damages suffered.

EVIDENCE:

The following evidence supports this lawsuit:
- Employment contract
- Termination notice (if any)
- Payroll records
- Witness testimonies
- Company policies and procedures

RELIEF SOUGHT:

WHEREFORE, the plaintiff respectfully requests that this Honorable Court:

1. Find that the defendant's termination of the plaintiff was wrongful and in violation of Kosovo Labor Law;
2. Order the defendant to reinstate the plaintiff to their previous position with full benefits;
3. Award the plaintiff compensation for lost wages from the date of termination to the date of reinstatement;
4. Award the plaintiff damages for emotional distress and hardship caused by the wrongful termination;
5. Award the plaintiff attorney's fees and costs incurred in bringing this action;
6. Grant such other relief as the Court deems just and proper.

Respectfully submitted,

[Attorney Name]
[Attorney Title]
[Bar Number]
[Law Firm Name]
[Address]
[Phone]
[Email]

Attorney for Plaintiff

[Date]`);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "I've generated your lawsuit document. You can review and edit it, or ask me to make specific changes. How can I help you improve this document?"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      type: "user",
      content: newMessage
    }]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        type: "ai",
        content: "I understand your request. Let me update the document accordingly. The changes have been applied to strengthen the legal arguments."
      }]);
    }, 1000);

    setNewMessage("");
  };

  const handleExport = (type: string) => {
    // In a real app, this would handle actual file generation
    console.log(`Exporting as ${type}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Lawsuit Editor</h2>
            <p className="text-muted-foreground">Review and edit your generated lawsuit document</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-success text-success-foreground">
            Draft Ready
          </Badge>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? "Preview" : "Edit"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Lawsuit Document
                </span>
                <div className="flex items-center space-x-2">
                  {isEditing && (
                    <Button size="sm" variant="outline">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardTitle>
              <CardDescription>
                Generated lawsuit document for {caseData?.clientName || "Client"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={documentContent}
                  onChange={(e) => setDocumentContent(e.target.value)}
                  className="min-h-[600px] font-mono text-sm"
                />
              ) : (
                <div className="prose prose-sm max-w-none p-4 border rounded-lg bg-muted/30 min-h-[600px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {documentContent}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export & Actions</CardTitle>
              <CardDescription>
                Download, print, or share your lawsuit document
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" onClick={() => handleExport("pdf")}>
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => handleExport("word")}>
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </Button>
                <Button variant="outline" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={() => handleExport("email")}>
                  <Send className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Assistant */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                AI Assistant
              </CardTitle>
              <CardDescription>
                Ask for document improvements or legal advice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-3">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.type === "ai"
                        ? "bg-primary/10 text-primary-foreground"
                        : "bg-muted ml-6"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask for changes to the document..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Case Information */}
          <Card>
            <CardHeader>
              <CardTitle>Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-sm text-muted-foreground">{caseData?.clientName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Case Title</p>
                <p className="text-sm text-muted-foreground">{caseData?.title || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant="secondary">Draft Review</Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share className="w-4 h-4 mr-2" />
                Share with Client
              </Button>
              <Button className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Finalize & Submit
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}