import jsPDF from 'jspdf';
import { portfolioContent, type Language } from './portfolioContent';

// ─── Constants ────────────────────────────────────────────────────────────────
const PAGE_W = 595.28;  // A4 pt
const PAGE_H = 841.89;
const ML = 45;          // left margin
const MR = 45;          // right margin
const MT = 42;          // top margin
const MB = 36;          // bottom margin
const CONTENT_W = PAGE_W - ML - MR;

// Colours
const C_DARK   = '#0f172a'; // slate-900
const C_AMBER  = '#f59e0b'; // amber-500
const C_GRAY   = '#64748b'; // slate-500
const C_LIGHT  = '#cbd5e1'; // slate-300
const C_LINE   = '#e2e8f0'; // separator

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function setColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setTextColor(r, g, b);
}

function setDrawColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setDrawColor(r, g, b);
}

function setFillColor(doc: jsPDF, hex: string) {
  const [r, g, b] = hexToRgb(hex);
  doc.setFillColor(r, g, b);
}

// ─── Page cursor helper ────────────────────────────────────────────────────────
function createCursor(doc: jsPDF) {
  let y = MT;

  function ensure(needed: number) {
    if (y + needed > PAGE_H - MB) {
      doc.addPage();
      y = MT;
    }
  }

  function gap(pt: number) { y += pt; }

  return { get y() { return y; }, set y(v) { y = v; }, ensure, gap };
}

// ─── Section header ───────────────────────────────────────────────────────────
function drawSectionHeader(doc: jsPDF, cur: ReturnType<typeof createCursor>, label: string, isRtl: boolean) {
  cur.ensure(28);
  cur.gap(6);
  setFillColor(doc, C_AMBER);
  doc.rect(ML, cur.y, 4, 14, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(doc, C_DARK);
  const tx = isRtl ? PAGE_W - MR : ML + 10;
  doc.text(label.toUpperCase(), tx, cur.y + 10, { align: isRtl ? 'right' : 'left' });
  cur.gap(18);
  setDrawColor(doc, C_LINE);
  doc.setLineWidth(0.5);
  doc.line(ML, cur.y, PAGE_W - MR, cur.y);
  cur.gap(8);
}

// ─── Text helpers ─────────────────────────────────────────────────────────────
function writeText(
  doc: jsPDF,
  cur: ReturnType<typeof createCursor>,
  text: string,
  opts: { size?: number; bold?: boolean; color?: string; indent?: number; align?: 'left' | 'right' | 'center'; lineH?: number }
) {
  const { size = 9.5, bold = false, color = C_DARK, indent = 0, align = 'left', lineH = 4.5 } = opts;
  doc.setFontSize(size);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  setColor(doc, color);
  const x = align === 'right' ? PAGE_W - MR : ML + indent;
  const maxW = CONTENT_W - indent;
  const lines = doc.splitTextToSize(text, maxW);
  const neededH = lines.length * (size * 0.352778 + lineH);
  cur.ensure(neededH + 4);
  doc.text(lines, x, cur.y, { align });
  cur.gap(neededH);
}

function writeTwoCol(
  doc: jsPDF,
  cur: ReturnType<typeof createCursor>,
  left: string,
  right: string,
  opts?: { bold?: boolean; size?: number; leftColor?: string; rightColor?: string }
) {
  const { bold = false, size = 9.5, leftColor = C_DARK, rightColor = C_GRAY } = opts ?? {};
  cur.ensure(14);
  doc.setFontSize(size);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  setColor(doc, leftColor);
  doc.text(left, ML, cur.y);
  setColor(doc, rightColor);
  doc.text(right, PAGE_W - MR, cur.y, { align: 'right' });
  cur.gap(size * 0.352778 + 5);
}

function writeBullet(doc: jsPDF, cur: ReturnType<typeof createCursor>, text: string) {
  cur.ensure(12);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setColor(doc, C_GRAY);
  doc.text('•', ML + 6, cur.y);
  setColor(doc, C_DARK);
  const lines = doc.splitTextToSize(text, CONTENT_W - 16);
  const h = lines.length * (9 * 0.352778 + 4);
  cur.ensure(h);
  doc.text(lines, ML + 14, cur.y);
  cur.gap(h);
}

// ─── Header banner ────────────────────────────────────────────────────────────
function drawHeader(doc: jsPDF, cur: ReturnType<typeof createCursor>, lang: Language) {
  const c = portfolioContent[lang].hero;
  const ab = portfolioContent[lang].about;

  // Background rect
  setFillColor(doc, C_DARK);
  doc.rect(0, 0, PAGE_W, 110, 'F');

  // Amber accent bar
  setFillColor(doc, C_AMBER);
  doc.rect(0, 108, PAGE_W, 3, 'F');

  // Name
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  setColor(doc, '#ffffff');
  doc.text(`${c.firstName} ${c.lastName}`, PAGE_W / 2, 38, { align: 'center' });

  // Title
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  setColor(doc, C_AMBER);
  const title = portfolioContent[lang].hero.title;
  doc.text(title, PAGE_W / 2, 52, { align: 'center' });

  // Contact line
  doc.setFontSize(8.5);
  setColor(doc, C_LIGHT);
  const q = portfolioContent[lang].hero.quickLinks;
  const contactLine = q.map(l => l.text).join('   |   ');
  doc.text(contactLine, PAGE_W / 2, 68, { align: 'center' });

  // Languages
  const langs = ab.languages.map(l => `${l.name}: ${l.level}`).join('   •   ');
  doc.text(langs, PAGE_W / 2, 80, { align: 'center' });

  cur.y = 122;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function downloadPortfolioPdf(fileName: string) {
  const lang: Language = fileName.includes('-ar.') ? 'ar' : 'en';
  const isRtl = lang === 'ar';
  const c = portfolioContent[lang];

  const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4', compress: true });
  const cur = createCursor(doc);

  // ── Header ──────────────────────────────────────────────────────────────────
  drawHeader(doc, cur, lang);

  // ── About / Summary ─────────────────────────────────────────────────────────
  drawSectionHeader(doc, cur, c.about.title, isRtl);
  c.about.summary.forEach(para => {
    writeText(doc, cur, para, { color: C_GRAY, size: 9.5 });
    cur.gap(4);
  });

  // Key Strengths
  cur.gap(6);
  writeText(doc, cur, c.about.strengthsTitle, { bold: true, size: 10, color: C_DARK });
  cur.gap(3);
  const half = Math.ceil(c.about.strengths.length / 2);
  const leftCol = c.about.strengths.slice(0, half);
  const rightCol = c.about.strengths.slice(half);
  const rowCount = Math.max(leftCol.length, rightCol.length);
  for (let i = 0; i < rowCount; i++) {
    cur.ensure(13);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    if (leftCol[i]) {
      setColor(doc, C_DARK);
      doc.text(`✓  ${leftCol[i]}`, ML + 4, cur.y);
    }
    if (rightCol[i]) {
      setColor(doc, C_DARK);
      doc.text(`✓  ${rightCol[i]}`, ML + CONTENT_W / 2 + 8, cur.y);
    }
    cur.gap(13);
  }

  // ── Experience ──────────────────────────────────────────────────────────────
  drawSectionHeader(doc, cur, c.experience.title, isRtl);
  c.experience.items.forEach((job, idx) => {
    cur.ensure(30);
    writeTwoCol(doc, cur, job.title, job.period, { bold: true, size: 10, leftColor: C_DARK, rightColor: C_GRAY });
    writeTwoCol(doc, cur, job.company, job.location, { size: 9, leftColor: C_AMBER, rightColor: C_GRAY });
    cur.gap(3);
    job.responsibilities.forEach(r => writeBullet(doc, cur, r));
    if (idx < c.experience.items.length - 1) cur.gap(8);
  });

  // ── Education ───────────────────────────────────────────────────────────────
  drawSectionHeader(doc, cur, c.education.title, isRtl);
  c.education.items.forEach((edu, idx) => {
    cur.ensure(28);
    writeTwoCol(doc, cur, edu.degree, edu.date, { bold: true, size: 10, leftColor: C_DARK, rightColor: C_GRAY });
    writeText(doc, cur, `${edu.institution} — ${edu.specialization}`, { size: 9, color: C_GRAY });
    edu.details.forEach(d => writeBullet(doc, cur, d));
    if (idx < c.education.items.length - 1) cur.gap(6);
  });

  // ── Skills ──────────────────────────────────────────────────────────────────
  drawSectionHeader(doc, cur, c.skills.title, isRtl);
  c.skills.categories.forEach(cat => {
    cur.ensure(18);
    writeText(doc, cur, cat.title, { bold: true, size: 10, color: C_DARK });
    cur.gap(2);
    cat.skills.forEach(sk => {
      cur.ensure(16);
      // Skill name
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      setColor(doc, C_DARK);
      doc.text(sk.name, ML + 4, cur.y);
      // Bar background
      const barX = ML + 130;
      const barW = CONTENT_W - 134;
      const barH = 6;
      setFillColor(doc, C_LINE);
      doc.rect(barX, cur.y - 6, barW, barH, 'F');
      // Bar fill
      setFillColor(doc, C_AMBER);
      doc.rect(barX, cur.y - 6, barW * (sk.level / 100), barH, 'F');
      // Percentage label
      doc.setFontSize(7.5);
      setColor(doc, C_GRAY);
      doc.text(`${sk.level}%`, barX + barW + 4, cur.y - 1);
      cur.gap(13);
    });
    cur.gap(4);
  });

  // ── Certifications ──────────────────────────────────────────────────────────
  drawSectionHeader(doc, cur, c.certifications.title, isRtl);
  c.certifications.items.forEach((cert, idx) => {
    cur.ensure(22);
    writeTwoCol(doc, cur, cert.title, cert.badge, { bold: true, size: 10, leftColor: C_DARK, rightColor: C_AMBER });
    writeText(doc, cur, cert.description, { size: 9, color: C_GRAY, indent: 4 });
    cert.details.forEach(d => writeBullet(doc, cur, d));
    if (idx < c.certifications.items.length - 1) cur.gap(6);
  });

  // ── Footer on each page ─────────────────────────────────────────────────────
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    setColor(doc, C_GRAY);
    doc.text(`${c.hero.firstName} ${c.hero.lastName}  ·  ${c.hero.quickLinks[1].text}`, ML, PAGE_H - 16);
    doc.text(`${i} / ${totalPages}`, PAGE_W - MR, PAGE_H - 16, { align: 'right' });
  }

  doc.save(fileName);
}
