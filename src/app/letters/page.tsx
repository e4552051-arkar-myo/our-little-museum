import { AppShell } from "@/components/AppShell";
import { LetterBoxClient } from "@/components/LetterBoxClient";

export default function LettersPage() {
  return (
    <AppShell
      title="Letter Box"
      subtitle="Open each envelope slowly. Some secrets bloom in time."
    >
      <LetterBoxClient />
    </AppShell>
  );
}
