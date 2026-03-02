import menuData from "@/data/menu.json";
import CategoryNav from "@/components/CategoryNav";

// Maps dietary tag keys to their badge color classes
const dietaryColors: Record<string, string> = {
  vegetarian: "bg-green-100 text-green-800",
  vegan: "bg-emerald-100 text-emerald-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

// Maps advisory tag keys to their display labels
const advisoryLabels: Record<string, string> = {
  "raw seafood": "🐟 Raw Seafood",
};

export const metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="bg-white min-h-screen">
      <CategoryNav categories={menuData.categories} />

      {/* Menu sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {menuData.categories.map((category) => (
          // scroll-mt-48 offsets the sticky header + category nav so the section
          // heading lands just below the nav bar when jumped to via anchor link
          <section key={category.id} id={category.id} className="scroll-mt-48">
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-ink">{category.name}</h2>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              {category.description && (
                <p className="text-sm text-ink-muted mt-1">{category.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      {/* Item name + advisory tags (e.g. raw seafood) */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-ink text-base">{item.name}</h3>
                        {item.advisory.map((tag) => (
                          <span key={tag} className="text-blue-600 text-xs font-medium">
                            {advisoryLabels[tag] ?? tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Dietary badges (vegetarian, vegan, gluten-free, etc.) */}
                      {item.dietary.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.dietary.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                dietaryColors[tag] ?? "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="text-btn font-bold text-base whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-stone-50 border-t border-stone-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p className="text-xs text-ink-muted text-center">
            <span className="font-medium text-blue-600">🐟 Raw Seafood: </span>
            Consuming raw or undercooked seafood or shellfish may increase your risk of foodborne illness.
          </p>
          <p className="text-xs text-ink-muted text-center">
            Please inform your server of any allergies or dietary restrictions. We do our best to accommodate all needs.
          </p>
        </div>
      </div>
    </div>
  );
}
