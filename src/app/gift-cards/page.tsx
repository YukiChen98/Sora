import Link from "next/link";
import info from "@/data/info.json";

export const metadata = {
  title: "Gift Cards",
};

const faqs = [
  {
    q: "How do I redeem a gift card?",
    a: "Present your gift card (digital or physical) at the time of payment. Our staff will be happy to assist you.",
  },
  {
    q: "Can I use a gift card for online orders?",
    a: "Yes! Enter your gift card code at checkout when placing an order through our online ordering system.",
  },
  {
    q: "Do gift cards expire?",
    a: "Gift cards do not expire and can be used for any purchase including dine-in, takeout, and delivery orders.",
  },
  {
    q: "Can I check my gift card balance?",
    a: "Visit our gift card portal or ask any of our staff members to check your remaining balance.",
  },
];

export default function GiftCardsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div
        className="relative py-24 text-white text-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-xl mx-auto px-6">
          <div className="text-5xl mb-4">🎁</div>
          <h1 className="text-4xl font-bold mb-3">Gift Cards</h1>
          <p className="text-white/70 text-lg mb-8">
            Share the gift of a great meal. Perfect for any occasion — birthdays,
            anniversaries, and everything in between.
          </p>
          <a
            href={info.giftCardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-btn hover:bg-btn-hover text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors shadow-lg"
          >
            Purchase a Gift Card
          </a>
        </div>
      </div>

      {/* How it works */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Choose an Amount",
                description: "Select a gift card value that suits your budget and occasion.",
              },
              {
                step: "2",
                title: "Send Digitally",
                description:
                  "Deliver instantly by email or print at home — no waiting required.",
              },
              {
                step: "3",
                title: "Enjoy a Meal",
                description:
                  "Redeem for dine-in, takeout, or online orders. No expiration.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-btn text-white font-bold text-lg flex items-center justify-center mb-4 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-ink-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white text-center border-t border-stone-100">
        <a
          href={info.giftCardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-btn hover:bg-btn-hover text-white font-semibold px-10 py-4 rounded-full text-lg transition-colors shadow"
        >
          Purchase a Gift Card →
        </a>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-stone-50 border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
                <h3 className="font-semibold text-ink mb-2">{faq.q}</h3>
                <p className="text-ink-muted text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-ink-muted text-sm mt-8">
            Have more questions?{" "}
            <a
              href={`mailto:${info.email}`}
              className="text-accent hover:underline"
            >
              Contact us
            </a>{" "}
            or call{" "}
            <a href={`tel:${info.phone}`} className="text-accent hover:underline">
              {info.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
