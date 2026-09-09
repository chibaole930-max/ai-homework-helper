/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { LessonNoteTab } from './components/LessonNoteTab';
import { ExerciseSolverTab } from './components/ExerciseSolverTab';
import { SavedNotesTab } from './components/SavedNotesTab';
import { PresetLibraryTab } from './components/PresetLibraryTab';
import AdminTab from './components/AdminTab';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { VipModal } from './components/VipModal';
import { SavedStudyItem, GradeId } from './types';
import { PRESET_LESSON_NOTES } from './data/presets';
import { SUBJECTS_BY_GRADE, GRADE_LABELS, TEXTBOOKS_BY_GRADE } from './data/grades';
import { CheckCircle2, Sparkles, BookOpen, GraduationCap, Megaphone, Wrench, HeartHandshake } from 'lucide-react';

const STORAGE_KEY = 'lop12_study_notebook_v1';
const ANNOUNCE_KEY = 'announcement_dismissed_v1';
const DONATE_SESSION_KEY = 'donate_shown_session_v1';

interface SiteStatus {
  maintenance: { enabled: boolean; message: string };
  announcement: { enabled: boolean; text: string };
  donate: { enabled: boolean; qrImage: string; note: string };
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
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
    if (savedGrade === '10' || savedGrade === '11' || savedGrade === '12') {
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
    if (sessionStorage.getItem(DONATE_SESSION_KEY) === '1') return;
    sessionStorage.setItem(DONATE_SESSION_KEY, '1');
    setDonateVisible(true);
  };

  useEffect(() => {
    if (announcementText) return;
    openDonateOnce();
  }, [donateEnabled, announcementText]);

  // Initialize saved items from localStorage or fallback to default sample presets
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

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [savedItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveItem = (itemData: Omit<SavedStudyItem, 'id' | 'date'>) => {
    // Check if duplicate title exists
    const exists = savedItems.some(
      (item) => item.title === itemData.title && item.subject === itemData.subject
    );

    if (exists) {
      showToast('Bài này đã có trong Vở Ghi của bạn!');
      return;
    }

    const newItem: SavedStudyItem = {
      ...itemData,
      id: 'saved-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    setSavedItems((prev) => [newItem, ...prev]);
    showToast('Đã lưu bài học vào Vở Ghi thành công!');
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
  };

  const handleDeleteItem = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa bài khỏi Vở Ghi.');
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ bài trong Vở Ghi?')) {
      setSavedItems([]);
      showToast('Đã dọn sạch Vở Ghi.');
    }
  };

  const isItemSaved = (title: string, subject: string) => {
    return savedItems.some(
      (item) => item.title.trim().toLowerCase() === title.trim().toLowerCase() && item.subject === subject
    );
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
          <AdminTab />
        </div>
      </div>
    );
  }

  if (siteStatus?.maintenance.enabled) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedItems.length}
          grade={grade}
          onGradeChange={setGrade}
          onlineCount={onlineCount}
        />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mx-auto">
              <Wrench className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Hệ Thống Đang Bảo Trì
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              {siteStatus.maintenance.message ||
                'Chúng tôi đang nâng cấp và hoàn thiện. Vui lòng quay lại sau ít phút nữa nhé!'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedItems.length}
        grade={grade}
        onGradeChange={setGrade}
        onlineCount={onlineCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'notes' && (
          <LessonNoteTab
            onSaveNote={handleSaveItem}
            isItemSaved={isItemSaved}
            subjects={subjects}
            textbooks={textbooks}
            gradeLabel={gradeLabel}
            grade={grade}
          />
        )}

        {activeTab === 'solver' && (
          <ExerciseSolverTab
            onSaveExercise={handleSaveItem}
            isItemSaved={isItemSaved}
            subjects={subjects}
            gradeLabel={gradeLabel}
            grade={grade}
          />
        )}

        {activeTab === 'presets' && (
          <PresetLibraryTab
            onImportPreset={handleImportPreset}
            isItemSaved={isItemSaved}
            subjects={subjects}
            gradeLabel={gradeLabel}
            grade={grade}
          />
        )}

        {activeTab === 'saved' && (
          <SavedNotesTab
            items={savedItems}
            onToggleFavorite={handleToggleFavorite}
            onDeleteItem={handleDeleteItem}
            onClearAll={handleClearAll}
            subjects={subjects}
            gradeLabel={gradeLabel}
          />
        )}
      </main>

      {/* Announcement Popup Modal */}
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

      {/* Donate QR Popup */}
      {donateVisible && siteStatus?.donate?.qrImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-announce-backdrop"
            onClick={() => setDonateVisible(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-announce-in">
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
                className="w-56 h-56 object-contain rounded-2xl border border-slate-200 bg-white p-2"
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

      {/* Auth & VIP Modals */}
      <AuthModal />
      <VipModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-bounce-short">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Học Tập {gradeLabel} - Chương Trình GDPT 2018 Toàn Diện</span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-2 text-[11px] text-slate-500">
            {subjects.slice(0, 7).map((s) => (
              <span key={s.id} className="bg-slate-100 px-2 py-0.5 rounded-md">
                {s.shortName} {grade}
              </span>
            ))}
            <span className="text-slate-400">+ 4 môn khác</span>
          </div>
        </div>
      </footer>
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
