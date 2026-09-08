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
import { SavedStudyItem } from './types';
import { PRESET_LESSON_NOTES } from './data/presets';
import { SUBJECTS } from './data/subjects';
import { CheckCircle2, Sparkles, BookOpen, GraduationCap, Megaphone, X, Wrench } from 'lucide-react';

const STORAGE_KEY = 'lop12_study_notebook_v1';
const ANNOUNCE_KEY = 'announcement_dismissed_v1';

interface SiteStatus {
  maintenance: { enabled: boolean; message: string };
  announcement: { enabled: boolean; text: string };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => window.location.hash === '#/admin'
  );
  const [siteStatus, setSiteStatus] = useState<SiteStatus | null>(null);

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
  };

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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {announcementVisible && announcementText && (
          <div className="mb-4 px-4 py-3 rounded-2xl border border-sky-200 bg-sky-50 text-sky-900 text-sm flex items-start gap-2.5">
            <Megaphone className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
            <span className="flex-1 leading-relaxed">{announcementText}</span>
            <button
              onClick={dismissAnnouncement}
              className="p-1 rounded-md hover:bg-sky-100 text-sky-400"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {activeTab === 'notes' && (
          <LessonNoteTab
            onSaveNote={handleSaveItem}
            isItemSaved={isItemSaved}
          />
        )}

        {activeTab === 'solver' && (
          <ExerciseSolverTab
            onSaveExercise={handleSaveItem}
            isItemSaved={isItemSaved}
          />
        )}

        {activeTab === 'presets' && (
          <PresetLibraryTab
            onImportPreset={handleImportPreset}
            isItemSaved={isItemSaved}
          />
        )}

        {activeTab === 'saved' && (
          <SavedNotesTab
            items={savedItems}
            onToggleFavorite={handleToggleFavorite}
            onDeleteItem={handleDeleteItem}
            onClearAll={handleClearAll}
          />
        )}
      </main>

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
            <span>Học Tập Lớp 12 - Chương Trình GDPT 2018 Toàn Diện</span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-2 text-[11px] text-slate-500">
            {SUBJECTS.slice(0, 7).map((s) => (
              <span key={s.id} className="bg-slate-100 px-2 py-0.5 rounded-md">
                {s.shortName} 12
              </span>
            ))}
            <span className="text-slate-400">+ 4 môn khác</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
