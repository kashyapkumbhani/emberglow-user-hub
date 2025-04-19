
import { Site } from "@/types/site";
import SiteCard from "./SiteCard";

interface SitesGridProps {
  sites: Site[];
  onManageSite: (site: Site) => void;
  onDeleteSite: (siteId: string) => void;
}

const SitesGrid = ({ sites, onManageSite, onDeleteSite }: SitesGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <SiteCard
          key={site.id}
          site={site}
          onManage={onManageSite}
          onDelete={onDeleteSite}
        />
      ))}
    </div>
  );
};

export default SitesGrid;
