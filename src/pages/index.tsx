import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Slanje...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('Poruka poslata!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Greška pri slanju.');
      }
    } catch {
      setStatus('Greška pri slanju.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-sm bg-white sticky top-0 z-50">
        <Link href="/">
          <span className="text-2xl font-bold">Telefon za venčanja</span>
        </Link>
        <div className="space-x-4">
          <Link href="/room" className="text-blue-600 hover:underline">Soba</Link>
          {/* Admin login link je uklonjen iz navigacije */}
        </div>
      </nav>

      {/* Hero sekcija */}
      <section className="bg-gray-100 py-20 px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Telefon za venčanja</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Snimite nezaboravne poruke gostiju i pogledajte ih online. Svaki par ima svoju privatnu sobu.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/room">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">Pristupi svojoj sobi</button>
            </Link>
            {/* Dugme za admin login uklonjeno */}
          </div>
        </motion.div>
      </section>

      {/* Kako funkcioniše */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10">Kako funkcioniše</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            { title: '1. Postavi telefon', text: 'Postavi telefon na događaj kao video knjigu gostiju.' },
            { title: '2. Gosti snimaju', text: 'Gosti ostavljaju video poruke tokom proslave.' },
            { title: '3. Gledaj online', text: 'Snimci se automatski prenose i dostupni su u tvojoj sobi.' },
          ].map(({ title, text }, i) => (
            <motion.div key={i} className="bg-gray-50 p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }}>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Galerija primera */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-10">Galerija</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl shadow-sm group relative cursor-pointer">
              <Image
                src={`/gallery/img${i}.jpg`}
                alt={`Galerija slika ${i}`}
                width={500}
                height={500}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">Slika {i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt forma */}
      <section className="py-16 px-6 bg-white max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Kontakt</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Ime i prezime</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="Vaše ime" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2" placeholder="vas@email.com" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Poruka</label>
            <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-gray-300 rounded-xl px-4 py-2" rows={4} placeholder="Pišite nam..." />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
            Pošalji poruku
          </button>
          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Telefon za venčanja. Sva prava zadržana.
      </footer>
    </main>
  );
}
