import menuData from "@/data/menu.json";

const dietaryColors: Record<string, string> = {
  vegetarian: "bg-green-100 text-green-800",
  vegan: "bg-emerald-100 text-emerald-800",
  "gluten-free": "bg-yellow-100 text-yellow-800",
};

export const metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="bg-warm-white min-h-screen">
      {/* Page Header */}
      <div className="bg-stone-900 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
        <div className="w-12 h-0.5 bg-amber-500 mx-auto mt-4" />
      </div>

      {/* Sticky Category Navigation */}
      <nav className="sticky top-16 z-40 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <ul className="flex gap-1 py-2 min-w-max">
            {menuData.categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors whitespace-nowrap"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Menu Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {menuData.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-28">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-stone-900">{category.name}</h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-stone-900 text-base">{item.name}</h3>
                        {item.spicy && (
                          <span className="text-red-500 text-xs font-medium">🌶 Spicy</span>
                        )}
                      </div>
                      <p className="text-stone-500 text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>
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
                    <span className="text-amber-700 font-bold text-base whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Dietary Legend */}
      <div className="bg-stone-50 border-t border-stone-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-stone-400 text-center">
            <span className="font-medium text-stone-500">Dietary tags: </span>
            Please inform your server of any allergies or dietary restrictions. We do our best to accommodate all needs.
          </p>
        </div>
      </div>
    </div>
  );
}
