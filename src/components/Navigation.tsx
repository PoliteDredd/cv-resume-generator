import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, FileText, History } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  activeView: "create" | "history";
  onViewChange: (view: "create" | "history") => void;
}

const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CVG
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "create" ? "default" : "ghost"}
              onClick={() => onViewChange("create")}
            >
              <FileText className="w-4 h-4 mr-2" />
              Create Resume
            </Button>
            <Button
              variant={activeView === "history" ? "default" : "ghost"}
              onClick={() => onViewChange("history")}
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
