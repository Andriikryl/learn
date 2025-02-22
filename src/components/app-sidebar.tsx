"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Learning team",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Fundamentals",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Hello World",
          url: "/hello",
        },
        {
          title: "Build react",
          url: "/build",
        },
        {
          title: "Jsx",
          url: "/jsx",
        },
        {
          title: "Syntax",
          url: "/syntax",
        },
        {
          title: "Props",
          url: "/props",
        },
        {
          title: "Fragments",
          url: "/fragments",
        },
        {
          title: "Mapping",
          url: "/mapping",
        },
        {
          title: "Keys",
          url: "/keys",
        },
        {
          title: "Conditional",
          url: "/conditional",
        },
        {
          title: "&& Operator",
          url: "/logicalAnd",
        },
        {
          title: "Ternary Operator",
          url: "/ternary",
        },
      ],
    },
    {
      title: "State",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Handlers",
          url: "/handlers",
        },
        {
          title: "useState",
          url: "/useState",
        },
        {
          title: "React Loop",
          url: "/loop",
        },
        {
          title: "Render",
          url: "/render",
        },
        {
          title: "Binding",
          url: "/binding",
        },
        {
          title: "Props vs. State",
          url: "/propsState",
        },
        {
          title: "Forms",
          url: "/forms",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
