import { AppShell } from "@/components/AppShell";
import { GalleryClient } from "@/components/GalleryClient";
import { ProtectedMuseumContent } from "@/components/ProtectedMuseumContent";

export default function GalleryPage() {
  return (
    <AppShell
      title="Our Gallery"
      subtitle="A timeline of tiny adventures, warm dates, and soft evenings."
    >
      <ProtectedMuseumContent>
        <GalleryClient />
      </ProtectedMuseumContent>
    </AppShell>
  );
}
