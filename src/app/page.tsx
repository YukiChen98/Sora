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
              className="bg-amber-700 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-full text-lg transition-colors shadow-lg"
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
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Welcome</h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto mb-6" />
            <p className="text-stone-600 text-lg leading-relaxed">{info.about}</p>
          </div>
        </div>
      </section>

      {/* Hours & Location Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Find Us</h2>
            <div className="w-12 h-0.5 bg-amber-700 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Hours
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-stone-100">
              <h3 className="text-xl font-semibold text-stone-900 mb-5">Hours</h3>
              <ul className="space-y-3">
                {info.hours.map((entry) => (
                  <li
                    key={entry.days}
                    className="flex justify-between text-stone-600 pb-3 border-b border-stone-100 last:border-0 last:pb-0"
                  >
                    <span className="font-medium text-stone-800">{entry.days}</span>
                    <span>{entry.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-stone-100 space-y-1 text-stone-600 text-sm">
                <p className="font-medium text-stone-800">{info.address.street}</p>
                <p>
                  {info.address.city}, {info.address.state} {info.address.zip}
                </p>
                <p className="mt-2">
                  <a
                    href={`tel:${info.phone}`}
                    className="text-amber-700 hover:text-amber-600 transition-colors"
                  >
                    {info.phone}
                  </a>
                </p>
              </div>
            </div>
            */}
            
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
      <section className="py-16 bg-amber-700 text-white text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-3">Ready to dine?</h2>
          <p className="text-amber-100 mb-8 text-lg">
            Reserve a table or order your favorite dishes for pickup and delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={info.orderOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-amber-800 hover:bg-amber-50 font-semibold px-8 py-3 rounded-full text-lg transition-colors shadow"
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
