
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Site } from "@/types/site";

interface AddSiteDialogProps {
  onAddSite: (siteName: string) => void;
}

const AddSiteDialog = ({ onAddSite }: AddSiteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSiteName, setNewSiteName] = useState("");

  const handleAddSite = () => {
    if (!newSiteName) return;
    onAddSite(newSiteName);
    setNewSiteName("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddSite}>Create Site</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSiteDialog;
