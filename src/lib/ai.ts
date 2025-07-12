// AI Service for analyzing legal cases
export interface CaseAnalysis {
  strongPoints: string[];
  weakPoints: string[];
  recommendations: string[];
  legalGrounds: string[];
  successProbability: number;
}

export interface LegalReference {
  article: string;
  title: string;
  content: string;
  relevance: 'high' | 'medium' | 'low';
}

export interface LawsuitDraft {
  title: string;
  parties: {
    plaintiff: string;
    defendant: string;
  };
  facts: string;
  legalGrounds: string;
  reliefSought: string[];
  fullText: string;
}

// Mock AI service - in production, this would connect to OpenAI/Claude API
export const aiService = {
  async analyzeCase(
    caseExplanation: string, 
    documents: File[], 
    caseData: any
  ): Promise<CaseAnalysis> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis based on case content
    const hasTermination = caseExplanation.toLowerCase().includes('terminat') || 
                          caseExplanation.toLowerCase().includes('fire');
    const hasDiscrimination = caseExplanation.toLowerCase().includes('discriminat');
    const hasWageIssues = caseExplanation.toLowerCase().includes('wage') || 
                         caseExplanation.toLowerCase().includes('salary');

    return {
      strongPoints: [
        hasTermination ? "Clear violation of termination procedures under Article 67 of Kosovo Labor Law" : "Valid employment relationship documented",
        hasDiscrimination ? "Evidence of discriminatory treatment" : "Proper documentation available",
        "Witness testimonies support your case",
        hasWageIssues ? "Unpaid wages constitute clear legal violation" : "Employment contract terms were clear"
      ].slice(0, 3),
      weakPoints: [
        "Some documentation may need additional verification",
        "Timeline of events needs clarification",
        "Employer's defense arguments need to be anticipated"
      ],
      recommendations: [
        "Gather additional witness statements",
        "Collect all relevant employment records",
        "Document all damages and financial losses",
        "Consider mediation before proceeding to court"
      ],
      legalGrounds: [
        "Article 67 - Termination Procedures (Kosovo Labor Law)",
        "Article 24 - Equal Treatment (Kosovo Labor Law)",
        "Article 78 - Compensation for Damages (Kosovo Labor Law)"
      ],
      successProbability: hasTermination && hasDiscrimination ? 85 : hasTermination ? 75 : 65
    };
  },

  async getLegalReferences(analysis: CaseAnalysis): Promise<LegalReference[]> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      {
        article: "Article 67",
        title: "Termination of Employment Contract",
        content: "The employer may terminate the employment contract only for justified reasons specified in this law, with proper notice period and following due process procedures.",
        relevance: 'high'
      },
      {
        article: "Article 24", 
        title: "Principle of Equal Treatment",
        content: "All employees have the right to equal treatment regardless of race, color, sex, language, religion, political opinion, national origin, social origin, age, or disability.",
        relevance: 'high'
      },
      {
        article: "Article 78",
        title: "Compensation for Damages",
        content: "An employee who suffers damages due to unlawful termination is entitled to compensation including lost wages, benefits, and additional damages.",
        relevance: 'medium'
      },
      {
        article: "Article 45",
        title: "Notice Period Requirements", 
        content: "Minimum notice periods must be observed: 15 days for employment up to 6 months, 30 days for employment from 6 months to 2 years, 45 days for employment over 2 years.",
        relevance: 'medium'
      }
    ];
  },

  async generateLawsuit(
    caseData: any, 
    analysis: CaseAnalysis, 
    references: LegalReference[]
  ): Promise<LawsuitDraft> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const facts = `The Plaintiff was employed by the Defendant under an employment contract dated [Contract Date]. On [Termination Date], the Defendant unlawfully terminated the Plaintiff's employment without following proper procedures as required by Kosovo Labor Law. ${caseData.caseExplanation.substring(0, 200)}...`;
    
    const legalGrounds = analysis.legalGrounds.join('. ') + '. The termination violated fundamental principles of employment law and caused significant damages to the Plaintiff.';
    
    const reliefSought = [
      "Declaration that the termination was unlawful",
      "Reinstatement to the previous position",
      "Payment of lost wages and benefits",
      "Compensation for moral damages",
      "Legal costs and attorney fees"
    ];

    const fullText = `
BASIC COURT OF PRISTINA
CIVIL DIVISION

Plaintiff: ${caseData.clientName}
Address: [To be provided]
Represented by: [Attorney Name]

vs.

Defendant: [Company Name]
Address: [Company Address]

LAWSUIT
FOR WRONGFUL TERMINATION AND DAMAGES

FACTS:
${facts}

LEGAL GROUNDS:
${legalGrounds}

RELIEF SOUGHT:
${reliefSought.map(item => `• ${item}`).join('\n')}

WHEREFORE, Plaintiff respectfully requests that this Honorable Court grant the relief sought above and award such other relief as the Court deems just and proper.

Respectfully submitted,
[Attorney Signature]
[Attorney Name]
[Bar Number]
[Date]
    `.trim();

    return {
      title: `Lawsuit for Wrongful Termination - ${caseData.clientName} vs. [Company Name]`,
      parties: {
        plaintiff: caseData.clientName,
        defendant: "[Company Name - To be filled]"
      },
      facts,
      legalGrounds,
      reliefSought,
      fullText
    };
  }
};