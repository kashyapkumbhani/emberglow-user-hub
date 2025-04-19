
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  PlusCircle, 
  RefreshCw, 
  Settings, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  ChevronRight 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Domain {
  id: string;
  name: string;
  type: "custom" | "subdomain";
  status: "active" | "pending" | "error";
  ssl: boolean;
  lastChecked: string;
  dnsRecords?: {
    type: string;
    name: string;
    value: string;
    status: "verified" | "pending" | "error";
  }[];
}

const domains: Domain[] = [
  {
    id: "1",
    name: "yourdomain.com",
    type: "custom",
    status: "active",
    ssl: true,
    lastChecked: "10 minutes ago",
    dnsRecords: [
      {
        type: "A",
        name: "@",
        value: "123.456.789.10",
        status: "verified",
      },
      {
        type: "CNAME",
        name: "www",
        value: "yourdomain.com",
        status: "verified",
      },
      {
        type: "TXT",
        name: "@",
        value: "v=spf1 include:_spf.example.com ~all",
        status: "verified",
      },
    ],
  },
  {
    id: "2",
    name: "another-domain.com",
    type: "custom",
    status: "pending",
    ssl: false,
    lastChecked: "30 minutes ago",
    dnsRecords: [
      {
        type: "A",
        name: "@",
        value: "123.456.789.10",
        status: "pending",
      },
      {
        type: "CNAME",
        name: "www",
        value: "another-domain.com",
        status: "error",
      },
    ],
  },
  {
    id: "3",
    name: "your-project.emberhub.app",
    type: "subdomain",
    status: "active",
    ssl: true,
    lastChecked: "1 hour ago",
  },
];

const DomainManagement = () => {
  const [domainsData, setDomainsData] = useState<Domain[]>(domains);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [newDomainType, setNewDomainType] = useState<"custom" | "subdomain">("custom");
  const [newDomainName, setNewDomainName] = useState("");
  const [isConfigureOpen, setIsConfigureOpen] = useState(false);
  const [isAddDomainOpen, setIsAddDomainOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<string | null>(null);

  const handleRefreshDomain = (domainId: string) => {
    setIsRefreshing(domainId);
    setTimeout(() => {
      setIsRefreshing(null);
      // Simulate DNS propagation for the pending domain
      if (domainId === "2") {
        setDomainsData(
          domainsData.map((domain) => {
            if (domain.id === "2") {
              return {
                ...domain,
                status: "active",
                ssl: true,
                dnsRecords: domain.dnsRecords?.map((record) => ({
                  ...record,
                  status: "verified",
                })),
              };
            }
            return domain;
          })
        );
      }
    }, 2000);
  };

  const handleAddDomain = () => {
    if (!newDomainName) return;
    
    const newDomain: Domain = {
      id: `${domainsData.length + 1}`,
      name: newDomainType === "custom" ? newDomainName : `${newDomainName}.emberhub.app`,
      type: newDomainType,
      status: newDomainType === "custom" ? "pending" : "active",
      ssl: newDomainType === "subdomain",
      lastChecked: "Just now",
      dnsRecords: newDomainType === "custom" ? [
        {
          type: "A",
          name: "@",
          value: "123.456.789.10",
          status: "pending",
        },
        {
          type: "CNAME",
          name: "www",
          value: newDomainName,
          status: "pending",
        },
      ] : undefined,
    };
    
    setDomainsData([...domainsData, newDomain]);
    setNewDomainName("");
    setIsAddDomainOpen(false);
  };

  const handleConfigureDomain = (domain: Domain) => {
    setSelectedDomain(domain);
    setIsConfigureOpen(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "active") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
          <CheckCircle className="h-3 w-3" />
          Active
        </span>
      );
    }
    if (status === "pending") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
          <AlertCircle className="h-3 w-3" />
          Pending
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
        <XCircle className="h-3 w-3" />
        Error
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Domain Management</h1>
        <Dialog open={isAddDomainOpen} onOpenChange={setIsAddDomainOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new domain</DialogTitle>
              <DialogDescription>
                Connect a custom domain or create a subdomain for your site.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <RadioGroup 
                value={newDomainType} 
                onValueChange={(value) => setNewDomainType(value as "custom" | "subdomain")}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="custom"
                    id="custom"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="custom"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Globe className="mb-3 h-6 w-6" />
                    Custom Domain
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="subdomain"
                    id="subdomain"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="subdomain"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Globe className="mb-3 h-6 w-6" />
                    Subdomain
                  </Label>
                </div>
              </RadioGroup>
              {newDomainType === "custom" ? (
                <div className="space-y-2">
                  <Label htmlFor="domain">Custom Domain</Label>
                  <Input
                    id="domain"
                    placeholder="yourdomain.com"
                    value={newDomainName}
                    onChange={(e) => setNewDomainName(e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <div className="flex">
                    <Input
                      id="subdomain"
                      placeholder="yoursite"
                      value={newDomainName}
                      onChange={(e) => setNewDomainName(e.target.value)}
                      className="rounded-r-none"
                    />
                    <div className="flex items-center rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground">
                      .emberhub.app
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDomainOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDomain}>Add Domain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {domainsData.map((domain) => (
          <Card key={domain.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-secondary p-2 text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">{domain.name}</div>
                    <div className="text-xs text-gray-500">
                      {domain.type === "custom" ? "Custom Domain" : "Subdomain"} • Last checked {domain.lastChecked}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={domain.status} />
                  {domain.ssl && (
                    <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                      <Shield className="h-3 w-3" />
                      SSL
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3">
                  <button
                    className="flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-secondary"
                    onClick={() => handleRefreshDomain(domain.id)}
                  >
                    {isRefreshing === domain.id ? (
                      <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-1.5 h-4 w-4" />
                    )}
                    Refresh DNS
                  </button>
                  <a 
                    href={`https://${domain.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-secondary"
                  >
                    <Globe className="mr-1.5 h-4 w-4" />
                    Visit Site
                  </a>
                </div>
                <button
                  className="flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-secondary"
                  onClick={() => handleConfigureDomain(domain)}
                >
                  <Settings className="mr-1.5 h-4 w-4" />
                  Configure
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </button>
              </div>
              
              {domain.type === "custom" && domain.dnsRecords && (
                <div className="border-t bg-secondary/30 px-4 py-3">
                  <div className="mb-2 text-sm font-medium">DNS Records</div>
                  <div className="space-y-2">
                    {domain.dnsRecords.map((record, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="rounded-md bg-gray-200 px-1.5 py-0.5 font-mono">
                          {record.type}
                        </span>
                        <span className="font-medium">{record.name}</span>
                        <span className="font-mono text-gray-600 truncate max-w-[200px]">
                          {record.value}
                        </span>
                        {record.status === "verified" ? (
                          <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                        ) : record.status === "pending" ? (
                          <AlertCircle className="h-3.5 w-3.5 text-yellow-600" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isConfigureOpen} onOpenChange={setIsConfigureOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Configure Domain</DialogTitle>
            <DialogDescription>
              {selectedDomain?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <Label className="font-medium">SSL Certificate</Label>
                <div className="flex items-center rounded-md border bg-secondary/30 p-3">
                  <div className="flex-1">
                    <div className="text-sm">Secure your site with SSL</div>
                    <div className="text-xs text-gray-500">
                      Provides encrypted connections to your site
                    </div>
                  </div>
                  <div className="ml-4">
                    {selectedDomain?.ssl ? (
                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <Button size="sm">Enable SSL</Button>
                    )}
                  </div>
                </div>
              </div>

              {selectedDomain?.type === "custom" && (
                <div className="space-y-2">
                  <Label className="font-medium">DNS Records</Label>
                  <div className="rounded-md border p-1">
                    <div className="grid grid-cols-4 gap-2 border-b bg-muted/50 p-2 text-xs font-medium">
                      <div>Type</div>
                      <div>Name</div>
                      <div>Value</div>
                      <div>Status</div>
                    </div>
                    {selectedDomain?.dnsRecords?.map((record, i) => (
                      <div key={i} className="grid grid-cols-4 gap-2 p-2 text-xs">
                        <div>{record.type}</div>
                        <div>{record.name}</div>
                        <div className="truncate">{record.value}</div>
                        <div>
                          {record.status === "verified" ? (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Verified
                            </span>
                          ) : record.status === "pending" ? (
                            <span className="flex items-center gap-1 text-yellow-600">
                              <AlertCircle className="h-3.5 w-3.5" />
                              Pending
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-3.5 w-3.5" />
                              Failed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="font-medium">Custom Headers</Label>
                <div className="rounded-md border p-3 text-sm">
                  <p className="text-gray-500">Configure custom HTTP headers for your domain.</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Add Custom Header
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Danger Zone</Label>
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                  <div className="text-sm font-medium text-red-600">Remove Domain</div>
                  <div className="mb-2 text-xs text-red-500">
                    This action cannot be undone. It will permanently remove this domain from your account.
                  </div>
                  <Button variant="destructive" size="sm">
                    Remove Domain
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigureOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsConfigureOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainManagement;
