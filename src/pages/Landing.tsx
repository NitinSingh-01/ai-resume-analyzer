import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, Briefcase, Zap, Shield, ArrowRight } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Resume Parsing",
    desc: "Upload PDF or DOCX and our AI extracts every detail instantly.",
  },
  {
    icon: BarChart3,
    title: "Deep Analysis",
    desc: "Get a 0-100 score, ATS compatibility, and actionable improvement tips.",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    desc: "Paste any job description and see exactly how well you match.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    desc: "Powered by advanced AI for real-time analysis in seconds.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    desc: "Your data is encrypted and never shared with third parties.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold">ResumeAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Resume Intelligence
          </div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Land Your Dream Job with{" "}
            <span className="text-primary">AI-Driven</span> Resume Analysis
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your resume, get an instant score, identify gaps, and match with job descriptions — all powered by advanced AI.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="gap-2 text-base px-8">
                Start Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-base px-8">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-center mb-12">
            Everything You Need to Perfect Your Resume
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 ResumeAI. Built with intelligence.
        </div>
      </footer>
    </div>
  );
}
