import GalleryClient from "@/components/GalleryClient";
import galleryData from "@/data/gallery.json";

export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-surface text-ink py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Gallery</h1>
        <p className="text-ink-muted mt-3 text-lg">A glimpse into our dining experience</p>
        <div className="w-12 h-0.5 bg-btn mx-auto mt-4" />
      </div>

      {/* Gallery Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GalleryClient images={galleryData.images} />

        {/* Replace images note */}
        <p className="text-center text-ink-muted text-xs mt-8">
          To add your own photos, place images in{" "}
          <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-500">public/images/gallery/</code>{" "}
          and update{" "}
          <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-500">src/data/gallery.json</code>.
        </p>
      </div>
    </div>
  );
}
