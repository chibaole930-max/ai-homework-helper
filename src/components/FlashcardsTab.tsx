import React, { useMemo, useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Volume2,
  BrainCircuit,
  CalendarClock,
  Sparkles,
  WandSparkles,
  ArrowLeft,
  FlipHorizontal2,
  Check,
  RotateCcw,
  Layers2,
  Timer,
  BookOpen,
  Lightbulb,
  X,
} from 'lucide-react';
import { SavedStudyItem } from '../types';
import { extractVocabulary } from './EnglishVocabulary';

interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  ipa?: string;
  level: number;
  interval: number;
  dueAt: number;
  rep: number;
  createdAt: number;
}

interface FlashcardDeck {
  id: string;
  title: string;
  subjectId?: string;
  subject?: string;
  createdAt: number;
  auto?: boolean;
}

interface FlashcardState {
  decks: FlashcardDeck[];
  cards: Flashcard[];
  meta: { lastStudyDay: string; streak: number };
}

const STORAGE_KEY = 'lop12_flashcards_v1';
const DAY = 86400000;
const INTERVALS = [1, 3, 7, 14, 30];

function schedule(level: number): number {
  return INTERVALS[Math.min(Math.max(level, 0), INTERVALS.length - 1)];
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function uid(): string {
  return 'fc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);
}

function loadState(): FlashcardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.decks) && Array.isArray(parsed.cards)) {
        return {
          decks: parsed.decks,
          cards: parsed.cards,
          meta: parsed.meta || { lastStudyDay: '', streak: 0 },
        };
      }
    }
  } catch (e) {
    console.error('Failed to read flashcards:', e);
  }
  return { decks: [], cards: [], meta: { lastStudyDay: '', streak: 0 } };
}

interface FlashcardsTabProps {
  savedItems: SavedStudyItem[];
}

export const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ savedItems }) => {
  const [state, setState] = useState<FlashcardState>(() => loadState());
  const [view, setView] = useState<'decks' | 'review' | 'create'>('decks');
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [sessionStats, setSessionStats] = useState<{ again: number; good: number; easy: number }>({
    again: 0,
    good: 0,
    easy: 0,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCardsModal, setShowCardsModal] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save flashcards:', e);
    }
  }, [state]);

  const englishNotes = useMemo(
    () =>
      savedItems.filter(
        (i) => i.subjectId === 'anh' || /tiếng anh/i.test(i.subject)
      ),
    [savedItems]
  );

  const activeDeck = useMemo(
    () => state.decks.find((d) => d.id === activeDeckId) || null,
    [state.decks, activeDeckId]
  );

  const deckCards = useMemo(
    () => (activeDeck ? state.cards.filter((c) => c.deckId === activeDeck.id) : []),
    [state.cards, activeDeck]
  );

  const now = Date.now();

  const dueToday = useMemo(
    () => state.cards.filter((c) => c.dueAt <= now).length,
    [state.cards, now]
  );

  const mastered = useMemo(
    () => state.cards.filter((c) => c.level >= INTERVALS.length - 1).length,
    [state.cards]
  );

  const play = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const enVoice =
      voices.find((v) => /en[-_](GB|US)/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      null;
    if (enVoice) u.voice = enVoice;
    u.lang = enVoice?.lang || 'en-US';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const startReview = (deckId: string) => {
    const due = state.cards.filter(
      (c) => c.deckId === deckId && c.dueAt <= now
    );
    const ids = due.length
      ? due.sort((a, b) => a.dueAt - b.dueAt).map((c) => c.id)
      : state.cards
          .filter((c) => c.deckId === deckId)
          .sort((a, b) => a.createdAt - b.createdAt)
          .map((c) => c.id);
    setActiveDeckId(deckId);
    setQueue(ids);
    setOffset(0);
    setFlipped(false);
    setSessionStats({ again: 0, good: 0, easy: 0 });
    setView('review');
  };

  const currentCard = useMemo(
    () =>
      queue.length > offset
        ? state.cards.find((c) => c.id === queue[offset]) || null
        : null,
    [queue, offset, state.cards]
  );

  const rate = (rating: 'again' | 'good' | 'easy') => {
    if (!currentCard) return;
    let level = currentCard.level;
    if (rating === 'again') level = 0;
    else if (rating === 'good') level = Math.min(level + 1, INTERVALS.length - 1);
    else level = Math.min(level + 2, INTERVALS.length - 1);
    const updated: Flashcard = {
      ...currentCard,
      level,
      interval: schedule(level),
      dueAt: Date.now() + schedule(level) * DAY,
      rep: currentCard.rep + 1,
    };
    setState((prev) => ({
      ...prev,
      cards: prev.cards.map((c) => (c.id === updated.id ? updated : c)),
      meta:
        prev.meta.lastStudyDay === todayStr()
          ? prev.meta
          : { lastStudyDay: todayStr(), streak: prev.meta.streak + 1 },
    }));
    setSessionStats((prev) => ({
      again: prev.again + (rating === 'again' ? 1 : 0),
      good: prev.good + (rating === 'good' ? 1 : 0),
      easy: prev.easy + (rating === 'easy' ? 1 : 0),
    }));

    let nextOffset = offset + 1;
    if (rating === 'again') {
      setQueue((prevQ) => [...prevQ, currentCard.id]);
      nextOffset = offset;
    } else {
      nextOffset = offset + 1;
    }
    setOffset(nextOffset);
    setFlipped(false);
  };

  const createDeckManual = (title: string, lines: string[]) => {
    const deckId = uid();
    const cards: Flashcard[] = lines
      .map((ln) => {
        const trimmed = ln.trim();
        if (!trimmed) return null;
        const parts = trimmed
          .split(/[|\t]/)
          .map((p) => p.trim())
          .filter(Boolean);
        if (parts.length < 2) return null;
        return {
          id: uid(),
          deckId,
          front: parts[0],
          back: parts.slice(1).join(' — '),
          ipa: parts.length >= 3 ? parts[1] : undefined,
          level: 0,
          interval: 0,
          dueAt: Date.now(),
          rep: 0,
          createdAt: Date.now(),
        };
      })
      .filter(Boolean) as Flashcard[];
    if (!cards.length) return;
    const deck: FlashcardDeck = {
      id: deckId,
      title: title.trim() || 'Bộ thẻ thủ công',
      createdAt: Date.now(),
    };
    setState((prev) => ({ ...prev, decks: [deck, ...prev.decks], cards: [...cards, ...prev.cards] }));
    setView('decks');
    setShowCreateModal(false);
  };

  const createAutoDeck = () => {
    const nextDecks: FlashcardDeck[] = [];
    const nextCards: Flashcard[] = [];
    englishNotes.forEach((item) => {
      const { words } = extractVocabulary(item.content);
      if (words.length === 0) return;
      const existing = state.decks.some(
        (d) => d.title === item.title && d.subjectId === item.subjectId && d.auto
      );
      if (existing) return;
      const deckId = uid();
      nextDecks.push({
        id: deckId,
        title: item.title,
        subjectId: item.subjectId,
        subject: item.subject,
        createdAt: Date.now(),
        auto: true,
      });
      words.forEach((w) => {
        nextCards.push({
          id: uid(),
          deckId,
          front: w.word,
          back: w.meaning,
          ipa: w.ipa,
          level: 0,
          interval: 0,
          dueAt: Date.now(),
          rep: 0,
          createdAt: Date.now(),
        });
      });
    });
    if (!nextDecks.length) return;
    setState((prev) => ({
      ...prev,
      decks: [...nextDecks, ...prev.decks],
      cards: [...nextCards, ...prev.cards],
    }));
  };

  const deleteDeck = (deckId: string) => {
    if (!window.confirm('Xóa bộ thẻ và toàn bộ thẻ bên trong?')) return;
    setState((prev) => ({
      ...prev,
      decks: prev.decks.filter((d) => d.id !== deckId),
      cards: prev.cards.filter((c) => c.deckId !== deckId),
    }));
    if (activeDeckId === deckId) {
      setActiveDeckId(null);
      setView('decks');
    }
  };

  const deleteCard = (cardId: string) => {
    setState((prev) => ({
      ...prev,
      cards: prev.cards.filter((c) => c.id !== cardId),
    }));
  };

  const endSession = () => {
    setView('decks');
    setActiveDeckId(null);
    setQueue([]);
    setOffset(0);
    setFlipped(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-gradient-to-r from-indigo-700 via-violet-600 to-purple-600 rounded-2xl p-5 sm:p-7 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold backdrop-blur-xs mb-3">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-300" />
            <span>Ôn Tập Thông Minh • Lặp Lại Ngắt Quãng (Spaced Repetition)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Thẻ Học Thông Minh (Flashcards)
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Học từ vựng & câu hỏi dạng thẻ lật: ôn lại sau 1 — 3 — 7 — 14 — 30 ngày theo lịch trình
            khoa học, lâu quên hơn, chuẩn phương pháp của các app học hàng đầu thế giới.
          </p>
        </div>
        <div className="absolute right-0 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <Layers className="w-4.5 h-4.5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-slate-900">{state.cards.length}</p>
            <p className="text-[10px] font-semibold text-slate-400">Tổng thẻ đang học</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <CalendarClock className="w-4.5 h-4.5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-slate-900">{dueToday}</p>
            <p className="text-[10px] font-semibold text-slate-400">Cần ôn hôm nay</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-slate-900">{mastered}</p>
            <p className="text-[10px] font-semibold text-slate-400">Đã thuộc (≥30 ngày)</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Timer className="w-4.5 h-4.5" />
          </span>
          <div>
            <p className="text-lg font-extrabold text-slate-900">{state.meta.streak}</p>
            <p className="text-[10px] font-semibold text-slate-400">
              Ngày học liên tiếp
            </p>
          </div>
        </div>
      </div>

      {view === 'review' && currentCard ? (
        <div className="max-w-xl mx-auto">
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={endSession}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Thoát
            </button>
            <div className="text-xs font-semibold text-slate-500">
              Thẻ {Math.min(offset + 1, queue.length)}/{queue.length}
            </div>
            <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {activeDeck?.title}
            </div>
          </div>

          <div className="mb-4 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
              style={{
                width: `${queue.length ? Math.min(100, (offset / queue.length) * 100) : 0}%`,
              }}
            />
          </div>

          <button
            onClick={() => setFlipped(!flipped)}
            className="relative w-full text-left"
            style={{ perspective: '1200px' }}
          >
            <div
              className="relative w-full min-h-[320px] sm:min-h-[360px] transition-transform duration-500"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              <div
                className="absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center backface-hidden"
                style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                  Mặt trước
                </span>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 break-words leading-snug">
                  {currentCard.front}
                </p>
                {currentCard.ipa && (
                  <span className="text-xl font-medium text-indigo-600 italic mt-2">
                    /{currentCard.ipa}/
                  </span>
                )}
                {currentCard.ipa && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      play(currentCard.front);
                    }}
                    className="mt-4 w-11 h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-200 active:scale-95 transition-all"
                    title="Phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <FlipHorizontal2 className="w-3.5 h-3.5" />
                  Bấm để lật thẻ
                </span>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center"
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 mb-3">
                  Mặt sau
                </span>
                <p className="text-lg sm:text-xl font-bold text-slate-800 break-words leading-snug max-h-56 overflow-y-auto">
                  {currentCard.back}
                </p>
                {currentCard.rep > 0 && (
                  <span className="mt-4 text-[11px] font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
                    Lần ôn thứ {currentCard.rep}
                  </span>
                )}
              </div>
            </div>
          </button>

          {flipped && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={() => rate('again')}
                className="py-3 px-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-md shadow-red-100 active:scale-[0.97] transition-all flex flex-col items-center gap-0.5"
              >
                <RotateCcw className="w-4 h-4" />
                Lại quên
              </button>
              <button
                onClick={() => rate('good')}
                className="py-3 px-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-100 active:scale-[0.97] transition-all flex flex-col items-center gap-0.5"
              >
                <Check className="w-4 h-4" />
                Nhớ rồi
              </button>
              <button
                onClick={() => rate('easy')}
                className="py-3 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-100 active:scale-[0.97] transition-all flex flex-col items-center gap-0.5"
              >
                <Sparkles className="w-4 h-4" />
                Dễ lắm
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Mẹo: lật thẻ, cố nhớ đáp án trước rồi mới chấm điểm — phương pháp gợi nhớ chủ động
            (active recall) hiệu quả gấp nhiều lần đọc lại.
          </p>
        </div>
      ) : view === 'review' ? (
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">Hết thẻ trong lượt này!</h2>
          <p className="text-xs text-slate-500">
            {sessionStats.again > 0
              ? `${sessionStats.again} thẻ cần ôn lại — lập trình sẽ đưa chúng quay lại đúng lúc. `
              : ''}
            Đã ôn: {sessionStats.good + sessionStats.easy} thẻ nhớ tốt, {sessionStats.again} thẻ cần xem lại.
          </p>
          <button
            onClick={endSession}
            className="mt-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors"
          >
            Về danh sách bộ thẻ
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Layers2 className="w-5 h-5 text-indigo-600" />
                Bộ thẻ của tôi
              </h2>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">
                {state.decks.length} bộ
              </span>
            </div>
            <div className="flex items-center gap-2">
              {englishNotes.length > 0 && (
                <button
                  onClick={createAutoDeck}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm transition-colors"
                >
                  <WandSparkles className="w-3.5 h-3.5" />
                  Tạo thẻ từ bài ghi Tiếng Anh
                </button>
              )}
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Tạo bộ thẻ
              </button>
            </div>
          </div>

          {state.decks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Chưa có bộ thẻ nào</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Cách nhanh nhất: soạn bài môn Tiếng Anh trong mục <b>Soạn Bài Ghi</b> — mỗi bài đều có
                bảng từ vựng kèm phiên âm. Sau đó về đây bấm{' '}
                <b className="text-emerald-600">"Tạo thẻ từ bài ghi Tiếng Anh"</b> để luyện ngay.
                Hoặc tự tạo bộ thẻ theo từ khóa - nghĩa.
              </p>
              <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Gợi ý lịch ôn: 1 → 3 → 7 → 14 → 30 ngày
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {state.decks.map((deck) => {
                const cards = state.cards.filter((c) => c.deckId === deck.id);
                const due = cards.filter((c) => c.dueAt <= now + DAY).length;
                return (
                  <div
                    key={deck.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-slate-900 leading-snug truncate">
                          {deck.title}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {deck.subject ? (
                            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                              {deck.subject}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                              Tự tạo
                            </span>
                          )}
                          <span className="text-[10px] font-semibold text-slate-400">
                            {cards.length} thẻ
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteDeck(deck.id)}
                        title="Xóa bộ thẻ"
                        className="shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span
                        className={
                          due > 0
                            ? 'text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg'
                            : 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg'
                        }
                      >
                        {due > 0 ? `${due} thẻ cần ôn` : 'Đã ôn đủ lịch'}
                      </span>
                      <span className="text-slate-400">
                        {cards.filter((c) => c.level >= INTERVALS.length - 1).length} thuộc
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => startReview(deck.id)}
                        className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <BrainCircuit className="w-3.5 h-3.5" />
                        Ôn tập
                      </button>
                      <button
                        onClick={() => {
                          setActiveDeckId(deck.id);
                          setShowCardsModal(true);
                        }}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Xem thẻ
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {showCreateModal && (
        <CreateDeckModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createDeckManual}
        />
      )}

      {showCardsModal && activeDeck && (
        <DeckCardsModal
          deck={activeDeck}
          cards={deckCards}
          onClose={() => setShowCardsModal(false)}
          onDeleteCard={deleteCard}
          onStartReview={() => {
            setShowCardsModal(false);
            startReview(activeDeck.id);
          }}
        />
      )}
    </div>
  );
};

function CreateDeckModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (title: string, lines: string[]) => void;
}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tạo bộ thẻ mới
            </h2>
            <p className="text-xs text-indigo-100 mt-0.5">
              Mỗi dòng: <b>từ khóa | nghĩa</b> hoặc <b>từ khóa | phiên âm | nghĩa</b>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/15 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">
              Tên bộ thẻ *
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Từ vựng Unit 1 - Community life"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 mb-1 block">
              Nội dung thẻ (mỗi dòng là 1 thẻ)
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={7}
              placeholder={"community | cộng đồng\nlifestyle | /ˈlaɪfstaɪl/ | lối sống\nGCSE | kỳ thi tốt nghiệp THCS"}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none font-mono leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Điền được {lines.filter((ln) => ln.split(/[|\t]/).filter(Boolean).length >= 2).length} thẻ hợp lệ
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-200"
          >
            Hủy
          </button>
          <button
            onClick={() => onCreate(title, lines)}
            disabled={!lines.length}
            className="px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white"
          >
            Tạo bộ thẻ
          </button>
        </div>
      </div>
    </div>
  );
}

function DeckCardsModal({
  deck,
  cards,
  onClose,
  onDeleteCard,
  onStartReview,
}: {
  deck: FlashcardDeck;
  cards: Flashcard[];
  onClose: () => void;
  onDeleteCard: (id: string) => void;
  onStartReview: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {deck.title}
            </h2>
            <p className="text-xs text-indigo-100 mt-0.5">
              {cards.length} thẻ • lịch ôn 1-3-7-14-30 ngày
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/15 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-2">
          {cards.length === 0 && (
            <p className="text-center text-xs text-slate-400 py-10">
              Bộ thẻ này đang trống.
            </p>
          )}
          {cards.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5"
            >
              <div className="min-w-0 flex-1 flex items-center gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">{c.front}</span>
                    {c.ipa && (
                      <span className="text-xs text-indigo-600 italic">/{c.ipa}/</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 truncate mt-0.5">{c.back}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {c.level >= INTERVALS.length - 1 ? 'Đã thuộc' : `Chu kỳ ${c.interval} ngày`}
                </span>
                <button
                  onClick={() => onDeleteCard(c.id)}
                  title="Xóa thẻ"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 rounded-xl hover:bg-slate-200"
          >
            Đóng
          </button>
          <button
            onClick={onStartReview}
            className="px-4 py-2 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
          >
            <BrainCircuit className="w-4 h-4" />
            Ôn tập bộ này
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlashcardsTab;