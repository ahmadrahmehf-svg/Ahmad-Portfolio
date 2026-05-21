import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-black text-xs">
              AR
            </div>
            <span className="text-sm font-medium">Ahmad Rahmeh</span>
          </div>

          <p className="text-slate-500 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Built with <Heart size={12} className="text-red-500 fill-red-500" /> | Amman, Jordan
          </p>

          <a
            href="#home"
            className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
