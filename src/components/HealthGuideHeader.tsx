import { Stethoscope, Shield, Users } from "lucide-react";

const HealthGuideHeader = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Stethoscope className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">HealthGuide</h1>
              <p className="text-sm text-muted-foreground">Clinical Decision Support Assistant</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Emergency: 911</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HealthGuideHeader;