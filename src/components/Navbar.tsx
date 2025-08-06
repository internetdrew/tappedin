import { Button } from "./ui/button";

interface NavbarProps {
  renderStartOver: boolean;
  onStartOver: () => void;
}

const Navbar = ({ renderStartOver, onStartOver }: NavbarProps) => {
  return (
    <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4 sm:px-0">
      <h1 className="text-xl font-semibold">TappedIn</h1>
      <div className="flex items-center gap-2">
        {renderStartOver && (
          <Button variant="outline" onClick={onStartOver}>
            Start over
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
