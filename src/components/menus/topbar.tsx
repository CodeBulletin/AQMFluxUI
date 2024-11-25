import React from "react";

export type TopbarProps = {
  leftChildren?: React.ReactNode;
  centerChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
};

export const Topbar = ({
  leftChildren,
  centerChildren,
  rightChildren,
}: TopbarProps) => {
  return (
    <div className="h-16 w-full px-4 bg-zinc-950 rounded-xl flex flex-row items-centre">
      <div className="flex items-center justify-start flex-1 gap-4">
        {leftChildren}
      </div>
      <div className="flex items-center justify-center flex-1">
        {centerChildren}
      </div>
      <div className="flex items-center justify-end flex-1">
        {rightChildren}
      </div>
    </div>
  );
};

export default Topbar;
