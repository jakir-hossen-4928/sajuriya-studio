export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0a0a0f_0%,#050506_50%,#020203_100%)]" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-bg" />

      {/* Animated blobs */}
      <div
        className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/20 blur-[150px] animate-float"
      />
      <div
        className="absolute top-[40%] -left-[100px] w-[600px] h-[800px] rounded-full bg-purple-600/10 blur-[120px] animate-float-slow"
      />
      <div
        className="absolute top-[30%] -right-[100px] w-[500px] h-[700px] rounded-full bg-indigo-500/10 blur-[100px] animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
