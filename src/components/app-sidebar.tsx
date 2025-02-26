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
  Dices,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Fundamentals",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: " Imperative vs Declarative Programming",
          url: "/typesProgram",
        },
        {
          title: "Pure Functions",
          url: "/pureFunction",
        },
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
          title: "Components",
          url: "/comp",
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
      title: "Hooks",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Rules of Hooks",
          url: "/rulesHooks",
        },
        {
          title: "useId",
          url: "/useId",
        },
        {
          title: "Refs",
          url: "/refs",
        },
        {
          title: "Effects",
          url: "/effects",
        },
        {
          title: "Cleanup",
          url: "/cleanup",
        },
        {
          title: "Strict Mode",
          url: "/strictMode",
        },
        {
          title: "Custom Hooks",
          url: "/customHooks",
        },
        {
          title: "Fetching data",
          url: "/fetching",
        },
        {
          title: "Memoization",
          url: "/memoization",
        },
        {
          title: "UseMemo Hook",
          url: "/useMemoHook",
        },
      ],
    },
    {
      title: "V8",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Function optimization",
          url: "/functionOptimization",
        },
      ]
    },
    {
      title: "TypeScript",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Types -> Sets",
          url: "/sets",
        },
      ],
    },
    {
      title: "JavaScript",
      url: "#",
      icon: Dices,
      items: [
        {
          title: "Equal",
          url: "/equal",
        },
        {
          title: "Function Composition",
          url: "/functionComposition",
        },
        {
          title: "Reduce",
          url: "/reduce",
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
    <Sidebar collapsible="icon" {...props} className=" bg-white">
      <SidebarContent className=" bg-white">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
