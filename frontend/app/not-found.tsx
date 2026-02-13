import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Logo/Icône */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <Search className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Code erreur */}
        <h1 className="text-8xl font-bold text-slate-900 mb-4 animate-slide-up">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Page non trouvée
        </h2>
        <p className="text-slate-500 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Info supplémentaire */}
        <p className="text-sm text-slate-400 mt-8">
          Erreur 404 - Chez Nest-Or
        </p>
      </div>
    </div>
  );
}
