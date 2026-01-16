import { BuilderShell } from "@/components/builder/BuilderShell";

export default function ExtrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BuilderShell
      activeStep="extras"
      bottomBarText="ADD EXTRAS"
    >
      <div className="max-w-[1100px] mx-auto">
        {children}
      </div>
    </BuilderShell>
  );
}
