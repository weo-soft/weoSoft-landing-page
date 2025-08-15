import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import { Repository } from "@/services/githubService";

interface ProjectCardProps {
  repository: Repository;
}

export const ProjectCard = ({ repository }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: 'bg-blue-500',
      JavaScript: 'bg-yellow-500',
      Python: 'bg-green-500',
      React: 'bg-cyan-500',
      Vue: 'bg-emerald-500',
      Java: 'bg-orange-500',
      'C#': 'bg-purple-500',
      Go: 'bg-cyan-600',
      Rust: 'bg-orange-600',
      PHP: 'bg-indigo-500',
    };
    return colors[language || ''] || 'bg-gray-500';
  };

  // Get project preview image based on repository name or use placeholder
  const getProjectImage = (repoName: string) => {
    const imageMap: Record<string, string> = {
      'cucumber-jvm': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop',
      'cucumber-js': 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=240&fit=crop',
      'cucumber-ruby': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=240&fit=crop',
      'gherkin': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=240&fit=crop',
    };
    return imageMap[repoName] || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=240&fit=crop';
  };

  return (
    <Card className="group h-full transition-all duration-300 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 border-border/50 bg-card overflow-hidden">
      {/* Project Preview Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <img 
          src={getProjectImage(repository.name)} 
          alt={`${repository.name} preview`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 bg-card/90 backdrop-blur-sm"
          onClick={() => window.open(repository.html_url, '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-card-foreground line-clamp-1">
          {repository.name}
        </CardTitle>
        {repository.description && (
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem]">
            {repository.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        {/* Project Details Section */}
        <div className="p-3 rounded-lg bg-muted/30 space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">Project Details</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>{repository.stargazers_count} stars</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              <span>{repository.forks_count} forks</span>
            </div>
            <div className="flex items-center gap-1 col-span-2">
              <Calendar className="h-3 w-3" />
              <span>Updated {formatDate(repository.updated_at)}</span>
            </div>
          </div>
        </div>

        {/* Language and Topics */}
        <div className="space-y-3">
          {repository.language && (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repository.language)}`} />
              <span className="text-sm font-medium text-muted-foreground">{repository.language}</span>
            </div>
          )}
          
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {repository.topics.slice(0, 4).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs px-2 py-1">
                  {topic}
                </Badge>
              ))}
              {repository.topics.length > 4 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{repository.topics.length - 4}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        {repository.homepage && (
          <div className="pt-2 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(repository.homepage!, '_blank')}
            >
              View Documentation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};