
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Site } from "@/types/site";
import AddSiteDialog from "@/components/site-management/AddSiteDialog";
import SitesGrid from "@/components/site-management/SitesGrid";
import { useToast } from "@/hooks/use-toast";

// Sample data - in a real app, this would come from your backend
const initialSites: Site[] = [
  {
    id: "1",
    name: "My Portfolio",
    domain: "portfolio.com",
    status: "active",
    createdAt: "2024-04-01",
    lastUpdated: "2024-04-19"
  },
  {
    id: "2",
    name: "Company Blog",
    domain: "blog.company.com",
    status: "active",
    createdAt: "2024-04-10",
    lastUpdated: "2024-04-18"
  },
  {
    id: "3",
    name: "Product Landing Page",
    status: "pending",
    createdAt: "2024-04-19",
    lastUpdated: "2024-04-19"
  }
];

const SiteManagement = () => {
  const [sites, setSites] = useState<Site[]>(initialSites);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddSite = (siteName: string) => {
    const newSite: Site = {
      id: `${sites.length + 1}`,
      name: siteName,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setSites([...sites, newSite]);
    toast({
      title: "Site Created",
      description: `"${siteName}" has been created successfully.`,
    });
  };

  const handleDeleteSite = (siteId: string) => {
    const siteToDelete = sites.find(site => site.id === siteId);
    setSites(sites.filter(site => site.id !== siteId));
    
    toast({
      title: "Site Deleted",
      description: siteToDelete ? `"${siteToDelete.name}" has been deleted.` : "Site has been deleted.",
    });
  };

  const handleManageSite = (site: Site) => {
    navigate(`/site-details/${site.id}`, { state: { site } });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Management</h1>
        <AddSiteDialog onAddSite={handleAddSite} />
      </div>
      <SitesGrid
        sites={sites}
        onManageSite={handleManageSite}
        onDeleteSite={handleDeleteSite}
      />
    </div>
  );
};

export default SiteManagement;
