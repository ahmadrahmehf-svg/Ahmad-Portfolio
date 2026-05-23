import jsPDF from 'jspdf';
import { portfolioContent, type Language } from './portfolioContent';

// ─── Page constants (A4 in points) ──────────────────────────────────────────
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const ML     = 42;   // left margin
const MR     = 42;   // right margin
const MT     = 40;   // top margin
const MB     = 36;   // bottom margin
const CW     = PAGE_W - ML - MR; // usable content width

// ─── Palette ─────────────────────────────────────────────────────────────────
const DARK   = '#0f172a';
const AMBER  = '#f59e0b';
const GRAY   = '#64748b';
const LIGHT  = '#e2e8f0';
const WHITE  = '#ffffff';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}
const tc  = (d: jsPDF, h: string) => d.setTextColor(...rgb(h));
const dc  = (d: jsPDF, h: string) => d.setDrawColor(...rgb(h));
const fc  = (d: jsPDF, h: string) => d.setFillColor(...rgb(h));

// ─── Cursor ───────────────────────────────────────────────────────────────────
function makeCursor(doc: jsPDF) {
  let _y = MT;
  return {
    get y()        { return _y; },
    set y(v:number){ _y = v;    },
    need(h:number) {
      if (_y + h > PAGE_H - MB) { doc.addPage(); _y = MT; }
    },
    skip(h:number) { _y += h; },
  };
}

type Cur = ReturnType<typeof makeCursor>;

// ─── Section header ───────────────────────────────────────────────────────────
function sectionHeader(doc: jsPDF, cur: Cur, label: string) {
  cur.need(32);
  cur.skip(10);
  // amber left bar
  fc(doc, AMBER);
  doc.rect(ML, cur.y, 4, 13, 'F');
  // label
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  tc(doc, DARK);
  doc.text(label.toUpperCase(), ML + 10, cur.y + 9.5);
  cur.skip(17);
  // divider
  dc(doc, LIGHT);
  doc.setLineWidth(0.4);
  doc.line(ML, cur.y, PAGE_W - MR, cur.y);
  cur.skip(8);
}

// ─── Text block ───────────────────────────────────────────────────────────────
function textBlock(
  doc: jsPDF, cur: Cur, text: string,
  { size=9.5, bold=false, color=DARK, indent=0, maxW=CW, gap=5 }: {
    size?:number; bold?:boolean; color?:string; indent?:number; maxW?:number; gap?:number
  } = {}
) {
  doc.setFontSize(size);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  tc(doc, color);
  const lines = doc.splitTextToSize(text, maxW - indent);
  const lineH = size * 0.4;
  const totalH = lines.length * (size * 0.352778 + lineH);
  cur.need(totalH + 2);
  doc.text(lines, ML + indent, cur.y);
  cur.skip(totalH + gap);
}

// ─── Two-column row ───────────────────────────────────────────────────────────
function twoCol(
  doc: jsPDF, cur: Cur,
  left: string, right: string,
  { size=9.5, boldLeft=false, boldRight=false, colorL=DARK, colorR=GRAY }: {
    size?:number; boldLeft?:boolean; boldRight?:boolean; colorL?:string; colorR?:string
  } = {}
) {
  cur.need(size * 0.352778 + 8);
  const y = cur.y;
  doc.setFontSize(size);
  doc.setFont('helvetica', boldLeft ? 'bold' : 'normal');
  tc(doc, colorL);
  doc.text(left, ML, y);
  doc.setFont('helvetica', boldRight ? 'bold' : 'normal');
  tc(doc, colorR);
  doc.text(right, PAGE_W - MR, y, { align: 'right' });
  cur.skip(size * 0.352778 + 6);
}

// ─── Bullet point ─────────────────────────────────────────────────────────────
function bullet(doc: jsPDF, cur: Cur, text: string) {
  const size = 9;
  const indent = 14;
  const lines = doc.splitTextToSize(text, CW - indent);
  const lineH = size * 0.4;
  const h = lines.length * (size * 0.352778 + lineH);
  cur.need(h + 2);
  doc.setFontSize(size);
  doc.setFont('helvetica', 'normal');
  tc(doc, GRAY);
  doc.text('-', ML + 4, cur.y);
  tc(doc, DARK);
  doc.text(lines, ML + indent, cur.y);
  cur.skip(h + 2);
}

// ─── Skill row with bar ───────────────────────────────────────────────────────
function skillRow(doc: jsPDF, cur: Cur, name: string, pct: number) {
  const rowH = 17;
  cur.need(rowH);
  const top = cur.y; // top of this row slot

  // Name (text baseline = top + 10)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  tc(doc, DARK);
  doc.text(name, ML + 4, top + 10);

  // Bar geometry
  const barX  = ML + 138;
  const barW  = CW - 142;
  const barH  = 7;
  const barY  = top + 4; // top of bar rect

  // Background
  fc(doc, LIGHT);
  doc.rect(barX, barY, barW, barH, 'F');
  // Fill
  fc(doc, AMBER);
  doc.rect(barX, barY, barW * (pct / 100), barH, 'F');
  // Percentage label (baseline aligned with bar centre)
  doc.setFontSize(7.5);
  tc(doc, GRAY);
  doc.text(`${pct}%`, barX + barW + 5, top + 10);

  cur.skip(rowH);
}

// ─── Header banner ────────────────────────────────────────────────────────────
function drawBanner(doc: jsPDF, cur: Cur, lang: Language) {
  const hero = portfolioContent[lang].hero;
  const ab   = portfolioContent[lang].about;

  // Dark background
  fc(doc, DARK);
  doc.rect(0, 0, PAGE_W, 112, 'F');
  // Amber accent stripe
  fc(doc, AMBER);
  doc.rect(0, 110, PAGE_W, 3, 'F');

  // Name
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  tc(doc, WHITE);
  doc.text(`${hero.firstName} ${hero.lastName}`, PAGE_W / 2, 38, { align: 'center' });

  // Title
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  tc(doc, AMBER);
  doc.text(hero.title, PAGE_W / 2, 53, { align: 'center' });

  // Contact
  doc.setFontSize(8.5);
  tc(doc, LIGHT);
  const contacts = hero.quickLinks.map(l => l.text).join('   |   ');
  doc.text(contacts, PAGE_W / 2, 68, { align: 'center' });

  // Languages
  const langs = ab.languages.map(l => `${l.name}: ${l.level}`).join('   -   ');
  doc.text(langs, PAGE_W / 2, 82, { align: 'center' });

  cur.y = 124;
}

// ─── Main export ─────────────────────────────────────────────────────────────
export async function downloadPortfolioPdf(fileName: string) {
  const lang: Language = fileName.includes('-ar.') ? 'ar' : 'en';
  const c = portfolioContent[lang];

  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
  const cur = makeCursor(doc);

  // ── Banner ────────────────────────────────────────────────────────────────
  drawBanner(doc, cur, lang);

  // ── About ─────────────────────────────────────────────────────────────────
  sectionHeader(doc, cur, c.about.title);
  c.about.summary.forEach(p => textBlock(doc, cur, p, { color: GRAY, gap: 6 }));

  // Key Strengths (2-column grid using simple ASCII dash)
  cur.skip(4);
  textBlock(doc, cur, c.about.strengthsTitle, { bold: true, size: 10, gap: 4 });
  const strengths = c.about.strengths;
  const half = Math.ceil(strengths.length / 2);
  for (let i = 0; i < half; i++) {
    const left  = strengths[i]       ? `* ${strengths[i]}`       : '';
    const right = strengths[i+half]  ? `* ${strengths[i+half]}`  : '';
    const needH = 13;
    cur.need(needH);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    tc(doc, DARK);
    if (left)  doc.text(left,  ML + 4,          cur.y);
    if (right) doc.text(right, ML + CW / 2 + 8, cur.y);
    cur.skip(needH);
  }

  // ── Experience ────────────────────────────────────────────────────────────
  sectionHeader(doc, cur, c.experience.title);
  c.experience.items.forEach((job, idx) => {
    cur.need(40);
    twoCol(doc, cur, job.title, job.period,
      { boldLeft: true, size: 10.5, colorL: DARK, colorR: GRAY });
    twoCol(doc, cur, job.company, job.location,
      { size: 9, colorL: AMBER, colorR: GRAY });
    cur.skip(2);
    job.responsibilities.forEach(r => bullet(doc, cur, r));
    if (idx < c.experience.items.length - 1) cur.skip(8);
  });

  // ── Education ─────────────────────────────────────────────────────────────
  sectionHeader(doc, cur, c.education.title);
  c.education.items.forEach((edu, idx) => {
    cur.need(36);
    twoCol(doc, cur, edu.degree, edu.date,
      { boldLeft: true, size: 10.5, colorL: DARK, colorR: GRAY });
    textBlock(doc, cur,
      `${edu.institution}  -  ${edu.specialization}`,
      { size: 9, color: AMBER, gap: 3 });
    edu.details.forEach(d => bullet(doc, cur, d));
    if (idx < c.education.items.length - 1) cur.skip(6);
  });

  // ── Skills ────────────────────────────────────────────────────────────────
  sectionHeader(doc, cur, c.skills.title);
  c.skills.categories.forEach(cat => {
    // Keep category title + at least 2 skill rows together
    cur.need(17 * Math.min(cat.skills.length, 2) + 20);
    textBlock(doc, cur, cat.title, { bold: true, size: 10, gap: 4 });
    cat.skills.forEach(sk => skillRow(doc, cur, sk.name, sk.level));
    cur.skip(6);
  });

  // ── Certifications ────────────────────────────────────────────────────────
  sectionHeader(doc, cur, c.certifications.title);
  c.certifications.items.forEach((cert, idx) => {
    cur.need(36);
    twoCol(doc, cur, cert.title, cert.badge,
      { boldLeft: true, size: 10.5, colorL: DARK, colorR: AMBER });
    textBlock(doc, cur, cert.description, { size: 9, color: GRAY, indent: 4, gap: 3 });
    cert.details.forEach(d => bullet(doc, cur, d));
    if (idx < c.certifications.items.length - 1) cur.skip(6);
  });

  // ── Footer on every page ─────────────────────────────────────────────────
  const total = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    tc(doc, GRAY);
    doc.text(
      `${c.hero.firstName} ${c.hero.lastName}  |  ${c.hero.quickLinks[1].text}`,
      ML, PAGE_H - 14
    );
    doc.text(`${p} / ${total}`, PAGE_W - MR, PAGE_H - 14, { align: 'right' });
  }

  doc.save(fileName);
}
