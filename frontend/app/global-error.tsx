'use client';

import { AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Logo/Icône */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Code erreur */}
            <h1 className="text-6xl font-bold text-slate-900 mb-4">
              500
            </h1>

            {/* Message */}
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Erreur serveur
            </h2>
            <p className="text-slate-500 mb-8">
              Une erreur critique est survenue. Veuillez réessayer plus tard.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md"
              >
                Réessayer
              </button>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 rounded-lg hover:bg-slate-50 transition-all"
              >
                <Home className="w-5 h-5" />
                Accueil
              </a>
            </div>

            {/* Info supplémentaire */}
            <p className="text-sm text-slate-400 mt-8">
              Erreur 500 - Chez Nest-Or
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
