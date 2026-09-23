/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { FloatingBackground } from './components/FloatingBackground';
import { AppDashboard, OpenFeature } from './components/AppDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { VipModal } from './components/VipModal';
import { SavedStudyItem, GradeId } from './types';
import { authHeaders } from './lib/auth';
import { PRESET_LESSON_NOTES } from './data/presets';
import { SUBJECTS_BY_GRADE, GRADE_LABELS, TEXTBOOKS_BY_GRADE } from './data/grades';
import { CheckCircle2, Megaphone, Wrench, HeartHandshake, FolderHeart, ArrowLeft, Lock } from 'lucide-react';

// Lazy-load các tab nặng (katex/markdown, chart, admin...) — chỉ tải khi mở tab đó
const LessonNoteTab = lazy(() =>
  import('./components/LessonNoteTab').then((m) => ({ default: m.LessonNoteTab }))
);
const ExerciseSolverTab = lazy(() =>
  import('./components/ExerciseSolverTab').then((m) => ({ default: m.ExerciseSolverTab }))
);
const PresetLibraryTab = lazy(() =>
  import('./components/PresetLibraryTab').then((m) => ({ default: m.PresetLibraryTab }))
);
const HocBaTab = lazy(() =>
  import('./components/HocBaTab').then((m) => ({ default: m.HocBaTab }))
);
const LoTrinhTab = lazy(() =>
  import('./components/LoTrinhTab').then((m) => ({ default: m.LoTrinhTab }))
);
const FlashcardsTab = lazy(() =>
  import('./components/FlashcardsTab').then((m) => ({ default: m.FlashcardsTab }))
);
const StudyTipsTab = lazy(() =>
  import('./components/StudyTipsTab').then((m) => ({ default: m.StudyTipsTab }))
);
const AdminTab = lazy(() => import('./components/AdminTab'));
const SavedNotesTab = lazy(() =>
  import('./components/SavedNotesTab').then((m) => ({ default: m.SavedNotesTab }))
);

const STORAGE_KEY = 'lop12_study_notebook_v1';
const ANNOUNCE_KEY = 'announcement_dismissed_v1';

// Các tính năng bắt buộc phải đăng nhập trước khi dùng
const AUTH_REQUIRED_FEATURES: OpenFeature[] = ['notes', 'solver', 'transcript', 'path'];

interface SiteStatus {
  maintenance: {
    enabled: boolean;
    message: string;
    modules?: { note?: boolean; solver?: boolean; presets?: boolean };
  };
  announcement: { enabled: boolean; text: string };
  donate: { enabled: boolean; qrImage: string; note: string };
}

function ModuleMaintenancePanel({ message }: { message: string }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4 mt-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 mx-auto">
        <Wrench className="w-6 h-6" />
      </div>
      <h2 className="text-lg font-extrabold text-slate-900">Mục Này Đang Bảo Trì</h2>
      <p className="text-sm text-slate-500 leading-relaxed">
        {message || 'Chúng tôi đang nâng cấp hạng mục này. Vui lòng quay lại sau nhé!'}
      </p>
      <p className="text-[11px] text-slate-400">
        Vở Ghi của bạn và các mục khác vẫn dùng bình thường.
      </p>
    </div>
  );
}

function AppContent() {
  const { user, openAuth } = useAuth();
  const [openFeature, setOpenFeature] = useState<OpenFeature | null>(null);
  const [grade, setGrade] = useState<GradeId>('12');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => window.location.hash === '#/admin'
  );
  const [siteStatus, setSiteStatus] = useState<SiteStatus | null>(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [donateVisible, setDonateVisible] = useState(false);

  const donateEnabled = !!(
    siteStatus?.donate?.enabled && siteStatus.donate.qrImage
  );

  useEffect(() => {
const savedGrade = localStorage.getItem('selected_grade') as GradeId | null;
    if (savedGrade === '6' || savedGrade === '7' || savedGrade === '8' || savedGrade === '9' || savedGrade === '10' || savedGrade === '11' || savedGrade === '12') {
      setGrade(savedGrade);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selected_grade', grade);
  }, [grade]);

  const subjects = SUBJECTS_BY_GRADE[grade];
  const textbooks = TEXTBOOKS_BY_GRADE[grade];
  const gradeLabel = GRADE_LABELS[grade];

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#/admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const load = () => {
      fetch('/api/site/status')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d) setSiteStatus(d as SiteStatus);
        })
        .catch(() => {});
    };
    load();
    const t = window.setInterval(load, 60000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const ping = () => {
      fetch('/api/online')
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d && typeof d.online === 'number') setOnlineCount(d.online);
        })
        .catch(() => {});
    };
    ping();
    const t = window.setInterval(ping, 30000);
    const onFocus = () => ping();
    window.addEventListener('focus', onFocus);
    return () => {
      window.clearInterval(t);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  useEffect(() => {
    fetch('/api/stats/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'page_view' }),
    }).catch(() => {});
  }, []);

  const announcementText = siteStatus?.announcement?.enabled
    ? siteStatus.announcement.text
    : '';
  const [announcementVisible, setAnnouncementVisible] = useState(false);

  useEffect(() => {
    setAnnouncementVisible(
      !!announcementText && localStorage.getItem(ANNOUNCE_KEY) !== announcementText
    );
  }, [announcementText]);

  const dismissAnnouncement = () => {
    if (announcementText) localStorage.setItem(ANNOUNCE_KEY, announcementText);
    setAnnouncementVisible(false);
    openDonateOnce();
  };

  const openDonateOnce = () => {
    if (!donateEnabled) return;
    setDonateVisible(true);
  };

  useEffect(() => {
    if (announcementText) return;
    openDonateOnce();
  }, [donateEnabled, announcementText]);

  const [savedItems, setSavedItems] = useState<SavedStudyItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read localStorage:', e);
    }
    return PRESET_LESSON_NOTES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [savedItems]);

  // Nếu feature yêu cầu đăng nhập và user chưa đăng nhập -> mở modal đăng nhập
  const openFeatureChecked = useCallback(
    (feature: OpenFeature) => {
      if (AUTH_REQUIRED_FEATURES.includes(feature) && !user) {
        openAuth();
        return;
      }
      setOpenFeature(feature);
    },
    [user, openAuth]
  );

  // Khi đăng nhập -> đồng bộ các bài đã lưu từ Database về Vở Ghi
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetch('/api/lessons', { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || !Array.isArray(data.lessons)) return;
        const serverItems: SavedStudyItem[] = data.lessons.map((l: any) => ({
          id: String(l.id),
          type: l.type === 'exercise' ? 'exercise' : 'note',
          title: String(l.title || ''),
          subject: String(l.subject || ''),
          subjectId: String(l.subjectId || ''),
          textbook: String(l.textbook || ''),
          content: String(l.content || ''),
          date: String(l.date || ''),
          isFavorite: !!l.isFavorite,
          style: l.style || undefined,
          originalProblem: l.originalProblem || undefined,
        }));
        setSavedItems((prev) => {
          const seen = new Set(serverItems.map((i) => i.title + '::' + i.subject));
          return [...serverItems, ...prev.filter((i) => !seen.has(i.title + '::' + i.subject))];
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, user?.id]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

const handleSaveItem = async (itemData: Omit<SavedStudyItem, 'id' | 'date'>) => {
    const exists = savedItems.some(
      (item) => item.title === itemData.title && item.subject === itemData.subject
    );
    if (exists) {
      showToast('Bài này đã có trong Vở Ghi của bạn!');
      return;
    }
    const localId = 'saved-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const newItem: SavedStudyItem = {
      ...itemData,
      id: localId,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };
    setSavedItems((prev) => [newItem, ...prev]);
    showToast('Đã lưu bài học vào Vở Ghi thành công!');

    // Đồng bộ lên Database khi đã đăng nhập (lưu local trước, sync sau)
    if (user) {
      try {
        const res = await fetch('/api/lessons', {
          method: 'POST',
          headers: { ...authHeaders(), 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: itemData.type,
            title: itemData.title,
            subject: itemData.subject,
            subjectId: itemData.subjectId,
            textbook: itemData.textbook,
            content: itemData.content,
            isFavorite: itemData.isFavorite,
            style: itemData.style,
            originalProblem: itemData.originalProblem,
          }),
        });
        const data = await res.json();
        const serverId = data?.lesson?.id;
        if (serverId && serverId !== localId) {
          setSavedItems((prev) =>
            prev.map((item) => (item.id === localId ? { ...item, id: serverId } : item))
          );
        }
      } catch {
        // Mất mạng -> vẫn giữ bài ở local, đồng bộ khi đăng nhập lại
      }
    }
  };

  const handleImportPreset = (item: SavedStudyItem) => {
    handleSaveItem({
      type: item.type,
      title: item.title,
      subject: item.subject,
      subjectId: item.subjectId,
      textbook: item.textbook,
      content: item.content,
      isFavorite: item.isFavorite,
      style: item.style,
      originalProblem: item.originalProblem,
    });
  };

  const handleToggleFavorite = (id: string) => {
    setSavedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    // Đồng bộ trạng thái yêu thích lên server nếu bài đã nằm trên Database
    if (user && !id.startsWith('saved-')) {
      fetch('/api/lessons/' + encodeURIComponent(id) + '/toggle-favorite', {
        method: 'POST',
        headers: authHeaders(),
      }).catch(() => {});
    }
  };

  const handleDeleteItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa bài khỏi Vở Ghi.');
    if (user && !id.startsWith('saved-')) {
      fetch('/api/lessons/' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: authHeaders(),
      }).catch(() => {});
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ bài trong Vở Ghi?')) {
      setSavedItems([]);
      showToast('Đã dọn sạch Vở Ghi.');
      if (user) {
        fetch('/api/lessons', { method: 'DELETE', headers: authHeaders() }).catch(() => {});
      }
    }
  };

  const isItemSaved = (title: string, subject: string) => {
    return savedItems.some(
      (item) => item.title.trim().toLowerCase() === title.trim().toLowerCase() && item.subject === subject
    );
  };

if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
        <FloatingBackground />
        <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 relative">
          <AdminTab />
        </div>
      </div>
    );
  }

const FEATURE_TITLES: Record<OpenFeature, string> = {
notes: 'Soạn Bài Ghi',
    solver: 'Giải Bài Tập',
    presets: 'Kho Bài Mẫu',
    saved: 'Vở Ghi',
    transcript: 'Sổ Học Bạ',
    path: 'Lộ Trình Học Tập',
    flashcards: 'Thẻ Học Thông Minh',
    tips: 'Mẹo Học Tập',
  };

  const renderFeature = (feature: OpenFeature) => {
    switch (feature) {
      case 'notes':
        return siteStatus?.maintenance?.modules?.note ? (
          <ModuleMaintenancePanel message={siteStatus?.maintenance?.message ?? ''} />
        ) : (
          <LessonNoteTab
            onSaveNote={handleSaveItem}
            isItemSaved={isItemSaved}
            subjects={subjects}
            textbooks={textbooks}
            gradeLabel={gradeLabel}
            grade={grade}
          />
        );
      case 'solver':
        return siteStatus?.maintenance?.modules?.solver ? (
          <ModuleMaintenancePanel message={siteStatus?.maintenance?.message ?? ''} />
        ) : (
          <ExerciseSolverTab
            onSaveExercise={handleSaveItem}
            isItemSaved={isItemSaved}
            subjects={subjects}
            gradeLabel={gradeLabel}
            grade={grade}
          />
        );
      case 'presets':
        return siteStatus?.maintenance?.modules?.presets ? (
          <ModuleMaintenancePanel message={siteStatus?.maintenance?.message ?? ''} />
        ) : (
          <PresetLibraryTab
            onImportPreset={handleImportPreset}
            isItemSaved={isItemSaved}
            subjects={subjects}
            grade={grade}
          />
        );
case 'saved':
        return (
          <SavedNotesTab
            items={savedItems}
            onToggleFavorite={handleToggleFavorite}
            onDeleteItem={handleDeleteItem}
            onClearAll={handleClearAll}
            subjects={subjects}
            gradeLabel={gradeLabel}
          />
        );
      case 'transcript':
        return <HocBaTab subjects={subjects} grade={grade} />;
      case 'path':
        return <LoTrinhTab grade={grade} />;
      case 'flashcards':
        return <FlashcardsTab savedItems={savedItems} />;
      case 'tips':
        return <StudyTipsTab />;
    }
  };

  if (siteStatus?.maintenance.enabled) {
    const featureBlocked = openFeature !== null && openFeature !== 'saved';
return (
      <div className="h-dvh flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden relative">
        <FloatingBackground />
        <Navbar
          grade={grade}
          onGradeChange={setGrade}
          onlineCount={onlineCount}
          onHome={() => setOpenFeature(null)}
        />
        <main className="flex-1 min-h-0 overflow-hidden relative">
          {featureBlocked ? (
            <div className="h-full flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto">
                  <Wrench className="w-8 h-8" />
                </div>
                <h1 className="text-xl font-extrabold text-slate-900">
                  Hệ Thống Đang Bảo Trì
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {siteStatus?.maintenance?.message ||
                    'Chúng tôi đang nâng cấp và hoàn thiện. Vui lòng quay lại sau ít phút nữa nhé!'}
                </p>
                <button
                  onClick={() => setOpenFeature('saved')}
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2.5 transition-colors"
                >
                  <FolderHeart className="w-4 h-4" />
                  Vào Vở Ghi của tôi
                </button>
              </div>
            </div>
          ) : openFeature === 'saved' ? (
            <div className="h-full overflow-y-auto px-3 sm:px-6 lg:px-8">
              <div className="max-w-7xl w-full mx-auto py-3 sm:py-4">
                <div className="mb-3 px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs bg-amber-50 border-amber-200 text-amber-800">
                  <span className="font-medium flex items-center gap-1.5 leading-relaxed">
                    <Wrench className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    Hệ thống đang bảo trì: các tính năng AI &amp; Kho bài mẫu tạm khoá. Vở Ghi của bạn
                    vẫn hoạt động bình thường.
                  </span>
                  <button
                    onClick={() => setOpenFeature(null)}
                    className="font-bold text-indigo-600 hover:text-indigo-700 whitespace-nowrap"
                  >
                    Đóng
                  </button>
                </div>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center py-24 text-sm text-slate-400">
                      Đang tải…
                    </div>
                  }
                >
                  <SavedNotesTab
                    items={savedItems}
                    onToggleFavorite={handleToggleFavorite}
                    onDeleteItem={handleDeleteItem}
                    onClearAll={handleClearAll}
                    subjects={subjects}
                    gradeLabel={gradeLabel}
                  />
                </Suspense>
              </div>
            </div>
          ) : (
            <div className="h-full max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
<AppDashboard
                  grade={grade}
                  subjects={subjects}
                  savedItems={savedItems}
                  onOpenFeature={openFeatureChecked}
                  onGradeChange={setGrade}
                />
            </div>
          )}
        </main>
      </div>
    );
  }

return (
    <div className="h-dvh flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-indigo-100 selection:text-indigo-900 relative">
      <FloatingBackground />
      <Navbar
        grade={grade}
        onGradeChange={setGrade}
        onlineCount={onlineCount}
        onHome={() => setOpenFeature(null)}
      />

      <main className="flex-1 min-h-0 overflow-hidden relative">
        {openFeature === null ? (
          <div className="h-full max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
<AppDashboard
                grade={grade}
                subjects={subjects}
                savedItems={savedItems}
                onOpenFeature={openFeatureChecked}
                onGradeChange={setGrade}
              />
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="shrink-0 flex items-center gap-2 px-3 sm:px-6 lg:px-8 py-2 bg-white border-b border-slate-200">
              <button
                onClick={() => setOpenFeature(null)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Bảng điều khiển
              </button>
              <span className="text-sm font-extrabold text-slate-800">
                {FEATURE_TITLES[openFeature]}
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 lg:px-8">
              <div className="max-w-7xl w-full mx-auto py-3 sm:py-4">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center py-24 text-sm text-slate-400">
                      Đang tải…
                    </div>
                  }
                >
                  {renderFeature(openFeature)}
                </Suspense>
              </div>
            </div>
          </div>
        )}
      </main>

      {announcementVisible && announcementText && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-announce-backdrop"
            onClick={dismissAnnouncement}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-announce-in">
            <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 px-5 pt-5 pb-14 relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
                <Megaphone className="w-6 h-6" />
              </div>
              <h2 className="mt-3 text-lg font-extrabold text-white">
                Thông báo từ hệ thống
              </h2>
              <div className="absolute -bottom-6 left-0 right-0 h-12 bg-white rounded-t-[40px]" />
            </div>
            <div className="px-5 pt-9 pb-5">
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                {announcementText}
              </p>
              <button
                onClick={dismissAnnouncement}
                className="mt-6 w-full py-3 text-sm font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] transition-all text-white flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Đã rõ, tiếp tục học
              </button>
            </div>
          </div>
        </div>
      )}

      {donateVisible && siteStatus?.donate?.qrImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-announce-backdrop"
            onClick={() => setDonateVisible(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-announce-in">
            <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400 px-5 pt-5 pb-14 relative">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 text-white ring-1 ring-white/30">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="mt-3 text-lg font-extrabold text-white">
                Ủng hộ & tiếp sức
              </h2>
              <p className="mt-1 text-xs text-rose-100">
                Mọi sự đóng góp giúp web duy trì miễn phí cho mọi học sinh.
              </p>
              <div className="absolute -bottom-6 left-0 right-0 h-12 bg-white rounded-t-[40px]" />
            </div>
            <div className="px-5 pt-9 pb-5 flex flex-col items-center">
              <img
                src={siteStatus.donate.qrImage}
                alt="Mã QR ủng hộ"
                className="w-72 h-72 sm:w-80 sm:h-80 object-contain rounded-2xl border border-slate-200 bg-white p-2.5"
              />
              {siteStatus.donate.note && (
                <p className="mt-4 text-sm text-slate-700 leading-relaxed text-center whitespace-pre-wrap">
                  {siteStatus.donate.note}
                </p>
              )}
              <button
                onClick={() => setDonateVisible(false)}
                className="mt-6 w-full py-3 text-sm font-bold rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-[0.99] transition-all text-white flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                Chân thành cảm ơn bạn
              </button>
            </div>
          </div>
        </div>
      )}

      <AuthModal />
      <VipModal />

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-bounce-short">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
