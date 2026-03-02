import Link from "next/link";
import info from "@/data/info.json";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center text-white text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-2xl px-6">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4 drop-shadow-lg">
            {info.name}
          </h1>
          <p className="text-xl sm:text-2xl text-stone-200 mb-8 font-light">{info.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={info.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-btn hover:bg-btn-hover text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors shadow-lg"
            >
              Order Online
            </a>
            <Link
              href="/menu"
              className="bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors border border-white/40"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-ink mb-4">Welcome</h2>
            <div className="w-12 h-0.5 bg-btn mx-auto mb-6" />
            <p className="text-ink-muted text-lg leading-relaxed">{info.about}</p>
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink mb-2">Find Us</h2>
            <div className="w-12 h-0.5 bg-btn mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-100 h-80 md:h-full min-h-64">
              <iframe
                src={info.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map to ${info.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-btn text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Ready to dine?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Reserve a table or order your favorite dishes for pickup and delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={info.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-btn hover:bg-white/90 font-semibold px-8 py-3 rounded-full text-lg transition-colors shadow"
            >
              Order Online
            </a>
            <Link
              href="/gift-cards"
              className="border-2 border-white text-white hover:bg-white/15 font-semibold px-8 py-3 rounded-full text-lg transition-colors"
            >
              Buy a Gift Card
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
