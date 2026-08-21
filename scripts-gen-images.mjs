import { writeFileSync, mkdirSync } from "fs";
mkdirSync("public/images", { recursive: true });
const rng = (seed) => { let s = seed; return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296; };

const defs = (extra = "") => `
  <filter id="grain" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="4" seed="9" result="n"/>
    <feColorMatrix type="saturate" values="0" in="n"/>
  </filter>
  <filter id="b1"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="b2"><feGaussianBlur stdDeviation="7"/></filter>
  <radialGradient id="vig" cx="50%" cy="46%" r="72%">
    <stop offset="55%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.30"/>
  </radialGradient>${extra}`;

/* ---------------- macro crystal field with depth of field ---------------- */
function crystalField({ w = 1600, h = 1200, seed = 1, base, glow, hi, mid, lo, spec, dark = false }) {
  const r = rng(seed);
  const layer = (count, minS, maxS, opLo, opHi) => {
    let s = "";
    for (let i = 0; i < count; i++) {
      const x = r() * w, y = r() * h;
      const sz = minS + r() * (maxS - minS);
      const hgt = sz * (0.72 + r() * 0.62);
      const rot = r() * 90;
      const op = opLo + r() * (opHi - opLo);
      const pick = r();
      const fill = pick > 0.72 ? hi : pick > 0.36 ? mid : lo;
      s += `<g transform="rotate(${rot.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" opacity="${op.toFixed(2)}">`;
      s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz.toFixed(1)}" height="${hgt.toFixed(1)}" rx="${(sz * 0.08).toFixed(1)}" fill="${fill}"/>`;
      if (r() > 0.55) // specular facet
        s += `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${(x + sz).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y + hgt * 0.55).toFixed(1)} Z" fill="${spec}" opacity="0.45"/>`;
      s += `</g>`;
    }
    return s;
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><defs>
  <radialGradient id="bg" cx="42%" cy="34%" r="88%"><stop offset="0%" stop-color="${glow}"/><stop offset="100%" stop-color="${base}"/></radialGradient>
  ${defs()}</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<g filter="url(#b1)" opacity="0.55">${layer(900, 4, 16, 0.10, 0.40)}</g>
<g>${layer(620, 14, 52, 0.22, 0.80)}</g>
<g filter="url(#b2)" opacity="0.7">${layer(60, 70, 190, 0.10, 0.34)}</g>
${dark ? `<g opacity="0.30"><path d="M${w * 0.1} 0 L${w * 0.34} ${h} L${w * 0.46} ${h} L${w * 0.22} 0 Z" fill="#C5A24A" opacity="0.18"/><path d="M${w * 0.52} 0 L${w * 0.74} ${h} L${w * 0.80} ${h} L${w * 0.60} 0 Z" fill="#C5A24A" opacity="0.10"/></g>` : ""}
<rect width="${w}" height="${h}" fill="url(#vig)"/>
<rect width="${w}" height="${h}" filter="url(#grain)" opacity="${dark ? 0.10 : 0.07}"/>
</svg>`;
}

/* ---------------- hairline technical drawing over a tonal wash ---------------- */
function technical({ w = 1600, h = 900, seed = 3, top, bottom, ink, accent, kind, inkOp = 0.5 }) {
  const r = rng(seed);
  const hz = h * 0.66;
  let art = "";
  const L = (d, sw = 1, op = inkOp, c = ink) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" opacity="${op}" stroke-linecap="square"/>`;

  // horizon strata common to all
  for (let i = 0; i < 7; i++) {
    const y = hz + i * (h * 0.045);
    art += `<rect x="0" y="${y}" width="${w}" height="${h * 0.045}" fill="${ink}" opacity="${(0.04 + i * 0.022).toFixed(3)}"/>`;
  }
  art += L(`M0 ${hz} H${w}`, 1, 0.55, accent);

  if (kind === "port") {
    const vy = hz, vx = w * 0.06, vw = w * 0.52, vh = h * 0.075;
    art += L(`M${vx} ${vy} H${vx + vw} L${vx + vw - 58} ${vy + vh} H${vx + 44} Z`, 1.2, 0.55);
    for (let i = 0; i < 30; i++) {
      const cw = vw / 34, cx = vx + 34 + i * cw, ch = h * (0.018 + (i % 4) * 0.011);
      art += L(`M${cx} ${vy} v${-ch} h${cw - 4} v${ch}`, 1, 0.34);
    }
    for (let c = 0; c < 3; c++) {
      const gx = w * 0.60 + c * (w * 0.135), gt = hz - h * 0.30;
      art += L(`M${gx} ${hz} V${gt} M${gx + 54} ${hz} V${gt} M${gx - 90} ${gt} H${gx + 132} M${gx + 27} ${gt} V${gt - h * 0.07}`, 1.1, 0.5);
    }
  }
  if (kind === "mill") {
    const bx = w * 0.14, bw = w * 0.46, bh = h * 0.22;
    art += L(`M${bx} ${hz} V${hz - bh} H${bx + bw} V${hz}`, 1.2, 0.55);
    let saw = `M${bx} ${hz - bh} `;
    for (let i = 0; i < 10; i++) { const sx = bx + (bw / 10) * i; saw += `L${sx + bw / 20} ${hz - bh - h * 0.035} L${sx + bw / 10} ${hz - bh} `; }
    art += L(saw, 1, 0.5);
    for (let i = 0; i < 3; i++) {
      const sx = bx + bw + w * 0.04 + i * 52;
      art += L(`M${sx} ${hz} V${hz - h * (0.40 + i * 0.03)} h20 V${hz}`, 1.1, 0.5);
      art += `<ellipse cx="${sx + 10}" cy="${hz - h * (0.43 + i * 0.03)}" rx="${64 + i * 14}" ry="${24 + i * 6}" fill="${accent}" opacity="0.09"/>`;
    }
    for (let i = 0; i < 5; i++) { const sx = w * 0.02 + i * 42; art += L(`M${sx} ${hz} V${hz - h * 0.18} a17 17 0 0 1 34 0 V${hz}`, 1, 0.4); }
  }
  if (kind === "warehouse") {
    for (let row = 0; row < 6; row++)
      for (let col = 0; col < 16; col++) {
        if (r() > 0.93) continue;
        const bw2 = w / 17, bh2 = h * 0.058, bx = col * bw2 + 14, by = hz - (row + 1) * bh2;
        art += L(`M${bx} ${by} h${bw2 - 14} v${bh2 - 6} h${-(bw2 - 14)} Z`, 1, 0.16 + row * 0.06);
      }
    art += L(`M0 ${hz} H${w}`, 1.4, 0.5);
  }
  if (kind === "cane") {
    for (let i = 0; i < 150; i++) {
      const x = r() * w, ht = h * (0.14 + r() * 0.38), sway = (r() - 0.5) * 46;
      art += L(`M${x} ${hz + h * 0.03} Q${x + sway / 2} ${hz - ht / 2} ${x + sway} ${hz - ht}`, 0.9 + r() * 1.3, 0.14 + r() * 0.42);
      if (r() > 0.7) art += L(`M${x + sway * 0.6} ${hz - ht * 0.62} l${18 + r() * 26} ${-(10 + r() * 16)}`, 0.9, 0.22);
    }
  }
  if (kind === "ledger") {
    for (let i = 0; i < 26; i++) {
      const y = h * 0.14 + i * (h * 0.027);
      art += L(`M${w * 0.09} ${y} H${w * 0.09 + (0.20 + r() * 0.44) * w}`, 1.4, 0.10 + r() * 0.16);
    }
    const cx = w * 0.78, cy = h * 0.50, rad = h * 0.15;
    art += L(`M${cx - rad} ${cy} a${rad} ${rad} 0 1 0 ${rad * 2} 0 a${rad} ${rad} 0 1 0 ${-rad * 2} 0`, 1.4, 0.5, accent);
    art += L(`M${cx - rad * 0.74} ${cy} a${rad * 0.74} ${rad * 0.74} 0 1 0 ${rad * 1.48} 0 a${rad * 0.74} ${rad * 0.74} 0 1 0 ${-rad * 1.48} 0`, 1, 0.3, accent);
    art += L(`M${cx - rad * 0.4} ${cy} l${rad * 0.28} ${rad * 0.32} l${rad * 0.55} -${rad * 0.62}`, 2.2, 0.75, accent);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"><defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${top}"/><stop offset="100%" stop-color="${bottom}"/></linearGradient>
  ${defs()}</defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<circle cx="${w * 0.78}" cy="${h * 0.22}" r="${h * 0.11}" fill="${accent}" opacity="0.07"/>
${art}
<rect width="${w}" height="${h}" fill="url(#vig)" opacity="0.6"/>
<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.06"/>
</svg>`;
}

const out = {
  "hero-supply.svg": crystalField({ w: 1920, h: 1080, seed: 11, base: "#131110", glow: "#37312A", hi: "#6E6355", mid: "#3A342C", lo: "#211E1A", spec: "#C5A24A", dark: true }),
  "products-hero.svg": crystalField({ w: 1920, h: 900, seed: 91, base: "#16130F", glow: "#3E362B", hi: "#7A6C57", mid: "#413931", lo: "#241F1A", spec: "#C5A24A", dark: true }),
  "program-brazil.svg": technical({ w: 1920, h: 1000, seed: 61, top: "#2C271F", bottom: "#131110", ink: "#E8DCC2", accent: "#C5A24A", kind: "cane", inkOp: 0.42 }),
  "compliance.svg": technical({ w: 1920, h: 900, seed: 71, top: "#262320", bottom: "#131110", ink: "#EDE7DC", accent: "#C5A24A", kind: "ledger", inkOp: 0.4 }),
  "trade-desk.svg": technical({ w: 1920, h: 900, seed: 81, top: "#242220", bottom: "#121110", ink: "#EDE7DC", accent: "#C5A24A", kind: "port", inkOp: 0.38 }),

  "mill.svg": technical({ seed: 21, top: "#F4F0E8", bottom: "#E2DACB", ink: "#6A4A2B", accent: "#C5A24A", kind: "mill" }),
  "port.svg": technical({ seed: 31, top: "#F2EEE7", bottom: "#DDD6C9", ink: "#3A342C", accent: "#C5A24A", kind: "port" }),
  "warehouse.svg": technical({ seed: 41, top: "#FAF8F4", bottom: "#EAE3D8", ink: "#6A4A2B", accent: "#C5A24A", kind: "warehouse" }),
  "cane-field.svg": technical({ seed: 51, top: "#F1EBDE", bottom: "#DED2BC", ink: "#6A4A2B", accent: "#C5A24A", kind: "cane" }),

  "product-icumsa-45.svg": crystalField({ seed: 101, base: "#E6E3DC", glow: "#FFFFFF", hi: "#FFFFFF", mid: "#F2EFE9", lo: "#CFC9BC", spec: "#FFFFFF" }),
  "product-icumsa-150.svg": crystalField({ seed: 111, base: "#DED6C4", glow: "#FAF6EC", hi: "#FCF8EE", mid: "#EADFC7", lo: "#C3B69B", spec: "#FFFDF7" }),
  "product-vhp.svg": crystalField({ seed: 121, base: "#9A6C39", glow: "#DCAF75", hi: "#F0D3A6", mid: "#C08D51", lo: "#754E27", spec: "#FBEBD2" }),
  "product-vvhp.svg": crystalField({ seed: 131, base: "#B98F58", glow: "#EFD3A8", hi: "#FAEBD1", mid: "#D8AE76", lo: "#8E6836", spec: "#FFF6E6" }),
  "product-beet.svg": crystalField({ seed: 141, base: "#E4E2DD", glow: "#FCFBF9", hi: "#FFFFFF", mid: "#EFEDE9", lo: "#C9C6BE", spec: "#FFFFFF" }),
};
for (const [name, svg] of Object.entries(out)) writeFileSync(`public/images/${name}`, svg.trim());
console.log("generated", Object.keys(out).length);
