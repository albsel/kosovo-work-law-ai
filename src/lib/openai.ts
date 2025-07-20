interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class DeepSeekService {
  private apiKey: string | null = null;

  constructor() {
    // Load API key from localStorage if available
    this.apiKey = localStorage.getItem('deepseek_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('deepseek_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('deepseek_api_key');
  }

  async chat(messages: DeepSeekMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not set');
    }

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature: 0.7,
          max_tokens: 1500,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'DeepSeek API request failed');
      }

      const data: DeepSeekResponse = await response.json();
      return data.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  async analyzeCase(caseExplanation: string, caseData: any): Promise<any> {
    const systemPrompt = `You are a Kosovo labor law expert assistant. Analyze the legal case and provide structured feedback including:
1. Strong points in the case
2. Weak points that need attention
3. Specific recommendations
4. Relevant legal grounds under Kosovo Labor Law
5. Success probability estimate (as percentage)

Focus specifically on Kosovo Labor Law and provide practical, actionable advice.`;

    const userPrompt = `Please analyze this employment case:

Client: ${caseData.clientName}
Case Type: ${caseData.caseType}
Description: ${caseExplanation}

Provide a detailed analysis focusing on Kosovo Labor Law requirements.`;

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const response = await this.chat(messages);
    
    // Parse the response to extract structured data
    // This is a simplified parser - in a real app you'd want more robust parsing
    return {
      aiResponse: response,
      // You could implement structured parsing here to extract specific fields
    };
  }

  async improveLawsuit(documentContent: string, userRequest: string): Promise<string> {
    const systemPrompt = `You are a legal document editor specializing in Kosovo Labor Law. Help improve lawsuit documents by:
1. Making language more precise and legal
2. Strengthening legal arguments
3. Ensuring compliance with Kosovo Labor Law
4. Improving document structure and clarity

Always maintain the formal legal document format and ensure all changes are legally sound.`;

    const userPrompt = `Current lawsuit document:
${documentContent}

User request: ${userRequest}

Please provide an improved version of the document addressing the user's request.`;

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return await this.chat(messages);
  }

  async chatAboutCase(conversationHistory: { role: string; content: string; }[], newMessage: string): Promise<string> {
    const systemPrompt = `You are a Kosovo labor law expert providing guidance on legal cases. Be helpful, professional, and provide specific advice based on Kosovo Labor Law. Keep responses concise but informative.`;

    const messages: DeepSeekMessage[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user', content: newMessage }
    ];

    return await this.chat(messages);
  }
}

export const deepSeekService = new DeepSeekService();