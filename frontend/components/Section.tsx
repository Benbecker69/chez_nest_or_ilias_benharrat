import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Section({
  title,
  icon,
  children,
}: SectionProps) {
  return (
    <section className="mb-12 animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-3 rounded-lg text-white shadow-lg">
            {icon}
          </div>
        )}
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}
