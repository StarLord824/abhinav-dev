export default function BlogsLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-black font-sans relative overflow-x-hidden">
      {/* 
        Three-layer background system:
        1. BlogHeader.png - Top castle wall + sky
        2. BlogFiller.png - Repeating wall texture (handled in page.tsx)
        3. BlogFooter.png - Bottom grass + flag (handled in page.tsx)
      */}
      
      {/* Main content - no fixed background here, children handle it */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}