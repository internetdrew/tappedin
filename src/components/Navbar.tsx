import type { GeneratePostOutput } from "@/App";
import { Button } from "./ui/button";

interface NavbarProps {
  renderStartOver: boolean;
  setResults: (results: GeneratePostOutput | null) => void;
}

const Navbar = ({ renderStartOver, setResults }: NavbarProps) => {
  return (
    <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 sm:px-0">
      <h1 className="text-xl font-semibold">TappedIn</h1>
      <div className="flex items-center gap-2">
        {renderStartOver && (
          <Button variant="outline" onClick={() => setResults(null)}>
            Start over
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
