export default function Footer() {
  return (
    <footer className="glass-dark border-t border-white/10 py-8 mt-auto">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} VoyageAI. Built with ❤️ for the Hackathon.</p>
      </div>
    </footer>
  );
}
