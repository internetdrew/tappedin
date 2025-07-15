import { trpc } from "../utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const { data, isLoading } = useQuery(
    trpc.greeting.queryOptions({ intro: "Welcome to" }),
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-lg font-semibold">
          {isLoading ? "Loading..." : data}
        </h1>
        <p className="font-mono text-sm">
          We're all set up to build something!
        </p>
      </div>
    </ThemeProvider>
  );
}

export default App;
