
import React from "react";
import { Layout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Templates = () => {
  const templates = [
    {
      name: "Portfolio Basic",
      description: "Clean and minimal portfolio template",
      category: "Portfolio",
      preview: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      name: "Business Pro",
      description: "Professional business website template",
      category: "Business",
      preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      name: "E-commerce Plus",
      description: "Feature-rich online store template",
      category: "E-commerce",
      preview: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=250&q=60",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <Button>
          <Layout className="mr-2 h-4 w-4" />
          Create Custom Template
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={template.preview}
                alt={template.name}
                className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{template.description}</p>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                  {template.category}
                </span>
                <Button variant="outline" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
