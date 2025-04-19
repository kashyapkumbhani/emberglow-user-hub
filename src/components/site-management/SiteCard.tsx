
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Settings, Trash2 } from "lucide-react";
import { Site } from "@/types/site";

interface SiteCardProps {
  site: Site;
  onManage: (site: Site) => void;
  onDelete: (siteId: string) => void;
}

const SiteCard = ({ site, onManage, onDelete }: SiteCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-orange-500" />
          {site.name}
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onManage(site)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Manage
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(site.id)}
            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Domain:</span>
            <span className="font-medium">{site.domain || 'Not configured'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status:</span>
            <span className={`font-medium ${
              site.status === 'active' ? 'text-green-600' : 
              site.status === 'error' ? 'text-red-600' : 
              'text-orange-600'
            }`}>
              {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Last Updated:</span>
            <span className="font-medium">{site.lastUpdated}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteCard;
