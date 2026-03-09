import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Rates() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-navy text-center mb-12">Our Rates</h1>
          <table className="w-full border-collapse bg-white rounded-xl shadow-xl overflow-hidden">
            <thead>
              <tr className="bg-navy text-white">
                <th className="p-4">Route</th>
                <th className="p-4">Price (Economic)</th>
                <th className="p-4">Price (Luxury)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">CDG to Disney</td>
                <td className="p-4 text-center">€80</td>
                <td className="p-4 text-center">€120</td>
              </tr>
              {/* Add more rows */}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}