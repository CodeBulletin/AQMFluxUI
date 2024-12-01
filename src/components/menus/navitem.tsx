import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

type NavItemProps = {
  activepath: string | null;
  path: string;
  Icon: any;
  label: string;
  handleNavigation: () => void;
};

const NavItem = ({
  activepath,
  path,
  Icon,
  label,
  handleNavigation,
}: NavItemProps) => (
  <Tooltip key={activepath} delayDuration={0}>
    <TooltipTrigger asChild>
      <button
        onClick={() => handleNavigation()}
        className={classNames(
          "w-10 h-10 rounded-md flex items-center justify-center transition-colors",
          "hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600",
          activepath === path
            ? "bg-zinc-800 text-zinc-100"
            : "text-zinc-400 hover:text-zinc-100"
        )}
      >
        <Icon className="h-5 w-5" />
      </button>
    </TooltipTrigger>
    <TooltipContent
      side="right"
      className="bg-zinc-900 text-zinc-100 border border-zinc-800 px-3 py-1.5 rounded-md text-sm z-10"
    >
      {label}
    </TooltipContent>
  </Tooltip>
);

export default NavItem;
