import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactUs() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-12">Contact Us</h1>
          <p className="text-lg mb-8">Phone: <a href="tel:+33652466694" className="text-gold">+33 6 52 46 66 94</a></p>
          <p className="text-lg mb-8">Email: <a href="mailto:info@pariseasymove.com" className="text-gold">info@pariseasymove.com</a></p>
          <p className="text-lg mb-12">Address: Near Charles de Gaulle Airport, Paris, France</p>
          {/* Add a contact form here similar to BookingForm */}
          <form className="max-w-md mx-auto">
            <input type="text" placeholder="Name" className="w-full mb-4 border rounded-lg px-4 py-3" />
            <input type="email" placeholder="Email" className="w-full mb-4 border rounded-lg px-4 py-3" />
            <textarea placeholder="Message" className="w-full mb-6 border rounded-lg px-4 py-3 h-32" />
            <button type="submit" className="bg-gold text-navy font-bold px-8 py-4 rounded-full">Send Message</button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}