import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";


export default function Wrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex justify-between items-center w-full mr-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </div>
        <Link href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z"/></svg>
        </Link>
        </div>
      </header>
      <div className="flex overflow-x-hidden flex-1 flex-col gap-4 p-4 pt-0">
      {children}
      </div>
    </SidebarInset>
  </SidebarProvider>

  );
}
