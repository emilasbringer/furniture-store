import { Link } from "react-router-dom";
import { ArrowRightIcon, CreditCardIcon, TruckIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  // Sample data for trending and clearance items (replace with API data)
  const trendingItems = [
    { id: 1, name: "Vintage Soffa", price: "4 999 kr", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Ek Bord", price: "2 499 kr", image: "https://images.unsplash.com/photo-1572025442348-511bdcae389b?q=80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Retro Stol", price: "1 299 kr", image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Moderna Matta", price: "999 kr", image: "https://images.unsplash.com/photo-1597665863042-47e00964d899?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  ];

  const clearanceItems = [
    { id: 1, name: "Soffa - Uttjänt", price: "1 999 kr", originalPrice: "3 999 kr", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Bord - Sista Chansen", price: "799 kr", originalPrice: "1 499 kr", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Lampa - Rea", price: "499 kr", originalPrice: "999 kr", image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Stol - Slutrea", price: "399 kr", originalPrice: "799 kr", image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  ];

  const categories = [
    { name: "Möbler", path: "/furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Mattor", path: "/rugs", image: "https://images.unsplash.com/photo-1597665863042-47e00964d899?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Belysning", path: "/lighting", image: "https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
    { name: "Kampanjer", path: "/campaigns", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[60vh] md:mt-36 bg-gradient-to-r from-indigo-600 to-pink-500 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 px-10">
            Höstrea - Upp till 50% rabatt!
          </h1>
          <p className="text-lg md:text-2xl text-white mb-6">
            Fynda begagnade möbler i toppskick!
          </p>
          <Link
            to="/campaigns"
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
          >
            Shoppa nu <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* Trending Items */}
      <section className="py-12 px-4 lg:px-56">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Nya produkter</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-100">
          {trendingItems.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="flex-none w-64 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                <p className="text-indigo-600 font-semibold">{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-4 lg:px-56 bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Populära kategorier</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Utförsäljning (Clearance) */}
      <section className="py-12 px-4 lg:px-56">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Utförsäljning</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-gray-100">
          {clearanceItems.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="flex-none w-64 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-indigo-600 font-semibold">{item.price}</p>
                  <p className="text-gray-500 line-through text-sm">{item.originalPrice}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 lg:px-56">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Följ oss</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="hover:text-indigo-400 transition-colors duration-200">📘</a>
              <a href="https://instagram.com" className="hover:text-indigo-400 transition-colors duration-200">📸</a>
              <a href="https://twitter.com" className="hover:text-indigo-400 transition-colors duration-200">🐦</a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Betalningsmetoder</h3>
            <div className="flex gap-4">
              <CreditCardIcon className="w-8 h-8" title="Visa" />
              <CreditCardIcon className="w-8 h-8" title="MasterCard" />
              <CreditCardIcon className="w-8 h-8" title="Klarna" />
              <CreditCardIcon className="w-8 h-8" title="Swish" />
            </div>
          </div>

          {/* Service */}
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

          {/* FAQ & Contact */}
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
          <p>&copy; 2025 Möbello. Alla rättigheter förbehållna.</p>
        </div>
      </footer>
    </div>
  );
}