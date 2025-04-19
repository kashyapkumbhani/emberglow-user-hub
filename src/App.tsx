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
import Security from "./pages/dashboard/Security";
import Support from "./pages/dashboard/Support";
import Templates from "./pages/dashboard/Templates";
import Billing from "./pages/dashboard/Billing";

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
              <Security />
            </DashboardLayout>
          } />
          <Route path="/support" element={
            <DashboardLayout>
              <Support />
            </DashboardLayout>
          } />
          <Route path="/templates" element={
            <DashboardLayout>
              <Templates />
            </DashboardLayout>
          } />
          <Route path="/billing" element={
            <DashboardLayout>
              <Billing />
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
