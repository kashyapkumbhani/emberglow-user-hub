
import { File, FileIcon, FolderIcon, Image, Trash2, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "image" | "folder";
  size?: string;
  lastModified?: string;
}

const initialFiles: FileItem[] = [
  { id: "1", name: "index.html", type: "file", size: "12 KB", lastModified: "Today" },
  { id: "2", name: "styles.css", type: "file", size: "4 KB", lastModified: "Today" },
  { id: "3", name: "script.js", type: "file", size: "8 KB", lastModified: "Yesterday" },
  { id: "4", name: "images", type: "folder", lastModified: "Last week" },
  { id: "5", name: "logo.png", type: "image", size: "24 KB", lastModified: "Yesterday" },
  { id: "6", name: "banner.jpg", type: "image", size: "120 KB", lastModified: "3 days ago" },
];

const SiteManagement = () => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFile, setDraggedFile] = useState<FileItem | null>(null);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const handleFileDragStart = (file: FileItem) => {
    setDraggedFile(file);
  };

  const handleFileDragEnd = () => {
    setDraggedFile(null);
  };

  const handleDeleteSelected = () => {
    setFiles(files.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const handleSelectFile = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  const handleFilePreview = (file: FileItem) => {
    setPreviewFile(file);
  };

  const FileTypeIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "file":
        return <FileIcon className="h-4 w-4 text-blue-500" />;
      case "image":
        return <Image className="h-4 w-4 text-green-500" />;
      case "folder":
        return <FolderIcon className="h-4 w-4 text-orange-400" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Site Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button variant="default">
            Create New File
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>File Manager</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDeleteSelected}
                  disabled={selectedFiles.length === 0}
                  className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={`grid grid-cols-1 gap-4 ${isDragging ? 'bg-secondary/50' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  // Handle file drop logic here
                }}
              >
                <div className="flex items-center gap-4 rounded-md bg-secondary/50 p-3 text-sm font-medium">
                  <div className="w-6"></div>
                  <div className="flex-1">Name</div>
                  <div className="w-24 text-right">Size</div>
                  <div className="w-32 text-right">Last Modified</div>
                </div>
                
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center gap-4 rounded-md p-3 text-sm transition-colors hover:bg-secondary/50 ${
                      selectedFiles.includes(file.id) ? 'bg-secondary' : ''
                    } ${draggedFile?.id === file.id ? 'opacity-50' : ''}`}
                    draggable
                    onDragStart={() => handleFileDragStart(file)}
                    onDragEnd={handleFileDragEnd}
                    onClick={() => handleFilePreview(file)}
                  >
                    <div className="w-6">
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                    <div className="flex flex-1 items-center gap-2">
                      <FileTypeIcon type={file.type} />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <div className="w-24 text-right text-gray-500">{file.size || "-"}</div>
                    <div className="w-32 text-right text-gray-500">{file.lastModified}</div>
                  </div>
                ))}
                
                {files.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="rounded-full bg-secondary p-4">
                      <FolderIcon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No files yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload files to get started
                    </p>
                    <Button className="mt-4">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {previewFile ? (
                <div className="animate-fade-in">
                  {previewFile.type === "image" ? (
                    <div className="overflow-hidden rounded-md border">
                      <div className="aspect-video w-full bg-secondary/50 flex items-center justify-center">
                        <Image className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{previewFile.name}</h3>
                        <p className="text-xs text-gray-500">
                          {previewFile.size} • Last modified {previewFile.lastModified}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">Preview</Button>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    </div>
                  ) : previewFile.type === "file" ? (
                    <div className="overflow-hidden rounded-md border">
                      <div className="aspect-video w-full bg-secondary/50 flex items-center justify-center">
                        <FileIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{previewFile.name}</h3>
                        <p className="text-xs text-gray-500">
                          {previewFile.size} • Last modified {previewFile.lastModified}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">Edit</Button>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-md border">
                      <div className="aspect-video w-full bg-secondary/50 flex items-center justify-center">
                        <FolderIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium">{previewFile.name}</h3>
                        <p className="text-xs text-gray-500">
                          Folder • Last modified {previewFile.lastModified}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm">Open</Button>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-secondary p-4">
                    <File className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No file selected</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select a file to preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteManagement;
