import { useEffect, useRef } from "react";

const COLORS = ["#00f5ff", "#ff2d78", "#00ff88", "#ffd200", "#ff6b2b"];
const GRID = 80;

// Distribución en grilla para cobertura uniforme
const makeParticles = (W, H) => {
  const cols = Math.ceil(W / 120);
  const rows = Math.ceil(H / 120);
  const particles = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      // Posición base de la celda + ruido aleatorio dentro de la celda
      particles.push({
        x:     (col / cols) * W + Math.random() * (W / cols),
        y:     (row / rows) * H + Math.random() * (H / rows),
        r:     Math.random() * 2.2 + 0.6,
        vx:    (Math.random() - 0.5) * 0.6,
        vy:    (Math.random() - 0.5) * 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.35 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }
  return particles;
};

const makePulses = (W, H) =>
  Array.from({ length: 18 }, () => {
    const horiz = Math.random() > 0.5;
    return {
      horiz,
      x:     Math.random() * W,
      y:     Math.random() * H,
      speed: Math.random() * 1.5 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      len:   Math.random() * 60 + 30,
      alpha: Math.random() * 0.5 + 0.2,
    };
  });

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const state = { W: 0, H: 0, particles: [], pulses: [], animId: null };

    const init = () => {
      state.W = window.innerWidth;
      state.H = window.innerHeight;
      canvas.width  = state.W;
      canvas.height = state.H;
      state.particles = makeParticles(state.W, state.H);
      state.pulses    = makePulses(state.W, state.H);
    };

    const draw = () => {
      const { W, H, particles, pulses } = state;
      ctx.clearRect(0, 0, W, H);

      // Grid de circuito
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = "#00f5ff";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.globalAlpha = 0.07;
      ctx.fillStyle = "#00f5ff";
      for (let x = 0; x < W; x += GRID)
        for (let y = 0; y < H; y += GRID) {
          ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
        }

      // Pulsos de circuito
      pulses.forEach((p) => {
        if (p.horiz) {
          const sy = Math.round(p.y / GRID) * GRID;
          const g = ctx.createLinearGradient(p.x - p.len, sy, p.x, sy);
          g.addColorStop(0, p.color + "00"); g.addColorStop(1, p.color + "cc");
          ctx.beginPath(); ctx.moveTo(p.x - p.len, sy); ctx.lineTo(p.x, sy);
          ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.globalAlpha = p.alpha; ctx.stroke();
          p.x += p.speed;
          if (p.x > W + p.len) { p.x = -p.len; p.y = Math.floor(Math.random() * (H / GRID)) * GRID; }
        } else {
          const sx = Math.round(p.x / GRID) * GRID;
          const g = ctx.createLinearGradient(sx, p.y - p.len, sx, p.y);
          g.addColorStop(0, p.color + "00"); g.addColorStop(1, p.color + "cc");
          ctx.beginPath(); ctx.moveTo(sx, p.y - p.len); ctx.lineTo(sx, p.y);
          ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.globalAlpha = p.alpha; ctx.stroke();
          p.y += p.speed;
          if (p.y > H + p.len) { p.y = -p.len; p.x = Math.floor(Math.random() * (W / GRID)) * GRID; }
        }
      });

      // Partículas
      particles.forEach((p) => {
        p.pulse += 0.018;
        const a = Math.sin(p.pulse) * 0.2 + p.alpha;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = a; ctx.fill();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, p.color + "55"); g.addColorStop(1, p.color + "00");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.globalAlpha = a * 0.6; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      });

      // Líneas entre partículas cercanas
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = particles[i].color;
            ctx.globalAlpha = (1 - d / 130) * 0.18;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }

      ctx.globalAlpha = 1;
      state.animId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      cancelAnimationFrame(state.animId);
      init();
      draw();
    };

    init();
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(state.animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
};

export default ParticleBackground;