import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { GitHubService, Repository } from "@/services/githubService";
import { useToast } from "@/hooks/use-toast";
import { Github, Code2 } from "lucide-react";

const Index = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadProjects = async () => {
    try {
      const repos = await GitHubService.getUserRepositories("weo-soft");
      setRepositories(repos);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load repositories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--gradient-subtle)]">
      {/* Header */}
      <header className="py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-primary/10">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              My Projects
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of open source projects and contributions focused on behavior-driven development and testing tools.
          </p>
        </div>
      </header>

      {/* Results Section */}
      {!isLoading && repositories.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Github className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">
                Featured Projects ({repositories.length})
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {repositories.map((repo) => (
                <ProjectCard key={repo.id} repository={repo} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto mb-4">
              <Github className="h-8 w-8 text-muted-foreground animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Loading projects...</h3>
            <p className="text-muted-foreground">
              Fetching the latest repositories from GitHub.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
