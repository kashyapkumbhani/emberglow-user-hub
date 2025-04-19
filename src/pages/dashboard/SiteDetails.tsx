
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Site } from "@/types/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SiteDetails = () => {
  const { siteId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get site from location state or fetch it (in a real app)
  const [site, setSite] = useState<Site | null>(
    location.state?.site || null
  );
  
  const [siteName, setSiteName] = useState(site?.name || "");
  const [siteDomain, setSiteDomain] = useState(site?.domain || "");
  
  useEffect(() => {
    // In a real app, if we don't have the site data, fetch it from an API
    if (!site && siteId) {
      // Simulate fetching from API for this example
      // In a real app, you would use fetch or react-query here
      console.log(`Fetching site with ID: ${siteId}`);
      // For now, just navigate back if we don't have the site data
      navigate("/site-management");
    }
  }, [site, siteId, navigate]);
  
  if (!site) {
    return <div>Loading...</div>;
  }
  
  const handleSave = () => {
    // In a real app, save changes to the backend
    // For now, just show a toast
    toast({
      title: "Changes Saved",
      description: "Your site changes have been saved successfully.",
    });
  };
  
  const handleCancel = () => {
    navigate("/site-management");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate("/site-management")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sites
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Site Details</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Site Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName" 
                value={siteName} 
                onChange={(e) => setSiteName(e.target.value)} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="siteDomain">Domain</Label>
              <Input 
                id="siteDomain"
                placeholder="yourdomain.com" 
                value={siteDomain} 
                onChange={(e) => setSiteDomain(e.target.value)} 
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Status</Label>
              <div className={`text-sm font-medium py-2 px-3 rounded-md inline-block w-fit ${
                site.status === 'active' ? 'bg-green-100 text-green-800' : 
                site.status === 'error' ? 'bg-red-100 text-red-800' : 
                'bg-orange-100 text-orange-800'
              }`}>
                {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
              </div>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteDetails;
