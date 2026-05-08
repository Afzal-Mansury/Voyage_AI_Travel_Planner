export default function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10 py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🇮🇳</span>
              <div>
                <div className="text-lg font-extrabold text-white">YatraVerse AI</div>
                <div className="text-xs" style={{ color: "#FF9933" }}>Discover India Intelligently</div>
              </div>
            </div>
            <p className="text-gray-500 text-sm">India&apos;s first AI-powered travel experience engine. Plan smarter, explore deeper.</p>
          </div>
          
          {/* Destinations */}
          <div>
            <h4 className="text-white font-semibold mb-3">Top Destinations</h4>
            <ul className="space-y-1.5">
              {["Kashmir 🏔️", "Goa 🏖️", "Kerala 🌴", "Ladakh 🏜️", "Varanasi 🛕"].map(d => (
                <li key={d}>
                  <a href="/destinations" className="text-sm text-gray-400 hover:text-orange-400 transition-colors">{d}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h4 className="text-white font-semibold mb-3">Powered By</h4>
            <ul className="space-y-1.5">
              {["Gemini 2.5 Flash AI", "Google Cloud Run", "Firebase Auth", "Google Maps API", "Next.js 15"].map(t => (
                <li key={t} className="text-sm text-gray-400 flex items-center gap-1.5">
                  <span className="text-green-400">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} YatraVerse AI · Built for Incredible India 🇮🇳</p>
          <p className="text-gray-600 text-xs">Made with ❤️ for the Hackathon · Powered by Google Gemini</p>
        </div>
      </div>
    </footer>
  );
}
