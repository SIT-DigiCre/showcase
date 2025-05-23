"use client";

import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import { Menu } from "@/components/ui/menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarRail,
  SidebarSection,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  IconChevronLgDown,
  IconDashboard,
  IconLogout,
  IconPerson,
  IconPlus,
  IconSearch,
  IconSettings,
  IconToolbox,
} from "justd-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { data } = useSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link
          className="flex items-center gap-x-2 group-data-[collapsible=dock]:size-10 group-data-[collapsible=dock]:justify-center"
          href="/"
        >
          <IconToolbox className="size-5" />
          <SidebarLabel className="font-medium">Showcase</SidebarLabel>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarSection title="Menu">
          <SidebarItem tooltip="Timeline" isCurrent={pathname === "/"} href="/">
            <IconDashboard />
            <SidebarLabel>Timeline</SidebarLabel>
          </SidebarItem>
          <SidebarItem
            tooltip="Search"
            isCurrent={pathname.startsWith("/search")}
            href="/search"
          >
            <IconSearch />
            <SidebarLabel>Search</SidebarLabel>
          </SidebarItem>
          {data?.user && (
            <>
              <SidebarItem
                tooltip="Me"
                isCurrent={pathname.startsWith(`/${data.user.slug}`)}
                href={`/${data.user.slug}`}
              >
                <IconPerson />
                <SidebarLabel>Me</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                tooltip="New"
                isCurrent={pathname.startsWith("/new")}
                href="/new"
              >
                <IconPlus />
                <SidebarLabel>New</SidebarLabel>
              </SidebarItem>
            </>
          )}
        </SidebarSection>
      </SidebarContent>

      <SidebarFooter>
        {data?.user ? (
          <Menu>
            <Menu.Trigger className="group" aria-label="Profile">
              <Avatar shape="square" src={data.user.image} />
              <div className="in-data-[sidebar-collapsible=dock]:hidden text-sm">
                <SidebarLabel>{data.user.name}</SidebarLabel>
                <span className="-mt-0.5 block text-muted-fg">
                  {data.user.email}
                </span>
              </div>
              <IconChevronLgDown
                data-slot="chevron"
                className="absolute right-3 size-4 transition-transform group-pressed:rotate-180"
              />
            </Menu.Trigger>
            <Menu.Content
              placement="bottom right"
              className={twMerge(
                state === "expanded"
                  ? "sm:min-w-(--trigger-width)"
                  : "sm:min-w-60"
              )}
            >
              <Menu.Section>
                <Menu.Header separator>
                  <span className="block">{data.user.name}</span>
                  <span className="font-normal text-muted-fg">
                    @{data.user.slug}
                  </span>
                </Menu.Header>
              </Menu.Section>

              <Menu.Item href="/me">
                <IconDashboard />
                My Page
              </Menu.Item>
              <Menu.Item href="/settings">
                <IconSettings />
                Settings
              </Menu.Item>
              <Menu.Separator />

              <Menu.Item onAction={() => signOut()}>
                <IconLogout />
                Sign out
              </Menu.Item>
            </Menu.Content>
          </Menu>
        ) : (
          <SidebarItem tooltip="Sign In" onPress={() => signIn("google")}>
            <IconPerson />
            <SidebarLabel>Sign In</SidebarLabel>
          </SidebarItem>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
