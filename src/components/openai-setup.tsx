import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Key, AlertCircle, CheckCircle } from "lucide-react";
import { openAIService } from "@/lib/openai";

interface OpenAISetupProps {
  onSetupComplete: () => void;
}

export function OpenAISetup({ onSetupComplete }: OpenAISetupProps) {
  const [apiKey, setApiKey] = useState(openAIService.getApiKey() || '');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isValid, setIsValid] = useState(!!openAIService.getApiKey());

  const validateApiKey = async () => {
    if (!apiKey.trim()) {
      setValidationError('Please enter an API key');
      return;
    }

    setIsValidating(true);
    setValidationError('');

    try {
      openAIService.setApiKey(apiKey);
      
      // Test the API key with a simple request
      const testResponse = await openAIService.chat([
        { role: 'user', content: 'Hello' }
      ]);
      
      if (testResponse) {
        setIsValid(true);
        setValidationError('');
      }
    } catch (error: any) {
      setValidationError(error.message || 'Invalid API key or connection failed');
      setIsValid(false);
      openAIService.clearApiKey();
    } finally {
      setIsValidating(false);
    }
  };

  const handleContinue = () => {
    if (isValid) {
      onSetupComplete();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <Key className="w-5 h-5 mr-2" />
            OpenAI Setup
          </CardTitle>
          <CardDescription>
            Enter your OpenAI API key to enable AI-powered legal assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {isValid && (
            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>API key validated successfully!</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Button 
              onClick={validateApiKey} 
              disabled={isValidating || !apiKey.trim()}
              className="w-full"
            >
              {isValidating ? 'Validating...' : 'Validate API Key'}
            </Button>
            
            {isValid && (
              <Button onClick={handleContinue} className="w-full">
                Continue to Application
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a></p>
            <p>• Your API key is stored locally in your browser</p>
            <p>• We recommend connecting to Supabase for secure key storage</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}