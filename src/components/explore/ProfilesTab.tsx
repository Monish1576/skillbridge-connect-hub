
import { Button } from "@/components/ui/button";
import { ProfileCard } from "./ProfileCard";

interface Profile {
  id: string;
  full_name: string;
  role: string;
  department: string;
  avatar_url?: string;
  skills?: string[];
}

interface ProfilesTabProps {
  filteredProfiles: Profile[];
  clearFilters: () => void;
}

export function ProfilesTab({ filteredProfiles, clearFilters }: ProfilesTabProps) {
  if (filteredProfiles.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search or filters.</p>
        <Button 
          variant="outline" 
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProfiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}
