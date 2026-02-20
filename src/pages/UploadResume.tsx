import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFile = (f: File) => {
    if (!validTypes.includes(f.type)) {
      toast({ title: "Invalid file", description: "Please upload a PDF or DOCX file.", variant: "destructive" });
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 10MB.", variant: "destructive" });
      return;
    }
    setFile(f);
    setDone(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // Mock upload — will be replaced with real backend
    setTimeout(() => {
      setUploading(false);
      setDone(true);
      toast({ title: "Resume uploaded!", description: "AI analysis is starting..." });
      setTimeout(() => navigate("/analysis"), 1500);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Upload Resume</h1>
        <p className="text-muted-foreground mt-1">Upload your PDF or DOCX resume for AI analysis.</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="font-display">Resume File</CardTitle>
          <CardDescription>Drag & drop or click to browse. Supports PDF and DOCX (max 10MB).</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition-colors ${
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {done ? (
              <CheckCircle2 className="h-12 w-12 text-success mb-3" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground mb-3" />
            )}
            <p className="font-medium">{done ? "Upload complete!" : "Drop your resume here"}</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
          </div>

          {file && !done && (
            <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setFile(null); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {file && !done && (
            <Button onClick={handleUpload} disabled={uploading} className="mt-4 w-full">
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {uploading ? "Analyzing..." : "Upload & Analyze"}
            </Button>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
