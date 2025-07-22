import { Home, FileText, Scale, Settings, User, PlusCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export type AppView = "dashboard" | "new-case" | "lawsuit-editor" | "case-submitted";

interface AppSidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "New Case",
    url: "new-case",
    icon: PlusCircle,
  },
  {
    title: "All Cases",
    url: "cases",
    icon: FileText,
  },
  {
    title: "Legal References",
    url: "references",
    icon: Scale,
  },
];

const bottomItems = [
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-primary to-primary-hover">
        {/* Logo Section */}
        <div className="p-4 border-b border-primary-foreground/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Scale className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h2 className="text-primary-foreground font-semibold text-sm">
                LegalAI
              </h2>
              <p className="text-primary-foreground/70 text-xs">
                Work Law Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/70 text-xs font-medium px-4 py-2">
            NAVIGATION
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.url as AppView)}
                    className={`
                      w-full justify-start transition-all duration-200
                      ${currentView === item.url
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="ml-3">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t border-primary-foreground/20">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground w-full justify-start"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="ml-3">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}