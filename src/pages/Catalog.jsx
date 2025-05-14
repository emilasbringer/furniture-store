import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { CreditCardIcon, TruckIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const generateMockProducts = (count, category) => {
  const conditions = ["Sliten", "Okej", "Bra", "Utmärkt", "Oanvänd"];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${category} Produkt ${i + 1}`,
    brand: ["VintageCo", "RetroStyle", "NordicDesign"][Math.floor(Math.random() * 3)],
    price: Math.floor(Math.random() * 5000) + 500,
    sale: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 20 : 0,
    stock: Math.floor(Math.random() * 10) + 1,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    image: `https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60`,
    description: "En fantastisk begagnad produkt i toppskick, perfekt för ditt hem!",
    color: ["Svart", "Vit", "Grå"][Math.floor(Math.random() * 3)],
    dimensions: `${Math.floor(Math.random() * 100) + 50}x${Math.floor(Math.random() * 100) + 50}x${Math.floor(Math.random() * 100) + 50} cm`,
    material: ["Trä", "Metall", "Tyg"][Math.floor(Math.random() * 3)],
    category,
  }));
};

export default function Catalog() {
  const { category } = useParams();
  const [products, setProducts] = useState(generateMockProducts(12, category));
  const [filters, setFilters] = useState({ condition: "", minPrice: "", maxPrice: "" });
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  // Simulate max products (e.g., 60 products total)
  const MAX_PRODUCTS = 60;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { rootMargin: "1000px" } // Trigger when ~5 rows remain (adjust based on card height)
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) {
      const newProducts = generateMockProducts(12, category);
      setProducts((prev) => {
        const allProducts = [...prev, ...newProducts];
        if (allProducts.length >= MAX_PRODUCTS) {
          setHasMore(false);
          return allProducts.slice(0, MAX_PRODUCTS);
        }
        return allProducts;
      });
    }
  }, [page, category]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filteredProducts = products
    .filter((product) => {
      if (filters.condition && product.condition !== filters.condition) return false;
      if (filters.minPrice && product.price < parseInt(filters.minPrice)) return false;
      if (filters.maxPrice && product.price > parseInt(filters.maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen mt-[calc(var(--navbar-height)+var(--newsbanner-height))]">
      {/* Category Header */}
      <header className="bg-gray-100 py-6 px-4 lg:px-32">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">{category}</h1>
      </header>

      {/* Filters and Sorting */}
      <section className="py-6 px-4 lg:px-32 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Filter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skick</label>
              <select
                name="condition"
                value={filters.condition}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Alla</option>
                <option value="Sliten">Sliten</option>
                <option value="Okej">Okej</option>
                <option value="Bra">Bra</option>
                <option value="Utmärkt">Utmärkt</option>
                <option value="Oanvänd">Oanvänd</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min pris (kr)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max pris (kr)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Sortera</h2>
          <select
            value={sort}
            onChange={handleSortChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="default">Standard</option>
            <option value="price-asc">Pris: Lågt till Högt</option>
            <option value="price-desc">Pris: Högt till Lågt</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-6 px-4 lg:px-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                <p className="text-gray-600">{product.brand}</p>
                <div className="flex items-center gap-2">
                  <p className="text-indigo-600 font-semibold">
                    {product.sale
                      ? `${Math.round(product.price * (1 - product.sale / 100))} kr`
                      : `${product.price} kr`}
                  </p>
                  {product.sale && (
                    <p className="text-gray-500 line-through text-sm">{product.price} kr</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">Skick: {product.condition}</p>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && (
          <div ref={loaderRef} className="text-center py-6">
            <p className="text-gray-600">Laddar fler produkter...</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 lg:px-32 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Följ oss</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="hover:text-indigo-400 transition-colors duration-200">📘</a>
              <a href="https://instagram.com" className="hover:text-indigo-400 transition-colors duration-200">📸</a>
              <a href="https://twitter.com" className="hover:text-indigo-400 transition-colors duration-200">🐦</a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Betalningsmetoder</h3>
            <div className="flex gap-4">
              <CreditCardIcon className="w-8 h-8" title="Visa" />
              <CreditCardIcon className="w-8 h-8" title="MasterCard" />
              <CreditCardIcon className="w-8 h-8" title="Klarna" />
              <CreditCardIcon className="w-8 h-8" title="Swish" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-indigo-400 transition-colors duration-200">
                  Frakt & Leverans
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-indigo-400 transition-colors duration-200">
                  Returer
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-indigo-400 transition-colors duration-200">
                  Garanti
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Kundtjänst</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-indigo-400 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition-colors duration-200">
                  Kontakta oss
                </Link>
              </li>
              <li>
                <a href="mailto:support@mobello.se" className="hover:text-indigo-400 transition-colors duration-200">
                  support@mobello.se
                </a>
              </li>
              <li>
                <a href="tel:+46701234567" className="hover:text-indigo-400 transition-colors duration-200">
                  +46 70 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© 2025 Möbello. Alla rättigheter förbehållna.</p>
        </div>
      </footer>
    </div>
  );
}