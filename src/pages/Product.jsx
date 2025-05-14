import { useParams, Link } from "react-router-dom"; // Remove useRef, as hover scroll is deleted
import { useState, useEffect, useRef } from "react"; // Add useRef for arrow navigation
import { CreditCardIcon, TruckIcon, QuestionMarkCircleIcon, PaintBrushIcon, CubeIcon, SwatchIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"; // Add Chevron icons

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
    description: "En fantastisk begagnad produkt i toppskick, perfekt för ditt hem! Denna möbel har noggrant renoverats och är redo att ge ditt rum en unik karaktär.",
    color: ["Svart", "Vit", "Grå"][Math.floor(Math.random() * 3)],
    dimensions: `${Math.floor(Math.random() * 100) + 50}x${Math.floor(Math.random() * 100) + 50}x${Math.floor(Math.random() * 100) + 50} cm`,
    material: ["Trä", "Metall", "Tyg"][Math.floor(Math.random() * 3)],
    category,
  }));
};

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const rollodexRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false); // Track scroll position
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    // Simulate fetching product by ID
    const mockProduct = generateMockProducts(1, "Möbler")[0];
    mockProduct.id = parseInt(id);
    setProduct(mockProduct);

    // Simulate related products
    setRelatedProducts(generateMockProducts(16, "Möbler"));
  }, [id]);

  useEffect(() => {
    const rollodex = rollodexRef.current;
    if (!rollodex) return;

    const updateScrollState = () => {
        console.log("rollodex.scrollLeft")
      setCanScrollLeft(rollodex.scrollLeft > 0);
      setCanScrollRight(
        rollodex.scrollLeft < rollodex.scrollWidth - rollodex.clientWidth - 1
      );
    };

    rollodex.addEventListener("scroll", updateScrollState);
    updateScrollState(); // Initial check

    return () => rollodex.removeEventListener("scroll", updateScrollState);
  }, []);

  const smoothScroll = (targetScrollLeft, duration = 300) => {
    const rollodex = rollodexRef.current;
    if (!rollodex) return;

    const startScrollLeft = rollodex.scrollLeft;
    const distance = targetScrollLeft - startScrollLeft;
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease-in-out
      rollodex.scrollLeft = startScrollLeft + distance * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const scrollLeft = () => {
    if (rollodexRef.current) {
      const target = rollodexRef.current.scrollLeft - 768; // One card width
      smoothScroll(Math.max(0, target));
    }
  };

  const scrollRight = () => {
    if (rollodexRef.current) {
      const target = rollodexRef.current.scrollLeft + 768;
      smoothScroll(target);
    }
  };

  if (!product) return <div className="text-center py-12">Laddar...</div>;

  const conditions = ["Sliten", "Okej", "Bra", "Utmärkt", "Oanvänd"];
  const conditionIndex = conditions.indexOf(product.condition);

  return (
    <div className="flex flex-col min-h-screen pt-12 md:pt-24">
      {/* Product Details */}
      <section className="mx-auto px-4 my-16 xl:max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full lg:max-w-[600px] object-cover rounded-lg"
          />
          {/* Details */}
          <div className="max-w-5/6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.brand}</p>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-2xl font-semibold text-indigo-600">
                {product.sale
                  ? `${Math.round(product.price * (1 - product.sale / 100))} kr`
                  : `${product.price} kr`}
              </p>
              {product.sale && (
                <p className="text-gray-500 line-through">{product.price} kr</p>
              )}
              {product.sale && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">
                  {product.sale}% REA
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-2">Lager: {product.stock} st</p>
            <button
              className="w-full mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Lägg i varukorg" : "Slut i lager"}
            </button>

            {/* Condition Scale */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Skick</h3>
              <div className="flex gap-2 mt-2">
                {conditions.map((cond, i) => (
                  <div
                    key={cond}
                    className={`px-3 py-1 rounded ${
                      i === conditionIndex ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {cond}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Alla våra produkter rengörs exceptionellt noggrant för högsta kvalitet och hygien.
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Beskrivning</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Facts */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Fakta</h3>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2">
                  <SwatchIcon className="w-5 h-5 text-indigo-600" />
                  <span>Färg: {product.color}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CubeIcon className="w-5 h-5 text-indigo-600" />
                  <span>Mått: {product.dimensions}</span>
                </li>
                <li className="flex items-center gap-2">
                  <PaintBrushIcon className="w-5 h-5 text-indigo-600" />
                  <span>Material: {product.material}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 px-4 lg:px-32 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Du kanske också gillar</h2>
        <div className="relative">
          <div
            ref={rollodexRef}
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-none scroll-smooth"
          >
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                to={`/product/${related.id}`}
                className="flex-none w-64 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={related.image}
                  alt={related.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800">{related.name}</h3>
                  <p className="text-indigo-600 font-semibold">
                    {related.sale
                      ? `${Math.round(related.price * (1 - related.sale / 100))} kr`
                      : `${related.price} kr`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {/* Fade-out overlays */}
          <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-100 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" />
          {/* Arrow buttons */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all duration-200 ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Scrolla vänster"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-all duration-200 ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Scrolla höger"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-4 lg:px-32 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Prenumerera på vårt nyhetsbrev</h2>
        <p className="text-gray-600 mb-6">Få de senaste erbjudandena och nyheterna direkt till din inkorg!</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Din e-postadress"
            className="px-4 py-2 border-gray-300 rounded-l-md shadow-sm w-64"
          />
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors duration-200">
            Prenumerera
          </button>
        </div>
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