'use client';

import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Logo/Icône */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Code erreur */}
        <h1 className="text-6xl font-bold text-slate-900 mb-4 animate-slide-up">
          Oups !
        </h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-slate-500 mb-2">
          Quelque chose s'est mal passé. Nos équipes ont été notifiées.
        </p>

        {/* Message d'erreur technique (dev mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-xs font-mono text-red-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            Réessayer
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 rounded-lg hover:bg-slate-50 transition-all"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </a>
        </div>

        {/* Info supplémentaire */}
        <p className="text-sm text-slate-400 mt-8">
          Erreur - Chez Nest-Or
        </p>
      </div>
    </div>
  );
}
