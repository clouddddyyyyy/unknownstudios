/**
 * Everything the site knows about a project. The listing and the detail page
 * both read from here, so a new project only needs one entry.
 */
export const PROJECTS = [
  {
    id: "seshy",
    name: "Seshy",
    image: "/projects/seshy/seshy.png",
    summary:
      "The all-in-one management bot for ER:LC — sessions, moderation, staff tools and anti-nuke, without the bot stack.",
    overview:
      "Seshy is a Discord bot built for ER:LC communities. It covers the jobs that normally get split across half a dozen bots: members vote to start a session and Seshy pings everyone who did, moderation actions are saved to a case record, staff clock on with one click, and priority requests go to the right people. Ares watches the audit log and catches a compromised admin early. Everything is configured from one dashboard, and changes apply to the server immediately.",
    links: [
      {
        label: "Add to Discord",
        href: "https://discord.com/api/oauth2/authorize?client_id=1077877101983707168&permissions=8&scope=bot",
        primary: true,
      },
      { label: "seshy.lol", href: "https://seshy.lol/" },
      { label: "Support server", href: "https://discord.gg/y5MTA5Qe2r" },
    ],
    cta: {
      title: "Ready when your server is.",
      text:
        "Adding Seshy brings the whole stack with it — sessions, moderation, staff tools and Ares. No other bots needed.",
    },
    stats: [
      { value: "600", label: "Servers" },
      { value: "27K+", label: "Members" },
      { value: "25+", label: "Ares protections" },
    ],
    modules: [
      {
        name: "Sessions",
        text: "Members vote and the session starts itself, pinging everyone who voted.",
      },
      {
        name: "Moderation",
        text: "Every action lands on a permanent case record — who, why and the evidence.",
      },
      {
        name: "Staff",
        text: "Clock on with one click and the hours count themselves. Priority requests go straight to staff.",
      },
      {
        name: "ER:LC",
        text: "Your in-game server, live in Discord: players, staff on duty and the queue.",
      },
      {
        name: "Community",
        text: "Giveaways, tickets and welcomes, already built and ready to use.",
      },
      {
        name: "Ares",
        text: "Anti-nuke that moves first: quarantine, lockdown, raid shield and a shared blacklist.",
      },
    ],
  },
];

export function getProject(id) {
  return PROJECTS.find((project) => project.id === id) || null;
}
