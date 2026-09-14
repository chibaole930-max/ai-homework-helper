import React, { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';

interface VocabWord {
  word: string;
  ipa: string;
  meaning: string;
}

interface EnglishVocabularyProps {
  words: VocabWord[];
  lessonTitle: string;
}

/**
 * Tách bảng từ vựng 3 cột (Từ vựng | Phiên âm IPA | Nghĩa tiếng Việt)
 * ra khỏi Markdown bài soạn. Trả về danh sách từ và content đã bỏ bảng
 * để tránh hiển thị trùng (bảng được thay bằng thẻ từ có nút phát âm).
 */
export function extractVocabulary(
  content: string
): { words: VocabWord[]; cleaned: string } {
  const words: VocabWord[] = [];
  if (!content) return { words, cleaned: content || '' };

  const lines = content.split('\n');
  const out: string[] = [];
  let i = 0;
  const isVocabHeader = (ln: string) =>
    /^\|\s*Từ\s*vựng\s*\|/.test(ln) &&
    /Phiên\s*âm/.test(ln) &&
    /Nghĩa/.test(ln);

  while (i < lines.length) {
    const line = lines[i];
    if (isVocabHeader(line)) {
      let j = i + 1;
      while (j < lines.length) {
        const r = lines[j];
        if (r.trim().startsWith('|')) {
          const cells = r
            .split('|')
            .map((c) => c.trim())
            .filter((c) => c !== '');
          if (/^[-—:]+$/.test(cells.join(''))) {
            j++;
            continue;
          }
          if (cells.length >= 3) {
            const word = cells[0].replace(/\*\*/g, '').trim();
            const ipa = cells[1].replace(/^\/|\/$/g, '').trim();
            const meaning = cells.slice(2).join(' - ').trim();
            if (word && /[a-zA-Z]/.test(word)) {
              words.push({ word, ipa, meaning });
            }
            j++;
            continue;
          }
        }
        break;
      }
      i = j;
      continue;
    }
    out.push(line);
    i++;
  }

  return { words, cleaned: out.join('\n') };
}

export function EnglishVocabulary({
  words,
  lessonTitle,
}: EnglishVocabularyProps) {
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    load();
    window.speechSynthesis.addEventListener?.('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load);
    };
  }, []);

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const enVoice =
      voices.find((v) => /en[-_](GB|US)/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      null;
    if (enVoice) u.voice = enVoice;
    u.lang = enVoice?.lang || 'en-US';
    u.rate = 0.85;
    u.onstart = () => setPlayingWord(text);
    u.onend = () => setPlayingWord(null);
    u.onerror = () => setPlayingWord(null);
    window.speechSynthesis.speak(u);
  };

  if (!words.length) return null;

  return (
    <div className="vocab-section relative mb-4">
      <div className="mb-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100 text-amber-600">
            <Volume2 className="w-4 h-4" />
          </span>
          🗣️ Từ vựng trọng tâm{lessonTitle ? ` · ${lessonTitle}` : ''}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Bấm nút phát âm (🔊) để nghe cách đọc từng từ
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {words.map((w, idx) => (
          <div
            key={`${w.word}-${idx}`}
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 hover:border-amber-300 hover:bg-amber-50/40 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-slate-900 text-[15px]">{w.word}</span>
                {w.ipa && (
                  <span className="text-[13px] font-medium text-indigo-600 italic">
                    /{w.ipa}/
                  </span>
                )}
              </div>
              {w.meaning && (
                <p className="text-xs text-slate-600 mt-0.5 truncate" title={w.meaning}>
                  {w.meaning}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => speak(w.word)}
              title={`Phát âm "${w.word}"`}
              className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                playingWord === w.word
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-200 scale-105'
                  : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-500 hover:text-white active:scale-95'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnglishVocabulary;