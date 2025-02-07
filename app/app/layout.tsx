import Header from "@/components/Layout/Header";
import SideNavbar from "@/components/Layout/SideNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col">
      <Header />
      <main className="min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex overflow-clip">
        <SidebarProvider>
          <SideNavbar />
          <main className="max-h-[calc(100vh-64px)] flex justify-between w-full">
            {children}
          </main>
        </SidebarProvider>
      </main>
    </div>
  );
}
