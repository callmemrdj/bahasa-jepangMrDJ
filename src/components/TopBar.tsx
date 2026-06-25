interface TopBarProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function TopBar({ title, subtitle, onBack }: TopBarProps) {
  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-90 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="text-base sm:text-lg font-bold text-blue-900 truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-blue-600 truncate">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
