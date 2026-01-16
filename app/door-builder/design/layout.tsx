import { BuilderShell } from "@/components/builder/BuilderShell";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuilderShell
      activeStep="design"
      bottomBarText="SELECT YOUR DOOR DESIGN"
    >
      <div className="max-w-[1100px] mx-auto">
        {children}
      </div>
    </BuilderShell>
  );
}
