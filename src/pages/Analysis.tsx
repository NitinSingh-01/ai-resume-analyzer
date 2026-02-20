import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/ScoreRing";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockAnalyses } from "@/lib/mock-data";
import { useState } from "react";
import { CheckCircle2, AlertCircle, Lightbulb, Target, FileText } from "lucide-react";

export default function Analysis() {
  const [selectedId, setSelectedId] = useState(mockAnalyses[0]?.id);
  const analysis = mockAnalyses.find((a) => a.id === selectedId) ?? mockAnalyses[0];

  if (!analysis) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">No Analyses Yet</h2>
          <p className="text-muted-foreground">Upload a resume to get your first AI analysis.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Resume Analysis</h1>
        <p className="text-muted-foreground mt-1">Detailed AI-powered breakdown of your resume.</p>
      </div>

      {/* Selector */}
      {mockAnalyses.length > 1 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {mockAnalyses.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                a.id === selectedId
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {a.fileName}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Score + Summary */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center pt-6">
            <ScoreRing score={analysis.score} size={140} label="Resume Score" />
            <div className="mt-6 w-full space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">ATS Compatibility</span>
                  <span className="font-medium">{analysis.atsCompatibility}%</span>
                </div>
                <Progress value={analysis.atsCompatibility} className="h-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Experience Level</p>
                <p className="font-medium">{analysis.experienceLevel}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Uploaded</p>
                <p className="font-medium">{analysis.uploadedAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Profile Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>

          {/* Skills */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success" /> Skills Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-success/10 text-success border-0">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" /> Missing Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((s) => (
                    <Badge key={s} variant="secondary" className="bg-warning/10 text-warning border-0">
                      {s}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" /> Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Keyword Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Keyword Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.keywordTips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{t}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
