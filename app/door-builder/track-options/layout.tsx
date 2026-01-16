import { BuilderShell } from "@/components/builder/BuilderShell";

export default function TrackOptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuilderShell
      activeStep="track-options"
      bottomBarText="SELECT TRACK OPTIONS"
    >
      <div className="max-w-[1100px] mx-auto">
        {children}
      </div>
    </BuilderShell>
  );
}
