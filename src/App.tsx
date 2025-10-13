import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import Patients from "./pages/Patients";
import BloodUnits from "./pages/BloodUnits";
import Requests from "./pages/Requests";
import Hospitals from "./pages/Hospitals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/blood-units" element={<BloodUnits />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
