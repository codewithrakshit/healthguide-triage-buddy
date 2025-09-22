import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Clock, 
  Stethoscope, 
  Heart, 
  Phone, 
  Copy,
  ExternalLink,
  Shield
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TriageResultProps {
  assessment: {
    summary: string;
    triageLevel: "EMERGENCY" | "URGENT" | "PRIMARY" | "SELF-CARE";
    redFlags: string[];
    differential: { diagnosis: string; confidence: number; rationale: string }[];
    nextSteps: string[];
    monitoring: string;
    education: string;
    sources: string[];
    clinicianMessage: string;
  };
}

const TriageResult = ({ assessment }: TriageResultProps) => {
  const getTriageColor = (level: string) => {
    switch (level) {
      case "EMERGENCY": return "emergency";
      case "URGENT": return "urgent";
      case "PRIMARY": return "primary-care";
      case "SELF-CARE": return "self-care";
      default: return "primary";
    }
  };

  const getTriageIcon = (level: string) => {
    switch (level) {
      case "EMERGENCY": return AlertTriangle;
      case "URGENT": return Clock;
      case "PRIMARY": return Stethoscope;
      case "SELF-CARE": return Heart;
      default: return Stethoscope;
    }
  };

  const getTriageDescription = (level: string) => {
    switch (level) {
      case "EMERGENCY": return "Seek emergency care immediately";
      case "URGENT": return "Seek urgent care within 24 hours";
      case "PRIMARY": return "Schedule with primary care within 48-72 hours";
      case "SELF-CARE": return "Monitor symptoms and provide self-care";
      default: return "";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Information copied successfully",
    });
  };

  const TriageIcon = getTriageIcon(assessment.triageLevel);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Emergency Alert */}
      {assessment.triageLevel === "EMERGENCY" && (
        <Alert className="border-emergency bg-emergency/10">
          <Phone className="h-4 w-4" />
          <AlertDescription className="text-emergency font-semibold">
            Call 911 immediately or go to the nearest emergency room. Do not delay seeking emergency medical care.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Assessment Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TriageIcon className="w-6 h-6" />
              <span>Medical Assessment Result</span>
            </CardTitle>
            <Badge 
              variant="outline" 
              className={`px-3 py-1 bg-${getTriageColor(assessment.triageLevel)} text-white border-${getTriageColor(assessment.triageLevel)}`}
            >
              {assessment.triageLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Summary</h3>
            <p className="text-muted-foreground">{assessment.summary}</p>
          </div>

          {/* Triage Recommendation */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Recommendation</h3>
            <p className="text-foreground font-medium">{getTriageDescription(assessment.triageLevel)}</p>
          </div>

          {/* Red Flags */}
          {assessment.redFlags.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-emergency" />
                <span>Warning Signs - Seek Emergency Care If:</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                {assessment.redFlags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Differential Diagnoses */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Possible Conditions</h3>
            <div className="space-y-3">
              {assessment.differential.map((diff, index) => (
                <div key={index} className="border border-border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{diff.diagnosis}</span>
                    <Badge variant="outline">{diff.confidence}% confidence</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{diff.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              {assessment.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Monitoring */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">What to Monitor</h3>
            <p className="text-muted-foreground">{assessment.monitoring}</p>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Patient Education</h3>
            <p className="text-muted-foreground">{assessment.education}</p>
          </div>

          {/* Clinician Message */}
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
              <Copy className="w-4 h-4" />
              <span>Message for Healthcare Provider</span>
            </h3>
            <p className="text-muted-foreground mb-3">{assessment.clinicianMessage}</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => copyToClipboard(assessment.clinicianMessage)}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Message
            </Button>
          </div>

          {/* Sources */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">Evidence Sources</h3>
            <div className="space-y-1">
              {assessment.sources.map((source, index) => (
                <a 
                  key={index}
                  href={source}
                  className="text-primary hover:underline text-sm flex items-center space-x-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{source}</span>
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Emergency Contacts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Button variant="emergency" size="lg" className="w-full mb-2">
              <Phone className="w-4 h-4 mr-2" />
              911
            </Button>
            <p className="text-sm text-muted-foreground">Emergency Services</p>
          </div>
          <div className="text-center">
            <Button variant="urgent" size="lg" className="w-full mb-2">
              <Phone className="w-4 h-4 mr-2" />
              1-800-222-1222
            </Button>
            <p className="text-sm text-muted-foreground">Poison Control</p>
          </div>
          <div className="text-center">
            <Button variant="primary-care" size="lg" className="w-full mb-2">
              <Phone className="w-4 h-4 mr-2" />
              988
            </Button>
            <p className="text-sm text-muted-foreground">Crisis Lifeline</p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-sm">
          <strong>Medical Disclaimer:</strong> This assessment is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for medical concerns. In case of emergency, call 911 immediately.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TriageResult;