export type SiteLib = typeof siteLib;

export const siteLib = {
  name: "BibiPrice",
  description: "BibiPrice is a price tracker for e-commerce websites.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Problem Set",
      href: "/problem",
    },
    {
      label: "Ranking",
      href: "/rank",
    },
    {
      label: "Submissions",
      href: "/submission",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Sign out",
      href: "/signout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
