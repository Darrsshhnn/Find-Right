import Link from "next/link";
import BrandMark from "./BrandMark";
import GuidedTour from "./GuidedTour";
import Icon from "./Icon";
import MenuCloser from "./MenuCloser";
import MobileMenu, { type MenuItem } from "./MobileMenu";
import TourButton from "./TourButton";
import NavLink from "./NavLink";
import { Avatar, Logo } from "./ui";
import { logout } from "@/app/actions/auth";
import { markNotificationsRead } from "@/app/actions/shared";
import { db } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import type { User } from "@/lib/types";

export type NavItem = { href: string; icon: string; label: string; short?: string; count?: number; exact?: boolean };

/** App shell: navigation on the left (as in the Figma dashboard), a slim utility bar on top. */
export default function Shell({ user, subtitle, nav, bottomNav = [], menu, messagesHref, cta, children }: {
  user: User; subtitle: string; nav: NavItem[]; bottomNav?: NavItem[]; menu: NavItem[]; messagesHref?: string; cta?: React.ReactNode; children: React.ReactNode;
}) {
  const data = db();
  const notifications = data.notifications.filter((n) => n.userId === user.id).slice(0, 15);
  const unread = notifications.filter((n) => !n.read).length;
  const unreadMessages = notifications.filter((n) => !n.read && n.href.includes("/messages")).length;
  const home = user.role === "admin" ? "/admin" : `/${user.role}`;
  // Phone menu: every option in one place (main pages, messages, account pages), without duplicates.
  const mainItems: MenuItem[] = nav.map(({ href, label, icon, count, exact }) => ({ href, label, icon, count, exact }));
  if (messagesHref && !nav.some((n) => n.href === messagesHref)) mainItems.push({ href: messagesHref, label: "Messages", icon: "chat", count: unreadMessages });
  const seen = new Set(mainItems.map((i) => i.href));
  const accountItems: MenuItem[] = [...bottomNav, ...menu].filter((i) => !seen.has(i.href) && seen.add(i.href)).map(({ href, label, icon }) => ({ href, label, icon }));
  return (
    <div className="shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <MenuCloser />
      <aside className="sidebar" aria-label="Main navigation">
        <Link href={home} className="sidebar-logo" aria-label="FindRight home"><span className="logo-mark"><BrandMark size={24} /></span></Link>
        <nav className="side-nav" data-tour="nav">
          {nav.map((item) => <NavLink key={item.href} {...item} variant="side" />)}
        </nav>
        {bottomNav.length > 0 && (
          <nav className="side-nav side-nav-bottom" aria-label="Account">
            {bottomNav.map((item) => <NavLink key={item.href} {...item} variant="side" />)}
          </nav>
        )}
      </aside>
      <div className="shell-body">
        <header className="topbar">
          <MobileMenu
            sections={[{ label: "Menu", items: mainItems }, ...(accountItems.length ? [{ label: "Account", items: accountItems }] : [])]}
            header={<div className="row" style={{ flexWrap: "nowrap" }}><Avatar name={user.name} src={user.avatar} /><div style={{ minWidth: 0 }}><b className="truncate" style={{ display: "block" }}>{user.name}</b><span className="small muted truncate" style={{ display: "block" }}>{subtitle}</span></div></div>}
            top={cta}
            footer={<>{user.role !== "admin" && <TourButton className="btn btn-light btn-block" label="App guide" />}<form action={logout}><button className="btn btn-danger btn-block"><Icon name="logout" size={16} /> Log out</button></form></>}
          />
          <span className="topbar-logo"><Logo href={home} /></span>
          <div className="topbar-actions">
            {cta && <span className="hide-mobile" data-tour="cta">{cta}</span>}
            {messagesHref && (
              <Link href={messagesHref} className="icon-btn hide-mobile" data-tour="messages" aria-label={`Messages${unreadMessages ? `, ${unreadMessages} unread` : ""}`}>
                <Icon name="chat" />
                {unreadMessages > 0 && <span className="count">{unreadMessages}</span>}
              </Link>
            )}
            <details className="menu">
              <summary className="icon-btn" aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}>
                <Icon name="bell" />
                {unread > 0 && <span className="count">{unread}</span>}
              </summary>
              <div className="menu-panel notif-panel">
                <header>
                  <b>Notifications</b>
                  {unread > 0 && <form action={markNotificationsRead}><button className="link small">Mark all read</button></form>}
                </header>
                <div className="notif-list">
                  {notifications.length ? notifications.map((n) => (
                    <Link key={n.id} href={n.href} className={n.read ? "" : "unread"}>
                      <span>{n.text}</span><small>{timeAgo(n.createdAt)}</small>
                    </Link>
                  )) : <p className="muted small" style={{ padding: 16 }}>You&apos;re all caught up.</p>}
                </div>
              </div>
            </details>
            <details className="menu hide-mobile">
              <summary className="avatar-btn" aria-label="Account menu">
                <Avatar name={user.name} src={user.avatar} size="sm" />
              </summary>
              <div className="menu-panel">
                <div className="menu-head"><b>{user.name}</b><span className="small muted">{subtitle}</span></div>
                {menu.map((item) => <Link key={item.href} href={item.href}><Icon name={item.icon} size={16} /> {item.label}</Link>)}
                <hr className="divider" />
                <form action={logout}><button><Icon name="logout" size={16} /> Log out</button></form>
              </div>
            </details>
          </div>
        </header>
        <main className="main" id="main">
          <div className="container">{children}</div>
        </main>
      </div>
      {user.role !== "admin" && <GuidedTour role={user.role as "client" | "freelancer"} firstLogin={!user.tourSeen} />}
    </div>
  );
}
