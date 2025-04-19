
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import SiteCard from "@/components/site-management/SiteCard";
import { Site } from "@/types/site";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [isAddSiteOpen, setIsAddSiteOpen] = useState(false);
  const [newSiteName, setNewSiteName] = useState("");
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const handleAddSite = () => {
    if (!newSiteName) return;

    const newSite: Site = {
      id: `${sites.length + 1}`,
      name: newSiteName,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    setSites([...sites, newSite]);
    setNewSiteName("");
    setIsAddSiteOpen(false);
  };

  const handleDeleteSite = (siteId: string) => {
    setSites(sites.filter(site => site.id !== siteId));
  };

  const handleManageSite = (site: Site) => {
    setSelectedSite(site);
    // In a real app, this would navigate to the site's management page
    // You could use React Router to navigate to `/site-management/${site.id}`
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Management</h1>
        <Dialog open={isAddSiteOpen} onOpenChange={setIsAddSiteOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Site
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Site</DialogTitle>
              <DialogDescription>
                Give your new site a name to get started.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  placeholder="My Awesome Site"
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddSiteOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSite}>Create Site</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            onManage={handleManageSite}
            onDelete={handleDeleteSite}
          />
        ))}
      </div>
    </div>
  );
};

export default SiteManagement;
