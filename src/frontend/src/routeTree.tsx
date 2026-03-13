import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import FilmGrain from "./components/FilmGrain";
import Navigation from "./components/Navigation";
import ArchivePage from "./pages/Archive";
import CaseFilePage from "./pages/CaseFile";
import CasesIndexPage from "./pages/CasesIndex";
import DownloadsPage from "./pages/Downloads";
import HomePage from "./pages/Home";
import LandingPage from "./pages/Landing";
import MusicPage from "./pages/Music";
import RadioPage from "./pages/Radio";
import SecretPage from "./pages/Secret";
import ShowsPage from "./pages/Shows";
import VideosPage from "./pages/Videos";
import WallPage from "./pages/Wall";

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background text-foreground noise-bg">
      <FilmGrain />
      <div className="scan-lines" />
      <Outlet />
    </div>
  ),
});

// Landing (no nav)
const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// Radio (standalone, no nav)
const radioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/radio",
  component: RadioPage,
});

// Layout with nav
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: () => (
    <>
      <Navigation />
      <main className="page-enter">
        <Outlet />
      </main>
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/home",
  component: HomePage,
});

const musicRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/music",
  component: MusicPage,
});

const videosRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/videos",
  component: VideosPage,
});

const archiveRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/archive",
  component: ArchivePage,
});

const showsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/shows",
  component: ShowsPage,
});

const wallRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/wall",
  component: WallPage,
});

const downloadsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/downloads",
  component: DownloadsPage,
});

const secretRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/secret",
  component: SecretPage,
});

const casesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/cases",
  component: CasesIndexPage,
});

const caseFileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/case/$id",
  component: CaseFilePage,
});

export const routeTree = rootRoute.addChildren([
  landingRoute,
  radioRoute,
  layoutRoute.addChildren([
    homeRoute,
    musicRoute,
    videosRoute,
    archiveRoute,
    showsRoute,
    wallRoute,
    downloadsRoute,
    secretRoute,
    casesRoute,
    caseFileRoute,
  ]),
]);
