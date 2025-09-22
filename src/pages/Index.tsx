import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HealthGuideHeader from "@/components/HealthGuideHeader";
import SymptomAssessment from "@/components/SymptomAssessment";
import TriageResult from "@/components/TriageResult";
import medicalHero from "@/assets/medical-hero.jpg";
import { 
  Stethoscope, 
  Clock, 
  Shield, 
  CheckCircle,
  Users,
  Heart
} from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<"welcome" | "assessment" | "result">("welcome");
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Mock assessment function - in real app this would call your AI backend
  const processAssessment = (data: any) => {
    // Simulate processing time
    setTimeout(() => {
      const mockResult = {
        summary: "Based on your symptoms, you may have a viral upper respiratory infection. However, given your fever and breathing concerns, medical evaluation is recommended.",
        triageLevel: "URGENT" as const,
        redFlags: [
          "Difficulty breathing or shortness of breath",
          "High fever above 103°F (39.4°C)",
          "Persistent chest pain",
          "Signs of dehydration"
        ],
        differential: [
          {
            diagnosis: "Viral Upper Respiratory Infection",
            confidence: 65,
            rationale: "Common symptoms of fever, cough, and fatigue align with viral illness"
          },
          {
            diagnosis: "Bacterial Pneumonia", 
            confidence: 25,
            rationale: "Breathing difficulty and fever could indicate lower respiratory infection"
          },
          {
            diagnosis: "COVID-19",
            confidence: 10,
            rationale: "Current symptoms overlap with COVID-19 presentation"
          }
        ],
        nextSteps: [
          "Seek urgent care evaluation within 24 hours",
          "Consider COVID-19 testing",
          "Monitor temperature and breathing closely",
          "Stay hydrated and rest"
        ],
        monitoring: "Check temperature every 4 hours, monitor breathing rate and effort, return immediately if breathing worsens or fever exceeds 103°F",
        education: "Viral respiratory infections typically resolve in 7-10 days with rest and supportive care. Bacterial infections may require antibiotic treatment determined by healthcare provider.",
        sources: [
          "https://www.cdc.gov/respiratory-viruses/",
          "https://www.who.int/news-room/fact-sheets/",
          "https://www.aafp.org/afp/topicModules/viewTopicModule.htm"
        ],
        clinicianMessage: "Patient, age " + data.age + ", " + data.sex + ", presenting with " + data.mainSymptom + " for " + data.onset + ". Severity " + data.severity + "/10. Vital signs: Temp " + (data.vitals.temperature || "unknown") + "°F. Recommending urgent evaluation for possible respiratory infection."
      };
      
      setAssessmentResult(mockResult);
      setCurrentView("result");
    }, 1500);
  };

  const renderWelcome = () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <HealthGuideHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-foreground leading-tight">
                  Get Trusted 
                  <span className="text-primary"> Medical Guidance</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  HealthGuide provides evidence-based symptom assessment and triage recommendations to help you make informed healthcare decisions.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="medical" 
                  size="lg" 
                  onClick={() => setCurrentView("assessment")}
                  className="text-lg px-8 py-4"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Start Symptom Assessment
                </Button>
                <p className="text-sm text-muted-foreground">
                  Free • Confidential • Evidence-Based
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={medicalHero} 
                alt="Medical professional with stethoscope - healthcare guidance" 
                className="rounded-lg shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional Clinical Decision Support
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system follows evidence-based medical guidelines to provide reliable triage and educational guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Immediate Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get instant triage recommendations based on your symptoms and medical history.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Evidence-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All recommendations follow established clinical guidelines from WHO, CDC, and medical societies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conservative approach prioritizes patient safety with clear emergency escalation guidelines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How HealthGuide Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Answer Questions", desc: "Provide detailed symptom and medical history" },
              { step: 2, title: "AI Analysis", desc: "Our system analyzes using clinical guidelines" },
              { step: 3, title: "Get Recommendations", desc: "Receive triage level and next steps" },
              { step: 4, title: "Share with Provider", desc: "Copy summary for healthcare professional" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Need Medical Guidance Now?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Don't wait when your health is concerned. Get evidence-based assessment and know when to seek care.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => setCurrentView("assessment")}
            className="text-lg px-8 py-4"
          >
            Start Your Assessment
          </Button>
        </div>
      </section>
    </div>
  );

  if (currentView === "welcome") return renderWelcome();
  if (currentView === "assessment") {
    return (
      <div className="min-h-screen bg-background">
        <HealthGuideHeader />
        <div className="container mx-auto px-4 py-8">
          <SymptomAssessment onSubmit={processAssessment} />
        </div>
      </div>
    );
  }
  if (currentView === "result" && assessmentResult) {
    return (
      <div className="min-h-screen bg-background">
        <HealthGuideHeader />
        <div className="container mx-auto px-4 py-8">
          <TriageResult assessment={assessmentResult} />
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView("welcome")}
              className="mr-4"
            >
              Start Over
            </Button>
            <Button 
              variant="medical" 
              onClick={() => setCurrentView("assessment")}
            >
              New Assessment
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
