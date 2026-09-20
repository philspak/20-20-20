/**
 * 20-20-20 Eye Relaxation Application Logic
 * Implements precise timer, business hours, lunch break, PWA, notifications, and audio.
 */

import { initLanguage, setLanguage, getCurrentLanguage, t, applyTranslations } from './i18n.js';
import { playChime, setSoundEnabled, isSoundEnabled, setSoundVolume, getSoundVolume, initAudioUnlock } from './audio.js';

// Timer Phases
const PHASE = {
  IDLE: 'idle',
  WORK: 'work',
  BREAK: 'break',
  PAUSED: 'paused',
  LUNCH: 'lunch',
  AFTER_HOURS: 'after_hours'
};

// Default Configuration
const DEFAULT_CONFIG = {
  workMinutes: 20,
  breakSeconds: 20,
  businessHoursEnforced: true,
  businessHourEnd: 18, // 18:00
  lunchEnforced: true,
  lunchStartHour: 11,
  lunchStartMinute: 30, // 11:30
  lunchEndHour: 13,
  lunchEndMinute: 0,    // 13:00
  soundEnabled: true,
  soundVolume: 0.7,
  demoMode: false // 10s work / 5s break for testing
};

class EyeRelaxApp {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.currentPhase = PHASE.IDLE;
    this.previousPhase = PHASE.IDLE;
    
    this.totalDurationSeconds = this.config.workMinutes * 60;
    this.remainingSeconds = this.totalDurationSeconds;
    this.targetEndTime = null;
    
    this.timerInterval = null;
    this.clockCheckInterval = null;
    this.tipRotationInterval = null;

    this.lunchOverriddenToday = false;
    this.afterHoursOverriddenToday = false;

    // Daily statistics
    this.stats = {
      breaksToday: 0,
      focusSecondsToday: 0,
      streakDays: 1,
      lastActiveDate: new Date().toDateString()
    };

    // Circular progress constants (r=110)
    this.circumference = 2 * Math.PI * 110; // ~691.15

    this.initDOM();
    this.loadState();
    this.bindEvents();
    this.updateScheduleState();
    this.updateUI();
    this.initPWA();
    this.initNotificationStatus();
    initAudioUnlock();
  }

  initDOM() {
    this.dom = {
      themeToggle: document.getElementById('theme-toggle'),
      themeIconSun: document.getElementById('theme-icon-sun'),
      themeIconMoon: document.getElementById('theme-icon-moon'),
      langSelect: document.getElementById('lang-select'),
      
      // Timer Elements
      timerDigits: document.getElementById('timer-digits'),
      timerProgress: document.getElementById('timer-progress'),
      timerPhaseLabel: document.getElementById('timer-phase-label'),
      timerStatusDesc: document.getElementById('timer-status-desc'),
      statusBadge: document.getElementById('status-badge'),
      statusBadgeText: document.getElementById('status-badge-text'),

      // Buttons
      btnPrimaryAction: document.getElementById('btn-primary-action'),
      btnPrimaryText: document.getElementById('btn-primary-text'),
      iconPlay: document.getElementById('primary-icon-play'),
      iconPause: document.getElementById('primary-icon-pause'),
      btnReset: document.getElementById('btn-reset'),
      btnTakeBreak: document.getElementById('btn-take-break'),
      
      // Notice Banners
      lunchNotice: document.getElementById('lunch-notice'),
      btnOverrideLunch: document.getElementById('btn-override-lunch'),
      afterHoursNotice: document.getElementById('after-hours-notice'),
      btnOverrideAfterHours: document.getElementById('btn-override-afterhours'),

      // Break Modal
      breakModal: document.getElementById('break-modal'),
      breakModalCountdown: document.getElementById('break-modal-countdown'),
      breakTipText: document.getElementById('break-tip-text'),
      btnCloseBreakModal: document.getElementById('btn-close-break-modal'),
      btnFinishBreak: document.getElementById('btn-finish-break'),
      btnSkipBreak: document.getElementById('btn-skip-break'),

      // Settings Modal
      btnOpenSettings: document.getElementById('btn-open-settings'),
      settingsModal: document.getElementById('settings-modal'),
      btnCloseSettingsModal: document.getElementById('btn-close-settings-modal'),
      btnSaveSettings: document.getElementById('btn-save-settings'),
      settingWorkDuration: document.getElementById('setting-work-duration'),
      settingBreakDuration: document.getElementById('setting-break-duration'),
      settingSoundEnabled: document.getElementById('setting-sound-enabled'),
      settingVolume: document.getElementById('setting-volume'),
      volumeValDisplay: document.getElementById('volume-val-display'),
      volumeSettingRow: document.getElementById('volume-setting-row'),
      settingBusinessHours: document.getElementById('setting-business-hours'),
      settingLunchEnabled: document.getElementById('setting-lunch-enabled'),
      settingDemoMode: document.getElementById('setting-demo-mode'),
      btnRequestNotif: document.getElementById('btn-request-notif'),
      btnTestNotif: document.getElementById('btn-test-notif'),
      notifPermissionStatus: document.getElementById('notif-permission-status'),

      // Stats Elements
      statBreaks: document.getElementById('stat-breaks'),
      statFocus: document.getElementById('stat-focus'),
      statStreak: document.getElementById('stat-streak')
    };

    if (this.dom.timerProgress) {
      this.dom.timerProgress.style.strokeDasharray = `${this.circumference}`;
      this.dom.timerProgress.style.strokeDashoffset = '0';
    }
  }

  bindEvents() {
    // Theme toggle
    this.dom.themeToggle.addEventListener('click', () => this.toggleTheme());

    // Language select
    this.dom.langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });

    window.addEventListener('languageChanged', () => {
      this.updateUI();
    });

    // Main Timer Buttons
    this.dom.btnPrimaryAction.addEventListener('click', () => this.handlePrimaryAction());
    this.dom.btnReset.addEventListener('click', () => this.resetTimer());
    this.dom.btnTakeBreak.addEventListener('click', () => this.startBreak());

    // Schedule override buttons
    this.dom.btnOverrideLunch.addEventListener('click', () => {
      this.lunchOverriddenToday = true;
      this.dom.lunchNotice.classList.add('hidden');
      this.startWork();
    });

    this.dom.btnOverrideAfterHours.addEventListener('click', () => {
      this.afterHoursOverriddenToday = true;
      this.dom.afterHoursNotice.classList.add('hidden');
      this.startWork();
    });

    // Break Modal Buttons
    const endBreakHandler = () => this.finishBreak();
    this.dom.btnFinishBreak.addEventListener('click', endBreakHandler);
    this.dom.btnCloseBreakModal.addEventListener('click', endBreakHandler);
    this.dom.btnSkipBreak.addEventListener('click', () => this.skipBreak());

    // Settings Modal
    this.dom.btnOpenSettings.addEventListener('click', () => this.openSettings());
    this.dom.btnCloseSettingsModal.addEventListener('click', () => this.dom.settingsModal.close());
    this.dom.btnSaveSettings.addEventListener('click', () => this.saveSettings());
    
    this.dom.settingVolume.addEventListener('input', (e) => {
      const pct = Math.round(e.target.value * 100);
      this.dom.volumeValDisplay.textContent = `${pct}%`;
      setSoundVolume(e.target.value);
    });

    this.dom.settingSoundEnabled.addEventListener('change', (e) => {
      setSoundEnabled(e.target.checked);
      this.dom.volumeSettingRow.style.opacity = e.target.checked ? '1' : '0.4';
    });

    // Notifications
    this.dom.btnRequestNotif.addEventListener('click', () => this.requestNotificationPermission());
    this.dom.btnTestNotif.addEventListener('click', () => this.sendNotification(t('notificationBreakTitle'), t('notificationBreakBody')));

    // Background clock checking (every 15 seconds)
    this.clockCheckInterval = setInterval(() => {
      this.updateScheduleState();
    }, 15000);

    // Visibility change handler to re-sync time when coming back to tab
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.timerInterval && this.targetEndTime) {
        this.tick();
      }
    });
  }

  /* ========================================================================
     Business Hours & Lunch Break Scheduling
     ======================================================================== */
  isLunchTime(now = new Date()) {
    if (!this.config.lunchEnforced) return false;
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const startMins = this.config.lunchStartHour * 60 + this.config.lunchStartMinute; // 11:30 = 690
    const endMins = this.config.lunchEndHour * 60 + this.config.lunchEndMinute;       // 13:00 = 780
    return currentMins >= startMins && currentMins < endMins;
  }

  isAfterHours(now = new Date()) {
    if (!this.config.businessHoursEnforced) return false;
    return now.getHours() >= this.config.businessHourEnd; // >= 18:00
  }

  updateScheduleState() {
    const now = new Date();

    // Check if new day for stats
    const todayStr = now.toDateString();
    if (this.stats.lastActiveDate !== todayStr) {
      this.stats.breaksToday = 0;
      this.stats.focusSecondsToday = 0;
      this.stats.lastActiveDate = todayStr;
      this.lunchOverriddenToday = false;
      this.afterHoursOverriddenToday = false;
      this.saveStats();
    }

    // After hours check
    if (this.isAfterHours(now) && !this.afterHoursOverriddenToday) {
      this.dom.afterHoursNotice.classList.remove('hidden');
      if (this.currentPhase === PHASE.WORK) {
        this.pauseTimer(PHASE.AFTER_HOURS);
        this.sendNotification(t('notificationAfterHoursTitle'), t('notificationAfterHoursBody'));
      }
      return;
    } else {
      this.dom.afterHoursNotice.classList.add('hidden');
    }

    // Lunch break check
    if (this.isLunchTime(now) && !this.lunchOverriddenToday) {
      this.dom.lunchNotice.classList.remove('hidden');
      if (this.currentPhase === PHASE.WORK) {
        this.pauseTimer(PHASE.LUNCH);
        this.sendNotification(t('notificationLunchTitle'), t('notificationLunchBody'));
      }
      return;
    } else {
      this.dom.lunchNotice.classList.add('hidden');
    }
  }

  /* ========================================================================
     Timer Core Engine (Accurate Date.now() timestamp deltas)
     ======================================================================== */
  getWorkDurationSeconds() {
    if (this.config.demoMode) return 10;
    return this.config.workMinutes * 60;
  }

  getBreakDurationSeconds() {
    if (this.config.demoMode) return 5;
    return this.config.breakSeconds;
  }

  handlePrimaryAction() {
    if (this.currentPhase === PHASE.WORK) {
      this.pauseTimer();
    } else if (this.currentPhase === PHASE.PAUSED || this.currentPhase === PHASE.IDLE) {
      this.startWork();
    } else if (this.currentPhase === PHASE.LUNCH || this.currentPhase === PHASE.AFTER_HOURS) {
      // User manually overrides and starts on own condition
      this.lunchOverriddenToday = true;
      this.afterHoursOverriddenToday = true;
      this.startWork();
    }
  }

  startWork() {
    clearInterval(this.timerInterval);
    this.currentPhase = PHASE.WORK;

    if (this.remainingSeconds <= 0 || this.remainingSeconds > this.getWorkDurationSeconds()) {
      this.remainingSeconds = this.getWorkDurationSeconds();
    }
    this.totalDurationSeconds = this.getWorkDurationSeconds();
    this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);

    this.timerInterval = setInterval(() => this.tick(), 250);
    this.updateUI();
  }

  pauseTimer(overridePhase = PHASE.PAUSED) {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.targetEndTime = null;
    this.currentPhase = overridePhase;
    this.updateUI();
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.targetEndTime = null;
    this.currentPhase = PHASE.IDLE;
    this.totalDurationSeconds = this.getWorkDurationSeconds();
    this.remainingSeconds = this.totalDurationSeconds;
    this.updateUI();
  }

  tick() {
    if (!this.targetEndTime) return;

    const msRemaining = this.targetEndTime - Date.now();
    const secsRemaining = Math.max(0, Math.round(msRemaining / 1000));
    
    // Calculate focus time elapsed for stats
    if (this.currentPhase === PHASE.WORK && this.remainingSeconds > secsRemaining) {
      const deltaSec = this.remainingSeconds - secsRemaining;
      this.stats.focusSecondsToday += deltaSec;
      this.updateStatsDisplay();
    }

    this.remainingSeconds = secsRemaining;
    this.updateTimerDisplay();

    if (this.remainingSeconds <= 0) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;

      if (this.currentPhase === PHASE.WORK) {
        // Work finished -> trigger 20-second break popup
        this.startBreak();
      } else if (this.currentPhase === PHASE.BREAK) {
        // Break finished -> conclude break
        this.finishBreak();
      }
    }
  }

  /* ========================================================================
     Break Logic & Popup Modal
     ======================================================================== */
  startBreak() {
    clearInterval(this.timerInterval);
    this.currentPhase = PHASE.BREAK;
    this.totalDurationSeconds = this.getBreakDurationSeconds();
    this.remainingSeconds = this.totalDurationSeconds;
    this.targetEndTime = Date.now() + (this.remainingSeconds * 1000);

    // Audio Chime & System Notification
    playChime('startBreak');
    this.sendNotification(t('notificationBreakTitle'), t('notificationBreakBody'));

    // Open Accessible In-App Modal Dialog
    this.openBreakModal();

    this.timerInterval = setInterval(() => this.tick(), 250);
    this.updateUI();
  }

  openBreakModal() {
    if (!this.dom.breakModal) return;
    this.dom.breakModalCountdown.textContent = `${this.remainingSeconds}`;
    
    // Rotate relaxation tips
    const tips = [
      t('tipBlink'),
      t('tipBreathe'),
      t('tipRelaxFace'),
      t('modalBreakInstruction')
    ];
    let tipIdx = 0;
    this.dom.breakTipText.textContent = tips[0];

    clearInterval(this.tipRotationInterval);
    this.tipRotationInterval = setInterval(() => {
      tipIdx = (tipIdx + 1) % tips.length;
      this.dom.breakTipText.textContent = tips[tipIdx];
    }, 5000);

    try {
      if (!this.dom.breakModal.open) {
        this.dom.breakModal.showModal();
      }
    } catch {
      this.dom.breakModal.setAttribute('open', 'true');
    }
  }

  finishBreak() {
    clearInterval(this.timerInterval);
    clearInterval(this.tipRotationInterval);
    this.timerInterval = null;

    if (this.dom.breakModal && this.dom.breakModal.open) {
      this.dom.breakModal.close();
    }

    // Audio chime for break completion
    playChime('endBreak');
    this.sendNotification(t('notificationWorkTitle'), t('notificationWorkBody'));

    // Increment Break Stats
    this.stats.breaksToday += 1;
    this.saveStats();
    this.updateStatsDisplay();

    // Transition back to Focus Work Session
    this.startWork();
  }

  skipBreak() {
    clearInterval(this.timerInterval);
    clearInterval(this.tipRotationInterval);
    this.timerInterval = null;

    if (this.dom.breakModal && this.dom.breakModal.open) {
      this.dom.breakModal.close();
    }

    this.startWork();
  }

  /* ========================================================================
     UI Rendering & Updates
     ======================================================================== */
  updateUI() {
    this.updateTimerDisplay();
    this.updatePhaseBadge();
    this.updateActionButtons();
    this.updateStatsDisplay();
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    this.dom.timerDigits.textContent = formatted;
    document.title = `${formatted} · 20-20-20`;

    // Break modal countdown update
    if (this.dom.breakModal && this.dom.breakModal.open) {
      this.dom.breakModalCountdown.textContent = `${this.remainingSeconds}`;
    }

    // Circular Progress stroke-dashoffset
    if (this.dom.timerProgress && this.totalDurationSeconds > 0) {
      const progress = 1 - (this.remainingSeconds / this.totalDurationSeconds);
      const offset = this.circumference * (1 - progress);
      this.dom.timerProgress.style.strokeDashoffset = `${offset}`;

      if (this.currentPhase === PHASE.BREAK) {
        this.dom.timerProgress.classList.add('break-mode');
      } else {
        this.dom.timerProgress.classList.remove('break-mode');
      }
    }
  }

  updatePhaseBadge() {
    const badge = this.dom.statusBadge;
    const text = this.dom.statusBadgeText;
    const desc = this.dom.timerStatusDesc;
    const phaseLabel = this.dom.timerPhaseLabel;

    badge.className = 'meta-tag';

    switch (this.currentPhase) {
      case PHASE.IDLE:
        badge.classList.add('status-work');
        text.textContent = t('idlePhase');
        phaseLabel.textContent = t('workPhase');
        desc.textContent = t('statusReady');
        break;
      case PHASE.WORK:
        badge.classList.add('status-work');
        text.textContent = t('workPhase');
        phaseLabel.textContent = t('workPhase');
        desc.textContent = t('statusWorking');
        break;
      case PHASE.BREAK:
        badge.classList.add('status-break');
        text.textContent = t('breakPhase');
        phaseLabel.textContent = t('breakPhase');
        desc.textContent = t('statusBreak');
        break;
      case PHASE.PAUSED:
        badge.classList.add('status-paused');
        text.textContent = t('pausedPhase');
        phaseLabel.textContent = t('pausedPhase');
        desc.textContent = t('statusPaused');
        break;
      case PHASE.LUNCH:
        badge.classList.add('status-lunch');
        text.textContent = t('lunchPhase');
        phaseLabel.textContent = t('lunchPhase');
        desc.textContent = t('statusLunch');
        break;
      case PHASE.AFTER_HOURS:
        badge.classList.add('status-afterhours');
        text.textContent = t('afterHoursPhase');
        phaseLabel.textContent = t('afterHoursPhase');
        desc.textContent = t('statusAfterHours');
        break;
    }
  }

  updateActionButtons() {
    if (this.currentPhase === PHASE.WORK) {
      this.dom.iconPlay.style.display = 'none';
      this.dom.iconPause.style.display = 'inline-block';
      this.dom.btnPrimaryText.textContent = t('btnPause');
    } else if (this.currentPhase === PHASE.PAUSED) {
      this.dom.iconPlay.style.display = 'inline-block';
      this.dom.iconPause.style.display = 'none';
      this.dom.btnPrimaryText.textContent = t('btnResume');
    } else {
      this.dom.iconPlay.style.display = 'inline-block';
      this.dom.iconPause.style.display = 'none';
      this.dom.btnPrimaryText.textContent = t('btnStart');
    }
  }

  updateStatsDisplay() {
    this.dom.statBreaks.textContent = `${this.stats.breaksToday}`;
    const focusMins = Math.floor(this.stats.focusSecondsToday / 60);
    this.dom.statFocus.textContent = `${focusMins}`;
    this.dom.statStreak.textContent = `${this.stats.streakDays}`;
  }

  /* ========================================================================
     Theming & Persistence
     ======================================================================== */
  toggleTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      this.dom.themeIconSun.style.display = 'none';
      this.dom.themeIconMoon.style.display = 'inline-block';
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.dom.themeIconSun.style.display = 'inline-block';
      this.dom.themeIconMoon.style.display = 'none';
    }

    localStorage.setItem('theme_preference_202020', newTheme);
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme_preference_202020') || 'dark';
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      this.dom.themeIconSun.style.display = 'none';
      this.dom.themeIconMoon.style.display = 'inline-block';
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.dom.themeIconSun.style.display = 'inline-block';
      this.dom.themeIconMoon.style.display = 'none';
    }
  }

  /* ========================================================================
     Settings Modal Logic
     ======================================================================== */
  openSettings() {
    this.dom.settingWorkDuration.value = this.config.workMinutes;
    this.dom.settingBreakDuration.value = this.config.breakSeconds;
    this.dom.settingSoundEnabled.checked = this.config.soundEnabled;
    this.dom.settingVolume.value = this.config.soundVolume;
    this.dom.volumeValDisplay.textContent = `${Math.round(this.config.soundVolume * 100)}%`;
    this.dom.settingBusinessHours.checked = this.config.businessHoursEnforced;
    this.dom.settingLunchEnabled.checked = this.config.lunchEnforced;
    this.dom.settingDemoMode.checked = this.config.demoMode;

    try {
      this.dom.settingsModal.showModal();
    } catch {
      this.dom.settingsModal.setAttribute('open', 'true');
    }
  }

  saveSettings() {
    this.config.workMinutes = Math.max(1, parseInt(this.dom.settingWorkDuration.value, 10) || 20);
    this.config.breakSeconds = Math.max(5, parseInt(this.dom.settingBreakDuration.value, 10) || 20);
    this.config.soundEnabled = this.dom.settingSoundEnabled.checked;
    this.config.soundVolume = parseFloat(this.dom.settingVolume.value);
    this.config.businessHoursEnforced = this.dom.settingBusinessHours.checked;
    this.config.lunchEnforced = this.dom.settingLunchEnabled.checked;
    this.config.demoMode = this.dom.settingDemoMode.checked;

    setSoundEnabled(this.config.soundEnabled);
    setSoundVolume(this.config.soundVolume);

    localStorage.setItem('config_202020', JSON.stringify(this.config));

    if (this.currentPhase === PHASE.IDLE) {
      this.totalDurationSeconds = this.getWorkDurationSeconds();
      this.remainingSeconds = this.totalDurationSeconds;
    }

    this.dom.settingsModal.close();
    this.updateScheduleState();
    this.updateUI();
  }

  /* ========================================================================
     Desktop Notifications API
     ======================================================================== */
  initNotificationStatus() {
    if (!('Notification' in window)) {
      this.dom.btnRequestNotif.style.display = 'none';
      this.dom.btnTestNotif.style.display = 'none';
      return;
    }

    if (Notification.permission === 'granted') {
      this.dom.notifPermissionStatus.textContent = t('permissionGranted');
      this.dom.btnRequestNotif.style.display = 'none';
    } else if (Notification.permission === 'denied') {
      this.dom.notifPermissionStatus.textContent = t('permissionDenied');
      this.dom.btnRequestNotif.disabled = true;
    }
  }

  async requestNotificationPermission() {
    if (!('Notification' in window)) return;
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.dom.notifPermissionStatus.textContent = t('permissionGranted');
        this.dom.btnRequestNotif.style.display = 'none';
        this.sendNotification(t('appTitle'), t('permissionGranted'));
      } else {
        this.dom.notifPermissionStatus.textContent = t('permissionDenied');
      }
    } catch {
      // Permission request error handling
    }
  }

  sendNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: body,
          icon: './icons/icon-192.png',
          badge: './icons/icon-192.png',
          tag: 'eye-relaxation-break',
          renotify: true
        });
      } catch {
        // Fallback in some browser environments
      }
    }
  }

  /* ========================================================================
     PWA Service Worker Registration (Relative Subpath Safe)
     ======================================================================== */
  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Use relative path './sw.js' with relative scope './' for reverse proxy subpaths
        navigator.serviceWorker.register('./sw.js', { scope: './' })
          .then((reg) => {
            console.log('20-20-20 Service Worker registered at scope:', reg.scope);
          })
          .catch((err) => {
            console.warn('Service Worker registration skipped:', err);
          });
      });
    }
  }

  /* ========================================================================
     State Persistence
     ======================================================================== */
  loadState() {
    // Config
    try {
      const savedConfig = localStorage.getItem('config_202020');
      if (savedConfig) {
        this.config = { ...DEFAULT_CONFIG, ...JSON.parse(savedConfig) };
      }
    } catch {}

    setSoundEnabled(this.config.soundEnabled);
    setSoundVolume(this.config.soundVolume);

    // Stats
    try {
      const savedStats = localStorage.getItem('stats_202020');
      if (savedStats) {
        this.stats = { ...this.stats, ...JSON.parse(savedStats) };
      }
    } catch {}

    this.initTheme();
    initLanguage();
    this.dom.langSelect.value = getCurrentLanguage();
  }

  saveStats() {
    try {
      localStorage.setItem('stats_202020', JSON.stringify(this.stats));
    } catch {}
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.eyeApp = new EyeRelaxApp();
});
