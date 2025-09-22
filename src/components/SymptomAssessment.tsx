import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

interface SymptomData {
  age: string;
  sex: string;
  mainSymptom: string;
  onset: string;
  severity: string;
  associatedSymptoms: string[];
  vitals: {
    temperature: string;
    heartRate: string;
    bloodPressure: string;
  };
  comorbidities: string[];
  medications: string;
  allergies: string;
  recentTravel: string;
  location: string;
}

const SymptomAssessment = ({ onSubmit }: { onSubmit: (data: SymptomData) => void }) => {
  const [formData, setFormData] = useState<SymptomData>({
    age: "",
    sex: "",
    mainSymptom: "",
    onset: "",
    severity: "",
    associatedSymptoms: [],
    vitals: {
      temperature: "",
      heartRate: "",
      bloodPressure: ""
    },
    comorbidities: [],
    medications: "",
    allergies: "",
    recentTravel: "",
    location: ""
  });

  const associatedSymptomsList = [
    "Fever", "Rash", "Breathing difficulty", "Vomiting", "Bleeding", 
    "Altered mental status", "Dizziness", "Chest pain", "Abdominal pain"
  ];

  const comorbiditiesList = [
    "Diabetes", "Heart disease", "High blood pressure", "Immunosuppression", 
    "Pregnancy", "Asthma", "Kidney disease", "Cancer"
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      associatedSymptoms: checked 
        ? [...prev.associatedSymptoms, symptom]
        : prev.associatedSymptoms.filter(s => s !== symptom)
    }));
  };

  const handleComorbidityChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      comorbidities: checked 
        ? [...prev.comorbidities, condition]
        : prev.comorbidities.filter(c => c !== condition)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <span>Symptom Assessment</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Please provide detailed information about your symptoms. This assessment is for informational purposes only and does not replace professional medical advice.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select value={formData.sex} onValueChange={(value) => setFormData(prev => ({ ...prev, sex: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainSymptom">Main Symptom(s)</Label>
            <Textarea
              id="mainSymptom"
              value={formData.mainSymptom}
              onChange={(e) => setFormData(prev => ({ ...prev, mainSymptom: e.target.value }))}
              placeholder="Describe your main symptoms in detail"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="onset" className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>When did symptoms start?</span>
              </Label>
              <Input
                id="onset"
                value={formData.onset}
                onChange={(e) => setFormData(prev => ({ ...prev, onset: e.target.value }))}
                placeholder="e.g., 2 days ago, this morning"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="severity">Severity (1-10 scale)</Label>
              <Select value={formData.severity} onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Rate severity" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num <= 3 ? "(Mild)" : num <= 6 ? "(Moderate)" : "(Severe)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Associated Symptoms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {associatedSymptomsList.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.associatedSymptoms.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                  />
                  <Label htmlFor={symptom} className="text-sm">{symptom}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Vital Signs (if available)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°F)</Label>
                <Input
                  id="temperature"
                  value={formData.vitals.temperature}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    vitals: { ...prev.vitals, temperature: e.target.value }
                  }))}
                  placeholder="e.g., 98.6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                <Input
                  id="heartRate"
                  value={formData.vitals.heartRate}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    vitals: { ...prev.vitals, heartRate: e.target.value }
                  }))}
                  placeholder="e.g., 72"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input
                  id="bloodPressure"
                  value={formData.vitals.bloodPressure}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    vitals: { ...prev.vitals, bloodPressure: e.target.value }
                  }))}
                  placeholder="e.g., 120/80"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Pre-existing Conditions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {comorbiditiesList.map(condition => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={formData.comorbidities.includes(condition)}
                    onCheckedChange={(checked) => handleComorbidityChange(condition, checked as boolean)}
                  />
                  <Label htmlFor={condition} className="text-sm">{condition}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                placeholder="List all current medications and dosages"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Known Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="List any known allergies"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recentTravel">Recent Travel or Exposures</Label>
            <Input
              id="recentTravel"
              value={formData.recentTravel}
              onChange={(e) => setFormData(prev => ({ ...prev, recentTravel: e.target.value }))}
              placeholder="Any recent travel, sick contacts, animal exposure, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Location (for local resources)</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="City, State (optional - for local resource recommendations)"
            />
          </div>

          <Button type="submit" variant="medical" size="lg" className="w-full">
            Get Medical Assessment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SymptomAssessment;