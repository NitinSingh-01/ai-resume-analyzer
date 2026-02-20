import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScoreRing } from "@/components/ScoreRing";
import { Badge } from "@/components/ui/badge";
import { mockJobMatches } from "@/lib/mock-data";
import { Briefcase, Loader2, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function JobMatch() {
  const [jobDesc, setJobDesc] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const latestMatch = mockJobMatches[0];

  const handleAnalyze = () => {
    if (!jobDesc.trim()) {
      toast({ title: "Missing input", description: "Please paste a job description.", variant: "destructive" });
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      toast({ title: "Match complete!", description: "See your results below." });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Job Match</h1>
        <p className="text-muted-foreground mt-1">Compare your resume against any job description.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Job Description</CardTitle>
            <CardDescription>Paste the full job description to analyze compatibility.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              className="min-h-[200px] resize-none"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={analyzing} className="mt-4 w-full">
              {analyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Briefcase className="mr-2 h-4 w-4" />}
              {analyzing ? "Analyzing..." : "Analyze Match"}
            </Button>
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {(showResult || mockJobMatches.length > 0) && latestMatch && (
            <>
              <Card>
                <CardContent className="flex items-center gap-6 pt-6">
                  <ScoreRing score={latestMatch.matchPercentage} label="Match" />
                  <div>
                    <h3 className="font-display text-xl font-bold">{latestMatch.jobTitle}</h3>
                    <p className="text-sm text-muted-foreground">{latestMatch.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">Analyzed {latestMatch.analyzedAt}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" /> Matching Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {latestMatch.matchingSkills.map((s) => (
                      <Badge key={s} variant="secondary" className="bg-success/10 text-success border-0">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" /> Missing Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {latestMatch.missingRequirements.map((s) => (
                      <Badge key={s} variant="secondary" className="bg-destructive/10 text-destructive border-0">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-accent" /> Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {latestMatch.recommendations.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{r}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Past Matches */}
      {mockJobMatches.length > 1 && (
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold mb-4">Past Job Matches</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockJobMatches.map((m) => (
              <Card key={m.id} className="hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <ScoreRing score={m.matchPercentage} size={50} strokeWidth={4} />
                    <span className="text-xs text-muted-foreground">{m.analyzedAt}</span>
                  </div>
                  <h3 className="font-display font-semibold">{m.jobTitle}</h3>
                  <p className="text-sm text-muted-foreground">{m.company}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
