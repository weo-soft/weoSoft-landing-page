export interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
    homepage: string | null;
  }
  
  export class GitHubService {
    private static readonly BASE_URL = 'https://api.github.com';
  
    static async getUserRepositories(username: string): Promise<Repository[]> {
      try {
        const response = await fetch(`${this.BASE_URL}/users/${username}/repos?sort=updated&per_page=50`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
  
        const repositories: Repository[] = await response.json();
        
        // Filter out forks and sort by stars
        return repositories
          .filter(repo => !repo.name.includes('.'))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
      }
    }
  
    static async checkUserExists(username: string): Promise<boolean> {
      try {
        const response = await fetch(`${this.BASE_URL}/users/${username}`);
        return response.ok;
      } catch (error) {
        console.error('Error checking user:', error);
        return false;
      }
    }
  }