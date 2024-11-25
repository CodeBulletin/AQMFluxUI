import { Card, CardContent } from "@/components/ui/card";
import { Github, Code2, Package, FileText, Activity, Cpu } from "lucide-react";

const InfoWidget = ({
  developerName = "John Doe",
  version = "1.0.0",
  githubLink = "https://github.com/johndoe/project",
  licenseType = "MIT",
  activeDevices = 0,
  devices = 0,
}) => {
  return (
    <Card className="bg-zinc-800 text-zinc-100 w-{100%} flex flex-col mb-8 mr-8 border-none">
      <CardContent className="p-8">
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            {/* GitHub Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-medium">DEVICES</span>
              </div>
              <span className="text-base text-zinc-100 pl-6">
                {devices} devices
              </span>
            </div>
            {/* License Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-medium">ACTIVE DEVICES</span>
              </div>
              <span className="text-base text-zinc-100 pl-6">
                {activeDevices} active
              </span>
            </div>
          </div>
          {/* Middle Column */}
          <div className="flex flex-col space-y-4">
            {/* Developer Name Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-medium">DEVELOPER</span>
              </div>
              <span className="text-base font-bold text-zinc-100 pl-6">
                {developerName}
              </span>
            </div>

            {/* Version Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Package className="w-4 h-4" />
                <span className="text-xs font-medium">APP VERSION</span>
              </div>
              <span className="text-base font-bold text-zinc-100 pl-6">
                v{version}
              </span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            {/* GitHub Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <Github className="w-4 h-4" />
                <span className="text-xs font-medium">REPOSITORY</span>
              </div>
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-zinc-100 hover:text-blue-400 transition-colors pl-6 truncate"
                title={githubLink}
              >
                {githubLink.replace("https://github.com/", "")}
              </a>
            </div>
            {/* License Section */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 text-zinc-400">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-medium">LICENSE</span>
              </div>
              <span className="text-base font-bold text-zinc-100 pl-6">
                {licenseType}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoWidget;
