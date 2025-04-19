import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import SiteManagement from "./pages/dashboard/SiteManagement";
import DomainManagement from "./pages/dashboard/DomainManagement";
import Analytics from "./pages/dashboard/Analytics";
import AccountSettings from "./pages/dashboard/AccountSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/site-management" element={
            <DashboardLayout>
              <SiteManagement />
            </DashboardLayout>
          } />
          <Route path="/domain-management" element={
            <DashboardLayout>
              <DomainManagement />
            </DashboardLayout>
          } />
          <Route path="/analytics" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <AccountSettings />
            </DashboardLayout>
          } />
          <Route path="/security" element={
            <DashboardLayout>
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Security</h1>
                <p>Security content will be displayed here.</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/support" element={
            <DashboardLayout>
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Support</h1>
                <p>Support content will be displayed here.</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/templates" element={
            <DashboardLayout>
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
                <p>Templates content will be displayed here.</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/billing" element={
            <DashboardLayout>
              <div className="animate-fade-in space-y-6">
                <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
                <p>Billing content will be displayed here.</p>
              </div>
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
