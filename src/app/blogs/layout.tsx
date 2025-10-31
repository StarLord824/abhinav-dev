export default function BlogsLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-black/60 font-sans">
      {/* Background Layer - Consistent across all blog routes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        
        {/* FUTURE: Custom SVG Background from Figma */}
        {/* Uncomment and replace with your custom SVG when ready */}
        {/* 
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/path-to-your-custom-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        */}

        {/* Current: Radial gradient - optimized background pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
          }}
        />
        
        {/* Subtle vignette for depth without heavy blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Optional: Ambient particles/stars effect */}
        {/* 
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-pulse delay-100" />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-200" />
        </div>
        */}
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}