import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Destinations() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-navy text-center mb-12">Popular Destinations</h1>
          
          {/* Disney Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-navy mb-8">Disneyland Paris</h2>
            <p className="text-lg mb-6">Experience magic with our transfers to Disneyland Paris. Events include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Halloween Festival (October)</li>
              <li>Christmas Season (November-December)</li>
              <li>Nightly Fireworks</li>
            </ul>
            {/* Add image carousel or cards */}
          </section>
          
          {/* Hotels Section */}
          <section>
            <h2 className="text-3xl font-bold text-navy mb-8">Luxury Hotels in Paris</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold">Ritz Paris</h3>
                <p>Luxury in Place Vendôme.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold">Hôtel de Crillon</h3>
                <p>Historic elegance on Place de la Concorde.</p>
              </div>
              {/* Add more */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}