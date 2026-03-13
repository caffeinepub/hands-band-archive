import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          style: {
            background: "oklch(0.12 0.004 60)",
            border: "1px dashed oklch(0.25 0.005 60)",
            color: "oklch(0.92 0.01 85)",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.75rem",
          },
        }}
      />
    </>
  );
}
