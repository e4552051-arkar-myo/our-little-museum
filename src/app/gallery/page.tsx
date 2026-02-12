import { AppShell } from "@/components/AppShell";
import { GalleryClient } from "@/components/GalleryClient";

export default function GalleryPage() {
  return (
    <AppShell
      title="Our Gallery"
      subtitle="A timeline of tiny adventures, warm dates, and soft evenings."
    >
      <GalleryClient />
    </AppShell>
  );
}
