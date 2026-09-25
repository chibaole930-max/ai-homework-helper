import React, { useEffect, useCallback, useState } from 'react';
import {
  ArrowLeft,
  BookmarkPlus,
  Check,
  Eye,
  Star,
  MessageCircle,
  Send,
  Loader2,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import { SavedStudyItem, SubjectId } from '../types';
import { MarkdownRenderer } from './MarkdownRenderer';
import { useAuth } from '../context/AuthContext';

interface CommunityPreset extends SavedStudyItem {
  author?: string;
  likes?: number;
  views?: number;
  fromCommunity?: boolean;
  avgRating?: number;
  ratingCount?: number;
}

interface PresetCommentView {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Discussions {
  comments: PresetCommentView[];
  rating: { avg: number; count: number; mine: number | null };
}

const EMPTY_DISCUSSIONS: Discussions = {
  comments: [],
  rating: { avg: 0, count: 0, mine: null },
};

interface PresetReaderPageProps {
  presetId: string;
  onSaveItem: (item: Omit<SavedStudyItem, 'id' | 'date'>) => void;
  isItemSaved: (title: string, subject: string) => boolean;
  onBack: () => void;
}

export const PresetReaderPage: React.FC<PresetReaderPageProps> = ({
  presetId,
  onSaveItem,
  isItemSaved,
  onBack,
}) => {
  const { user } = useAuth();
  const [item, setItem] = useState<CommunityPreset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [discussions, setDiscussions] = useState<Discussions>(EMPTY_DISCUSSIONS);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [discussionLoading, setDiscussionLoading] = useState(false);
  const [commentBusy, setCommentBusy] = useState(false);
  const [ratingBusy, setRatingBusy] = useState(false);

  const getOwnerKey = useCallback(() => {
    if (user?.id) return 'user:' + user.id;
    try {
      let k = localStorage.getItem('preset_visitor_id');
      if (!k) {
        k = 'dev:' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem('preset_visitor_id', k);
      }
      return k;
    } catch {
      return 'anon:' + Math.random().toString(36).slice(2);
    }
  }, [user]);

  const loadDiscussions = useCallback(
    async (id: string) => {
      setDiscussionLoading(true);
      try {
        const res = await fetch(
          `/api/community/presets/${encodeURIComponent(id)}/comments?owner=${encodeURIComponent(getOwnerKey())}`
        );
        if (res.ok) {
          const data = await res.json();
          setDiscussions({
            comments: Array.isArray(data.comments) ? data.comments : [],
            rating: data.rating || { avg: 0, count: 0, mine: null },
          });
        }
      } catch (err) {
        console.warn('Không tải được bình luận:', err);
      } finally {
        setDiscussionLoading(false);
      }
    },
    [getOwnerKey]
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setItem(null);
    setLiked(false);
    setDiscussions(EMPTY_DISCUSSIONS);

    fetch(`/api/community/presets/${encodeURIComponent(presetId)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Không tìm thấy bài mẫu.');
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.item) {
          setItem(data.item);
          setCommentText('');
          setCommentName('');
          loadDiscussions(data.item.id);
          // Tăng lượt xem
          fetch(`/api/community/presets/${encodeURIComponent(data.item.id)}/view`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          }).catch(() => {});
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Không tải được bài mẫu.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [presetId, loadDiscussions]);

  const handleLike = async () => {
    if (!item) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setItem((prev) =>
      prev ? { ...prev, likes: Math.max(0, (prev.likes || 0) + (newLiked ? 1 : -1)) } : prev
    );
    fetch(`/api/community/presets/${encodeURIComponent(item.id)}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liked: newLiked }),
    }).catch(() => {});
  };

  const handleSave = () => {
    if (!item) return;
    onSaveItem({
      type: item.type,
      title: item.title,
      subject: item.subject,
      subjectId: item.subjectId as SubjectId,
      textbook: item.textbook,
      content: item.content,
      isFavorite: item.isFavorite,
      style: item.style,
      originalProblem: item.originalProblem,
    });
  };

  const handleRate = async (stars: number) => {
    if (!item || ratingBusy) return;
    setRatingBusy(true);
    try {
      const res = await fetch(
        `/api/community/presets/${encodeURIComponent(item.id)}/rating`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: stars, owner: getOwnerKey() }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const rating = data.rating;
        setDiscussions((d) => ({ ...d, rating }));
        setItem((prev) =>
          prev ? { ...prev, avgRating: rating.avg, ratingCount: rating.count } : prev
        );
      }
    } catch (err) {
      console.warn('Không đánh giá được:', err);
    } finally {
      setRatingBusy(false);
    }
  };

  const handleAddComment = async () => {
    if (!item || !commentText.trim() || commentBusy) return;
    setCommentBusy(true);
    try {
      const res = await fetch(
        `/api/community/presets/${encodeURIComponent(item.id)}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: commentText, author: commentName }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.comment) {
          setDiscussions((d) => ({ ...d, comments: [...d.comments, data.comment] }));
          setCommentText('');
        }
      } else {
        const e = await res.json().catch(() => ({}));
        alert(e.error || 'Không gửi được bình luận.');
      }
    } catch {
      alert('Không kết nối được máy chủ. Vui lòng thử lại.');
    } finally {
      setCommentBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span className="text-sm">Đang mở bài mẫu...</span>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xs p-8 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-base font-extrabold text-slate-800">
            Không tìm thấy bài mẫu
          </h2>
          <p className="text-sm text-slate-500">{error || 'Bài mẫu có thể đã bị xoá.'}</p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-2.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Về Kho bài mẫu
          </button>
        </div>
      </div>
    );
  }

  const alreadySaved = isItemSaved(item.title, item.subject);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-100">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kho bài mẫu
              </button>
              <div className="flex items-center gap-2 flex-wrap">
                {item.fromCommunity ? (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <Sparkles className="w-3 h-3" />
                    Cộng đồng
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    {item.textbook}
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={alreadySaved}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                    alreadySaved
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {alreadySaved ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Đã lưu vào vở
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      Lưu vào vở
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                {item.subject}
              </span>
              {item.grade && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200">
                  Lớp {item.grade}
                </span>
              )}
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                {item.textbook}
              </span>
            </div>

            <h1 className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
              {item.title}
            </h1>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
              <span>
                Đóng góp bởi <b className="text-slate-700">{item.author || 'Kho Học Liệu Mẫu'}</b>
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {item.views || 0} lượt xem
              </span>
              {item.avgRating ? (
                <span className="inline-flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {item.avgRating} ({item.ratingCount || 0} đánh giá)
                </span>
              ) : null}
              <button
                onClick={handleLike}
                className={`inline-flex items-center gap-1 font-bold transition-colors ${
                  liked ? 'text-emerald-700' : 'text-slate-500 hover:text-emerald-600'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {item.likes || 0} thích
              </button>
            </div>
          </div>

          {/* Nội dung */}
          <div className="p-4 sm:p-6">
            <MarkdownRenderer content={item.content} />
          </div>
        </div>

        {/* Đánh giá & Bình luận */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            Đánh giá & bình luận
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleRate(s)}
                  disabled={ratingBusy}
                  title={`${s} sao`}
                  className="p-0.5 transition-transform hover:scale-125 disabled:opacity-60"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (discussions.rating.mine ?? 0) >= s
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-600">
              {discussions.rating.count > 0 ? (
                <>
                  {discussions.rating.avg} / 5{' '}
                  <span className="font-medium text-slate-400">
                    ({discussions.rating.count} lượt)
                  </span>
                  {discussions.rating.mine ? (
                    <span className="ml-1.5 text-[11px] text-emerald-600">
                      • Bạn đã chấm {discussions.rating.mine} sao
                    </span>
                  ) : null}
                </>
              ) : (
                'Chưa có đánh giá — hãy là người đầu tiên!'
              )}
            </span>
          </div>

          <div className="mt-4 space-y-2.5">
            {discussionLoading ? (
              <div className="flex items-center gap-2 py-2 text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tải bình luận...
              </div>
            ) : discussions.comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                Chưa có bình luận nào. Chia sẻ nhận xét của bạn bên dưới nhé!
              </p>
            ) : (
              discussions.comments.map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                      {c.author.charAt(0) || '?'}
                    </span>
                    <span className="text-xs font-bold text-slate-700 truncate">{c.author}</span>
                    <span className="text-[10px] text-slate-400 ml-auto shrink-0">
                      {new Date(c.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed whitespace-pre-wrap break-words">
                    {c.content}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4 space-y-2">
            <input
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder="Tên của bạn (không bắt buộc)"
              maxLength={60}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ cảm nhận về bài mẫu này..."
              rows={3}
              maxLength={2000}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none resize-none"
            />
            <div className="flex items-center justify-end gap-2">
              <span className="text-[11px] text-slate-400 mr-auto">{commentText.length}/2000</span>
              <button
                onClick={handleAddComment}
                disabled={commentBusy || !commentText.trim()}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {commentBusy ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Gửi bình luận
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};