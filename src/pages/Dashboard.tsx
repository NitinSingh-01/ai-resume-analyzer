import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/ScoreRing";
import { mockAnalyses, mockJobMatches } from "@/lib/mock-data";
import { Upload, BarChart3, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const latestAnalysis = mockAnalyses[0];
  const avgScore = Math.round(mockAnalyses.reduce((a, b) => a + b.score, 0) / mockAnalyses.length);
  const avgMatch = Math.round(mockJobMatches.reduce((a, b) => a + b.matchPercentage, 0) / mockJobMatches.length);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your resume overview.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          { label: "Resumes Analyzed", value: mockAnalyses.length, icon: BarChart3 },
          { label: "Avg. Resume Score", value: `${avgScore}/100`, icon: TrendingUp },
          { label: "Job Matches", value: mockJobMatches.length, icon: Briefcase },
          { label: "Avg. Match Rate", value: `${avgMatch}%`, icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="font-display text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Latest Analysis + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display">Latest Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {latestAnalysis ? (
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <ScoreRing score={latestAnalysis.score} label="Score" />
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">File</p>
                    <p className="font-medium">{latestAnalysis.fileName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience Level</p>
                    <p className="font-medium">{latestAnalysis.experienceLevel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top Skills</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {latestAnalysis.skills.slice(0, 5).map((s) => (
                        <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link to="/analysis">
                    <Button variant="outline" size="sm" className="mt-2">
                      View Full Analysis
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No analyses yet. Upload a resume to get started.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/upload" className="block">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Upload className="h-4 w-4" /> Upload Resume
              </Button>
            </Link>
            <Link to="/analysis" className="block">
              <Button className="w-full justify-start gap-2" variant="outline">
                <BarChart3 className="h-4 w-4" /> View Analyses
              </Button>
            </Link>
            <Link to="/job-match" className="block">
              <Button className="w-full justify-start gap-2" variant="outline">
                <Briefcase className="h-4 w-4" /> Match Jobs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
