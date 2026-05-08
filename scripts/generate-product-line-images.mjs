import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const navigationSource = fs.readFileSync(path.join(root, "lib/shop-navigation.ts"), "utf8");
const outputDir = path.join(root, "public", "images", "product-lines");

fs.mkdirSync(outputDir, { recursive: true });

const subcategorySource = navigationSource.match(
  /export const polarCamelSubcategories = \[([\s\S]*?)\] satisfies/
)?.[1];

if (!subcategorySource) {
  throw new Error("Could not locate polarCamelSubcategories.");
}

const subcategories = Array.from(
  subcategorySource.matchAll(
    /\{\s*slug: "([^"]+)", label: "([^"]+)", group: "([^"]+)", groupLabel: "([^"]+)", category: "([^"]+)"/g
  ),
  ([, slug, label, group, groupLabel, category]) => ({
    slug,
    label,
    group,
    groupLabel,
    category,
  })
);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function palette(item) {
  if (item.category === "glassware") {
    return ["#0d1117", "#1d2a32", "#5fd4ff", "#ff6b00"];
  }

  if (item.category === "home-goods") {
    return ["#11100d", "#2b2216", "#d8a657", "#ff6b00"];
  }

  if (item.group === "ion-plated-drinkware") {
    return ["#0e1018", "#29223a", "#d7b8ff", "#ff6b00"];
  }

  if (item.group === "drinkware-accessories") {
    return ["#111315", "#20272b", "#8fb6c5", "#ff6b00"];
  }

  if (item.group === "with-grips-sport-tumblers") {
    return ["#0f1110", "#18251f", "#85d38c", "#ff6b00"];
  }

  return ["#101214", "#25282c", "#d5dde6", "#ff6b00"];
}

function tumbler(x, y, w, h, fill, accent, grip = false) {
  const lidY = y + h * 0.08;
  const bodyTop = y + h * 0.16;
  const bodyBottom = y + h * 0.9;
  const body = `
    <ellipse cx="${x + w / 2}" cy="${lidY}" rx="${w * 0.45}" ry="${h * 0.055}" fill="#eef2f5" opacity="0.95"/>
    <path d="M ${x + w * 0.16} ${bodyTop} L ${x + w * 0.84} ${bodyTop} L ${x + w * 0.72} ${bodyBottom} Q ${x + w / 2} ${y + h * 0.96} ${x + w * 0.28} ${bodyBottom} Z" fill="${fill}"/>
    <path d="M ${x + w * 0.23} ${bodyTop + 10} L ${x + w * 0.5} ${bodyTop + 8} L ${x + w * 0.43} ${bodyBottom - 16} L ${x + w * 0.31} ${bodyBottom - 4} Z" fill="#fff" opacity="0.16"/>
    <rect x="${x + w * 0.28}" y="${y + h * 0.44}" width="${w * 0.44}" height="${h * 0.17}" rx="12" fill="${accent}" opacity="0.82"/>
    <rect x="${x + w * 0.36}" y="${bodyBottom - 36}" width="${w * 0.28}" height="6" rx="3" fill="#050505" opacity="0.35"/>
    <rect x="${x + w * 0.34}" y="${bodyBottom - 22}" width="${w * 0.32}" height="5" rx="2.5" fill="#050505" opacity="0.28"/>
  `;

  if (!grip) {
    return body;
  }

  return `${body}
    <rect x="${x + w * 0.18}" y="${y + h * 0.45}" width="${w * 0.64}" height="${h * 0.18}" rx="16" fill="#101010" opacity="0.5"/>
    <path d="M ${x + w * 0.23} ${y + h * 0.5} H ${x + w * 0.77}" stroke="#fff" stroke-width="5" opacity="0.34"/>
  `;
}

function bottle(x, y, w, h, fill, accent) {
  return `
    <rect x="${x + w * 0.36}" y="${y + h * 0.06}" width="${w * 0.28}" height="${h * 0.14}" rx="8" fill="#e7ecef"/>
    <path d="M ${x + w * 0.24} ${y + h * 0.2} Q ${x + w * 0.5} ${y + h * 0.12} ${x + w * 0.76} ${y + h * 0.2} L ${x + w * 0.72} ${y + h * 0.9} Q ${x + w * 0.5} ${y + h * 0.98} ${x + w * 0.28} ${y + h * 0.9} Z" fill="${fill}"/>
    <rect x="${x + w * 0.31}" y="${y + h * 0.46}" width="${w * 0.38}" height="${h * 0.18}" rx="12" fill="${accent}" opacity="0.85"/>
    <path d="M ${x + w * 0.34} ${y + h * 0.24} L ${x + w * 0.48} ${y + h * 0.21} L ${x + w * 0.43} ${y + h * 0.85}" stroke="#fff" stroke-width="18" opacity="0.13"/>
  `;
}

function glassware(x, y, w, h, accent) {
  return `
    <path d="M ${x + w * 0.2} ${y + h * 0.1} H ${x + w * 0.8} L ${x + w * 0.68} ${y + h * 0.62} Q ${x + w * 0.5} ${y + h * 0.7} ${x + w * 0.32} ${y + h * 0.62} Z" fill="#dff6ff" opacity="0.42"/>
    <path d="M ${x + w * 0.5} ${y + h * 0.7} V ${y + h * 0.9}" stroke="#dff6ff" stroke-width="12" opacity="0.42"/>
    <path d="M ${x + w * 0.32} ${y + h * 0.92} H ${x + w * 0.68}" stroke="#dff6ff" stroke-width="12" opacity="0.42"/>
    <path d="M ${x + w * 0.26} ${y + h * 0.34} Q ${x + w * 0.5} ${y + h * 0.46} ${x + w * 0.74} ${y + h * 0.34}" stroke="${accent}" stroke-width="10" opacity="0.9"/>
  `;
}

function bowl(x, y, w, h, accent) {
  return `
    <ellipse cx="${x + w / 2}" cy="${y + h * 0.35}" rx="${w * 0.42}" ry="${h * 0.16}" fill="#f6f1e8"/>
    <path d="M ${x + w * 0.12} ${y + h * 0.35} Q ${x + w * 0.5} ${y + h * 1.04} ${x + w * 0.88} ${y + h * 0.35} Z" fill="#ded0b8"/>
    <ellipse cx="${x + w / 2}" cy="${y + h * 0.35}" rx="${w * 0.34}" ry="${h * 0.1}" fill="${accent}" opacity="0.75"/>
  `;
}

function accessory(x, y, w, h, accent) {
  return `
    <rect x="${x + w * 0.16}" y="${y + h * 0.36}" width="${w * 0.68}" height="${h * 0.24}" rx="24" fill="#e9eef1"/>
    <circle cx="${x + w * 0.32}" cy="${y + h * 0.48}" r="${h * 0.11}" fill="${accent}"/>
    <path d="M ${x + w * 0.55} ${y + h * 0.22} C ${x + w * 0.9} ${y + h * 0.18} ${x + w * 0.92} ${y + h * 0.78} ${x + w * 0.54} ${y + h * 0.76}" fill="none" stroke="#c7d2da" stroke-width="18" stroke-linecap="round"/>
  `;
}

function mainShape(item, colors) {
  const [, , light, accent] = colors;
  const label = item.label.toLowerCase();

  if (item.category === "glassware") {
    return `${glassware(110, 68, 160, 230, accent)}${glassware(340, 82, 150, 210, light)}`;
  }

  if (item.category === "home-goods") {
    return label.includes("bowl")
      ? `${bowl(125, 95, 190, 180, accent)}${bowl(330, 105, 170, 160, light)}`
      : `${bottle(126, 58, 150, 250, "#25282c", accent)}${bowl(330, 116, 176, 154, light)}`;
  }

  if (item.group === "drinkware-accessories") {
    return `${accessory(110, 92, 190, 170, accent)}${accessory(338, 106, 160, 150, light)}`;
  }

  if (label.includes("bottle")) {
    return `${bottle(146, 48, 150, 262, "#2d3338", accent)}${bottle(340, 64, 130, 236, light, accent)}`;
  }

  if (label.includes("mug") || label.includes("coffee")) {
    return `${tumbler(130, 56, 150, 250, "#34393f", accent, item.group === "with-grips-sport-tumblers")}<path d="M 282 162 C 360 126 374 236 292 226" fill="none" stroke="${light}" stroke-width="20" opacity="0.7"/>${tumbler(365, 82, 112, 210, light, accent)}`;
  }

  return `${tumbler(142, 54, 150, 255, "#25292e", accent, item.group === "with-grips-sport-tumblers")} ${tumbler(342, 70, 130, 235, light, accent, item.slug.includes("slider-lid"))}`;
}

function svg(item) {
  const [bg1, bg2, light, accent] = palette(item);
  const title = escapeXml(item.label);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">Generated product line image for ${title}.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop stop-color="${bg1}" offset="0"/>
      <stop stop-color="${bg2}" offset="1"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="25%" r="55%">
      <stop stop-color="${accent}" stop-opacity="0.28" offset="0"/>
      <stop stop-color="${accent}" stop-opacity="0" offset="1"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>
  <rect width="640" height="360" fill="url(#bg)"/>
  <rect width="640" height="360" fill="url(#glow)"/>
  <path d="M 0 286 C 142 244 246 320 370 282 C 502 241 568 266 640 230 V 360 H 0 Z" fill="#ffffff" opacity="0.07"/>
  <g filter="url(#shadow)">
    ${mainShape(item, [bg1, bg2, light, accent])}
  </g>
  <path d="M 44 310 H 596" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.95"/>
</svg>
`;
}

for (const item of subcategories) {
  fs.writeFileSync(path.join(outputDir, `${item.slug}.svg`), svg(item));
}

console.log(`Generated ${subcategories.length} product-line images.`);
