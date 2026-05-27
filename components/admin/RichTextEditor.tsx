'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CharacterCount from '@tiptap/extension-character-count';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Typography from '@tiptap/extension-typography';
import { useState, useRef, useEffect, useCallback } from 'react';

// ── Color palettes ─────────────────────────────────────────────────────────────

const TEXT_COLORS = [
  { label: 'Default',    value: '' },
  { label: 'Black',      value: '#000000' },
  { label: 'Navy',       value: '#0A1628' },
  { label: 'Dark Gray',  value: '#374151' },
  { label: 'Gray',       value: '#6b7280' },
  { label: 'Red',        value: '#dc2626' },
  { label: 'Orange',     value: '#ea580c' },
  { label: 'Amber',      value: '#d97706' },
  { label: 'Green',      value: '#16a34a' },
  { label: 'Teal',       value: '#0891b2' },
  { label: 'Blue',       value: '#2563eb' },
  { label: 'Brand Blue', value: '#4A86B8' },
  { label: 'Purple',     value: '#7c3aed' },
  { label: 'White',      value: '#ffffff' },
];

const HIGHLIGHT_COLORS = [
  { label: 'None',       value: '' },
  { label: 'Yellow',     value: '#fef08a' },
  { label: 'Green',      value: '#bbf7d0' },
  { label: 'Blue',       value: '#bfdbfe' },
  { label: 'Red',        value: '#fecaca' },
  { label: 'Orange',     value: '#fed7aa' },
  { label: 'Purple',     value: '#e9d5ff' },
  { label: 'Pink',       value: '#fbcfe8' },
];

// ── Toolbar primitives ─────────────────────────────────────────────────────────

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
  danger,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); if (!disabled) onClick(); }}
      disabled={disabled}
      title={title}
      className={[
        'flex items-center justify-center min-w-[26px] h-[26px] px-1.5 rounded-[2px]',
        'text-[11px] font-mono transition-colors duration-100 select-none leading-none',
        active
          ? 'bg-[#0A1628] text-white'
          : danger
          ? 'text-red-500 hover:bg-red-50'
          : 'text-black/50 hover:text-black hover:bg-black/[0.07]',
        disabled ? 'opacity-20 pointer-events-none' : 'cursor-pointer',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-4 bg-black/[0.10] mx-0.5 shrink-0" />;
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>;
}

// ── Precise SVG icons ──────────────────────────────────────────────────────────

function IAlignL() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <rect x="0" y="0" width="13" height="1.4" rx="0.7"/>
    <rect x="0" y="2.9" width="9" height="1.4" rx="0.7"/>
    <rect x="0" y="5.8" width="13" height="1.4" rx="0.7"/>
    <rect x="0" y="8.6" width="7" height="1.4" rx="0.7"/>
  </svg>;
}
function IAlignC() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <rect x="0" y="0" width="13" height="1.4" rx="0.7"/>
    <rect x="2" y="2.9" width="9" height="1.4" rx="0.7"/>
    <rect x="0" y="5.8" width="13" height="1.4" rx="0.7"/>
    <rect x="3" y="8.6" width="7" height="1.4" rx="0.7"/>
  </svg>;
}
function IAlignR() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <rect x="0" y="0" width="13" height="1.4" rx="0.7"/>
    <rect x="4" y="2.9" width="9" height="1.4" rx="0.7"/>
    <rect x="0" y="5.8" width="13" height="1.4" rx="0.7"/>
    <rect x="6" y="8.6" width="7" height="1.4" rx="0.7"/>
  </svg>;
}
function IAlignJ() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <rect x="0" y="0" width="13" height="1.4" rx="0.7"/>
    <rect x="0" y="2.9" width="13" height="1.4" rx="0.7"/>
    <rect x="0" y="5.8" width="13" height="1.4" rx="0.7"/>
    <rect x="0" y="8.6" width="13" height="1.4" rx="0.7"/>
  </svg>;
}
function IBullet() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <circle cx="1.5" cy="1.5" r="1.5"/>
    <rect x="4" y="0.5" width="9" height="2" rx="1"/>
    <circle cx="1.5" cy="5" r="1.5"/>
    <rect x="4" y="4" width="9" height="2" rx="1"/>
    <circle cx="1.5" cy="8.5" r="1.5"/>
    <rect x="4" y="7.5" width="9" height="2" rx="1"/>
  </svg>;
}
function IOrdered() {
  return <svg width="13" height="10" viewBox="0 0 13 10" fill="currentColor">
    <text x="0" y="3" fontSize="3.5" fontFamily="monospace">1.</text>
    <rect x="4" y="0.5" width="9" height="2" rx="1"/>
    <text x="0" y="7.5" fontSize="3.5" fontFamily="monospace">2.</text>
    <rect x="4" y="5" width="9" height="2" rx="1"/>
    <text x="0" y="12" fontSize="3.5" fontFamily="monospace">3.</text>
    <rect x="4" y="9" width="9" height="2" rx="1"/>
  </svg>;
}
function IQuote() {
  return <svg width="11" height="9" viewBox="0 0 11 9" fill="currentColor">
    <path d="M0 5C0 2.2 1.8.5 5 0l.5 1C3.5 1.5 2.5 3 2.5 4.5h1V9H0V5zm5.5 0C5.5 2.2 7.3.5 10.5 0l.5 1c-2 .5-3 2-3 3.5h1V9H5.5V5z" opacity=".85"/>
  </svg>;
}
function ICode() {
  return <svg width="13" height="9" viewBox="0 0 13 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,1 1,4.5 4,8"/>
    <polyline points="9,1 12,4.5 9,8"/>
  </svg>;
}
function ICodeBlock() {
  return <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="0.6" y="0.6" width="11.8" height="9.8" rx="1.2"/>
    <line x1="0.6" y1="3.5" x2="12.4" y2="3.5"/>
    <line x1="3" y1="6" x2="5.5" y2="6" strokeLinecap="round"/>
    <line x1="3" y1="7.8" x2="7" y2="7.8" strokeLinecap="round"/>
  </svg>;
}
function ILink() {
  return <svg width="13" height="7" viewBox="0 0 13 7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M5 3.5h3"/>
    <path d="M1.5 3.5a2 2 0 1 0 0-3h0a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1.5"/>
    <path d="M11.5 3.5a2 2 0 1 1 0-3h0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H9.5"/>
  </svg>;
}
function IImage() {
  return <svg width="13" height="11" viewBox="0 0 13 11" fill="none" stroke="currentColor" strokeWidth="1.2">
    <rect x="0.6" y="0.6" width="11.8" height="9.8" rx="1"/>
    <circle cx="3.8" cy="3.5" r="1.2" fill="currentColor" stroke="none"/>
    <polyline points="0.6,7.5 4.5,4.5 7,7 9.5,4.5 12.4,7.5" strokeLinejoin="round"/>
  </svg>;
}
function ITable() {
  return <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.1">
    <rect x="0.5" y="0.5" width="11" height="9" rx="0.5"/>
    <line x1="4" y1="0.5" x2="4" y2="9.5"/>
    <line x1="8" y1="0.5" x2="8" y2="9.5"/>
    <line x1="0.5" y1="3.3" x2="11.5" y2="3.3"/>
    <line x1="0.5" y1="6.6" x2="11.5" y2="6.6"/>
  </svg>;
}
function IHr() {
  return <svg width="13" height="5" viewBox="0 0 13 5" fill="currentColor">
    <rect x="0" y="2" width="13" height="1"/>
    <circle cx="6.5" cy="2.5" r="1.5"/>
  </svg>;
}
function IUndo() {
  return <svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4.5V1"/>
    <path d="M1 4.5h4"/>
    <path d="M1 4.5A5 5 0 1 1 2 9"/>
  </svg>;
}
function IRedo() {
  return <svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4.5V1"/>
    <path d="M11 4.5H7"/>
    <path d="M11 4.5A5 5 0 1 0 10 9"/>
  </svg>;
}
function IClear() {
  return <svg width="12" height="11" viewBox="0 0 12 11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M3 2h7M5.5 2v7M3.5 9h4"/>
    <line x1="9.5" y1="2" x2="2" y2="9.5" strokeWidth="1.2"/>
  </svg>;
}

// ── Popovers ───────────────────────────────────────────────────────────────────

function ColorPicker({
  colors,
  onSelect,
  onClose,
}: {
  colors: { label: string; value: string }[];
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute top-full mt-1 left-0 z-50 bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-2 rounded-[3px]">
      <div className="grid grid-cols-7 gap-1">
        {colors.map(c => (
          <button
            key={c.value || 'none'}
            type="button"
            title={c.label}
            onMouseDown={e => { e.preventDefault(); onSelect(c.value); onClose(); }}
            className="w-5 h-5 rounded-[2px] border border-black/[0.12] hover:scale-110 transition-transform relative"
            style={{
              background: c.value
                ? c.value
                : 'conic-gradient(#fff 90deg, #f00 90deg 180deg, #fff 180deg 270deg, #f00 270deg)',
            }}
          >
            {!c.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-[1px] bg-red-500 rotate-45" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function LinkPopover({
  initial,
  onConfirm,
  onClose,
}: {
  initial?: string;
  onConfirm: (url: string) => void;
  onClose: () => void;
}) {
  const [val, setVal] = useState(initial ?? 'https://');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute top-full mt-1 left-0 z-50 bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-2 rounded-[3px] flex gap-1.5 min-w-[280px]">
      <input
        ref={inputRef}
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { onConfirm(val); onClose(); } if (e.key === 'Escape') onClose(); }}
        placeholder="https://..."
        className="flex-1 border border-black/[0.10] bg-[#FAFAF9] px-2 py-1 text-xs focus:outline-none focus:border-[#4A86B8] rounded-[2px]"
      />
      <button type="button" onMouseDown={e => { e.preventDefault(); onConfirm(val); onClose(); }} className="px-2 py-1 bg-[#0A1628] text-white text-[10px] font-mono rounded-[2px] hover:opacity-80">Set</button>
      {initial && (
        <button type="button" onMouseDown={e => { e.preventDefault(); onConfirm(''); onClose(); }} className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-mono rounded-[2px] hover:bg-red-100 border border-red-200">Remove</button>
      )}
    </div>
  );
}

function ImagePopover({ onConfirm, onClose }: {
  onConfirm: (url: string, alt: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState('https://');
  const [alt, setAlt] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute top-full mt-1 left-0 z-50 bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-3 rounded-[3px] min-w-[300px] flex flex-col gap-2">
      <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">Insert Image</p>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Image URL" className="border border-black/[0.10] bg-[#FAFAF9] px-2 py-1.5 text-xs focus:outline-none focus:border-[#4A86B8] rounded-[2px]"/>
      <input value={alt} onChange={e => setAlt(e.target.value)} placeholder="Alt text (optional)" className="border border-black/[0.10] bg-[#FAFAF9] px-2 py-1.5 text-xs focus:outline-none focus:border-[#4A86B8] rounded-[2px]"/>
      <div className="flex gap-1.5">
        <button type="button" onMouseDown={e => { e.preventDefault(); if (url.startsWith('http')) { onConfirm(url, alt); onClose(); } }} className="px-3 py-1 bg-[#0A1628] text-white text-[10px] font-mono rounded-[2px] hover:opacity-80">Insert</button>
        <button type="button" onMouseDown={e => { e.preventDefault(); onClose(); }} className="px-3 py-1 border border-black/10 text-[10px] font-mono rounded-[2px] hover:bg-black/5">Cancel</button>
      </div>
    </div>
  );
}

function TablePicker({ onConfirm, onClose }: {
  onConfirm: (rows: number, cols: number) => void;
  onClose: () => void;
}) {
  const [hov, setHov] = useState<[number, number]>([0, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const MAX = 8;
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute top-full mt-1 left-0 z-50 bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.10)] p-2 rounded-[3px]">
      <p className="font-mono text-[10px] text-black/40 mb-1.5 h-3">
        {hov[0] > 0 ? `${hov[1]} × ${hov[0]}` : 'Insert table'}
      </p>
      <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${MAX}, 18px)` }}>
        {Array.from({ length: MAX }, (_, ri) =>
          Array.from({ length: MAX }, (_, ci) => (
            <div
              key={`${ri}-${ci}`}
              onMouseEnter={() => setHov([ri + 1, ci + 1])}
              onMouseDown={e => { e.preventDefault(); onConfirm(ri + 1, ci + 1); onClose(); }}
              className={`w-[18px] h-[18px] border rounded-[1px] cursor-pointer transition-colors ${
                ri < hov[0] && ci < hov[1]
                  ? 'bg-[#4A86B8]/20 border-[#4A86B8]/50'
                  : 'bg-black/[0.03] border-black/[0.10]'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ── Main Editor ────────────────────────────────────────────────────────────────

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Compose your newsletter content here...',
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  const [showTextColor, setShowTextColor] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showLink, setShowLink]           = useState(false);
  const [showImage, setShowImage]         = useState(false);
  const [showTable, setShowTable]         = useState(false);

  const closeAll = useCallback(() => {
    setShowTextColor(false);
    setShowHighlight(false);
    setShowLink(false);
    setShowImage(false);
    setShowTable(false);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: false, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount,
      Subscript,
      Superscript,
      Typography,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'rte-content focus:outline-none min-h-[440px] px-7 py-6 text-sm leading-relaxed' },
    },
  });

  if (!editor) return null;

  const words = (editor.storage.characterCount as any)?.words?.() ?? 0;
  const chars = (editor.storage.characterCount as any)?.characters?.() ?? 0;
  const inTable = editor.isActive('table');

  return (
    <>
      <style>{`
        /* ── Editor typography ── */
        .rte-content { color: #1a1a1a; }
        .rte-content h1 { font-size: 1.9em; font-weight: 700; margin: .6em 0 .3em; font-family: Georgia,serif; line-height: 1.2; }
        .rte-content h2 { font-size: 1.45em; font-weight: 700; margin: .7em 0 .25em; font-family: Georgia,serif; line-height: 1.3; }
        .rte-content h3 { font-size: 1.15em; font-weight: 600; margin: .65em 0 .2em; line-height: 1.4; }
        .rte-content h4 { font-size: .9em; font-weight: 700; margin: .5em 0 .15em; text-transform: uppercase; letter-spacing: .1em; }
        .rte-content p { margin: .4em 0; line-height: 1.75; }
        .rte-content p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #aaa; pointer-events: none; float: left; height: 0; }
        .rte-content ul { list-style: disc; padding-left: 1.6em; margin: .45em 0; }
        .rte-content ol { list-style: decimal; padding-left: 1.6em; margin: .45em 0; }
        .rte-content li { margin: .2em 0; line-height: 1.65; }
        .rte-content li > p { margin: 0; }
        .rte-content blockquote { border-left: 3px solid #4A86B8; padding: .1em 0 .1em 1em; margin: .7em 0; color: #555; font-style: italic; background: #f8fbff; }
        .rte-content code { background: #f0f0ee; font-family: monospace; font-size: .83em; padding: .12em .35em; border-radius: 2px; color: #c7254e; }
        .rte-content pre { background: #0e1521; color: #e5e7eb; font-family: monospace; font-size: .8em; padding: 1em 1.3em; margin: .75em 0; border-radius: 3px; overflow-x: auto; }
        .rte-content pre code { background: none; color: inherit; padding: 0; font-size: inherit; }
        .rte-content a { color: #4A86B8; text-decoration: underline; text-underline-offset: 2px; }
        .rte-content a:hover { color: #0A1628; }
        .rte-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.4em 0; }
        .rte-content img { max-width: 100%; height: auto; margin: .6em 0; border-radius: 2px; display: block; }
        .rte-content mark { border-radius: 2px; padding: 0 .15em; }
        .rte-content sup { vertical-align: super; font-size: .75em; }
        .rte-content sub { vertical-align: sub; font-size: .75em; }
        /* ── Tables ── */
        .rte-content table { border-collapse: collapse; width: 100%; margin: .8em 0; }
        .rte-content th { background: #f4f4f2; border: 1px solid #ddd; padding: .45em .75em; font-weight: 600; text-align: left; font-size: .85em; }
        .rte-content td { border: 1px solid #e5e5e3; padding: .4em .75em; font-size: .85em; }
        .rte-content .selectedCell:after { background: rgba(74,134,184,.12); content: ""; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; position: absolute; }
        .rte-content .column-resize-handle { background: #4A86B8; bottom: -2px; position: absolute; right: -2px; top: 0; width: 2px; pointer-events: none; }
        /* ── Selection ── */
        .rte-content ::selection { background: rgba(74,134,184,.2); }
        /* ── Table wrapper ── */
        .tableWrapper { overflow-x: auto; }
      `}</style>

      <div className="border border-black/[0.08] bg-white overflow-hidden">

        {/* ── Toolbar ───────────────────────────────────────────────── */}
        <div className="bg-[#F9F9F8] border-b border-black/[0.07] px-2 py-1.5 flex flex-wrap items-center gap-x-0.5 gap-y-1">

          {/* Block type */}
          <Group>
            {(['¶','H1','H2','H3','H4'] as const).map(t => {
              const lvl = t === '¶' ? 0 : parseInt(t[1]) as 1|2|3|4;
              return (
                <Btn
                  key={t}
                  onClick={() => t === '¶'
                    ? editor.chain().focus().setParagraph().run()
                    : editor.chain().focus().toggleHeading({ level: lvl }).run()
                  }
                  active={t === '¶' ? editor.isActive('paragraph') : editor.isActive('heading', { level: lvl })}
                  title={t === '¶' ? 'Paragraph (Ctrl+Alt+0)' : `Heading ${lvl}`}
                >
                  {t}
                </Btn>
              );
            })}
          </Group>

          <Sep/>

          {/* Text format */}
          <Group>
            <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (Ctrl+B)">
              <span className="font-black text-[12px]">B</span>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (Ctrl+I)">
              <span className="italic text-[12px]" style={{ fontFamily: 'Georgia, serif' }}>I</span>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (Ctrl+U)">
              <span className="underline text-[12px]">U</span>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
              <span className="line-through text-[12px]">S</span>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive('subscript')} title="Subscript">
              <span className="text-[10px]">x<sub style={{ fontSize: '0.7em' }}>₂</sub></span>
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive('superscript')} title="Superscript">
              <span className="text-[10px]">x<sup style={{ fontSize: '0.7em' }}>²</sup></span>
            </Btn>
          </Group>

          <Sep/>

          {/* Color & Highlight */}
          <Group>
            <div className="relative">
              <Btn onClick={() => { closeAll(); setShowTextColor(v => !v); }} active={showTextColor} title="Text Color">
                <span className="flex flex-col items-center gap-[2px]">
                  <span className="text-[11px] font-bold leading-none">A</span>
                  <span className="w-3.5 h-[2.5px] rounded-[1px]" style={{ background: editor.getAttributes('textStyle').color || '#000' }}/>
                </span>
              </Btn>
              {showTextColor && (
                <ColorPicker
                  colors={TEXT_COLORS}
                  onSelect={v => v ? editor.chain().focus().setColor(v).run() : editor.chain().focus().unsetColor().run()}
                  onClose={() => setShowTextColor(false)}
                />
              )}
            </div>
            <div className="relative">
              <Btn onClick={() => { closeAll(); setShowHighlight(v => !v); }} active={showHighlight || editor.isActive('highlight')} title="Highlight Color">
                <span className="flex flex-col items-center gap-[2px]">
                  <span className="text-[10px] leading-none" style={{ fontFamily: 'monospace' }}>ab</span>
                  <span className="w-3.5 h-[2.5px] rounded-[1px] bg-yellow-300"/>
                </span>
              </Btn>
              {showHighlight && (
                <ColorPicker
                  colors={HIGHLIGHT_COLORS}
                  onSelect={v => v ? editor.chain().focus().setHighlight({ color: v }).run() : editor.chain().focus().unsetHighlight().run()}
                  onClose={() => setShowHighlight(false)}
                />
              )}
            </div>
          </Group>

          <Sep/>

          {/* Alignment */}
          <Group>
            <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left"><IAlignL/></Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Centre"><IAlignC/></Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right"><IAlignR/></Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })} title="Justify"><IAlignJ/></Btn>
          </Group>

          <Sep/>

          {/* Lists */}
          <Group>
            <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><IBullet/></Btn>
            <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List"><IOrdered/></Btn>
          </Group>

          <Sep/>

          {/* Blocks */}
          <Group>
            <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote"><IQuote/></Btn>
            <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline Code"><ICode/></Btn>
            <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block"><ICodeBlock/></Btn>
          </Group>

          <Sep/>

          {/* Insert */}
          <Group>
            <div className="relative">
              <Btn onClick={() => { closeAll(); setShowLink(v => !v); }} active={showLink || editor.isActive('link')} title="Insert / Edit Link"><ILink/></Btn>
              {showLink && (
                <LinkPopover
                  initial={editor.getAttributes('link').href}
                  onConfirm={url => url
                    ? editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
                    : editor.chain().focus().unsetLink().run()
                  }
                  onClose={() => setShowLink(false)}
                />
              )}
            </div>
            <div className="relative">
              <Btn onClick={() => { closeAll(); setShowImage(v => !v); }} active={showImage} title="Insert Image"><IImage/></Btn>
              {showImage && (
                <ImagePopover
                  onConfirm={(url, alt) => editor.chain().focus().setImage({ src: url, alt }).run()}
                  onClose={() => setShowImage(false)}
                />
              )}
            </div>
            <div className="relative">
              <Btn onClick={() => { closeAll(); setShowTable(v => !v); }} active={showTable} title="Insert Table"><ITable/></Btn>
              {showTable && (
                <TablePicker
                  onConfirm={(rows, cols) => editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()}
                  onClose={() => setShowTable(false)}
                />
              )}
            </div>
            <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Divider"><IHr/></Btn>
          </Group>

          <Sep/>

          {/* History & clear */}
          <Group>
            <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)"><IUndo/></Btn>
            <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)"><IRedo/></Btn>
            <Btn onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear All Formatting"><IClear/></Btn>
          </Group>

          {/* Table context controls */}
          {inTable && (
            <>
              <Sep/>
              <Group>
                <Btn onClick={() => editor.chain().focus().addRowBefore().run()} title="Add Row Above"><span className="text-[9px]">↑ROW</span></Btn>
                <Btn onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row Below"><span className="text-[9px]">↓ROW</span></Btn>
                <Btn onClick={() => editor.chain().focus().addColumnBefore().run()} title="Add Column Left"><span className="text-[9px]">←COL</span></Btn>
                <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column Right"><span className="text-[9px]">→COL</span></Btn>
                <Btn onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row" danger><span className="text-[9px]">−ROW</span></Btn>
                <Btn onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column" danger><span className="text-[9px]">−COL</span></Btn>
                <Btn onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table" danger><span className="text-[9px]">DEL⊞</span></Btn>
                <Btn onClick={() => editor.chain().focus().toggleHeaderRow().run()} active={editor.isActive('tableHeader')} title="Toggle Header Row"><span className="text-[9px]">HDR</span></Btn>
                <Btn onClick={() => editor.chain().focus().mergeCells().run()} title="Merge Cells"><span className="text-[9px]">MERGE</span></Btn>
                <Btn onClick={() => editor.chain().focus().splitCell().run()} title="Split Cell"><span className="text-[9px]">SPLIT</span></Btn>
              </Group>
            </>
          )}
        </div>

        {/* ── Content area ── */}
        <div className="relative overflow-y-auto" style={{ minHeight: 440, maxHeight: 640 }}>
          <EditorContent editor={editor}/>
        </div>

        {/* ── Status bar ── */}
        <div className="border-t border-black/[0.06] bg-[#F9F9F8] px-4 py-1.5 flex items-center justify-between">
          <div className="text-[10px] font-mono text-black/30 flex items-center gap-3">
            {editor.isActive('link') && (
              <span className="text-[#4A86B8] truncate max-w-[200px]">
                ↗ {editor.getAttributes('link').href}
              </span>
            )}
            {inTable && <span className="text-black/40">⊞ Table active — use toolbar controls above</span>}
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-black/30">
            <span>{words.toLocaleString()} words</span>
            <span>{chars.toLocaleString()} chars</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default RichTextEditor;
