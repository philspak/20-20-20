/**
 * i18n Translations for 20-20-20 Eye Relaxation App
 * Supported: English (en), German (de), French (fr), Italian (it)
 */

export const translations = {
  en: {
    appTitle: "20 · 20 · 20",
    appSubtitle: "Eye Relaxation & Digital Wellness",
    workPhase: "Focus Session",
    breakPhase: "Eye Relaxation Break",
    pausedPhase: "Paused",
    idlePhase: "Ready to Focus",
    lunchPhase: "Lunch Break",
    afterHoursPhase: "Workday Ended",
    
    // Status text
    statusReady: "Ready when you are. Press Start to begin your 20-minute focus session.",
    statusWorking: "Focus on your screen. We'll remind you when it's time to rest your eyes.",
    statusBreak: "Look at an object at least 20 feet (6 meters) away for 20 seconds.",
    statusPaused: "Session paused. Press Resume when you're back at your desk.",
    statusLunch: "Lunch time (11:30 – 13:00). Step away from screens and enjoy your meal!",
    statusAfterHours: "Past 18:00. Great job today! Time to disconnect and rest your eyes.",
    
    // Controls
    btnStart: "Start Focus",
    btnPause: "Pause",
    btnResume: "Resume",
    btnReset: "Reset",
    btnTakeBreakNow: "Take 20s Break Now",
    btnSkipBreak: "Skip Break",
    btnFinishBreak: "Done Relaxing",
    btnResumeAnyway: "Work Anyway",
    btnSettings: "Settings",
    btnClose: "Close",
    btnSave: "Save Settings",
    btnTestNotification: "Test Notification",
    btnRequestPermission: "Enable Notifications",

    // Break Modal
    modalBreakTitle: "20-Second Eye Break",
    modalBreakInstruction: "Shift your gaze to an object at least 20 feet (6 meters) away.",
    modalDistanceText: "20 FEET / 6 METERS",
    tipBlink: "Blink gently a few times to lubricate your eyes.",
    tipBreathe: "Breathe in deeply and let your shoulders drop.",
    tipRelaxFace: "Relax your forehead and jaw muscles.",
    secondsRemaining: "seconds remaining",

    // Schedule Banner
    scheduleTitle: "Schedule & Business Hours",
    scheduleDescription: "Honours standard business hours (stops at 18:00) with a lunch break (11:30 – 13:00).",
    lunchNoticeTitle: "Lunch Break (11:30 – 13:00)",
    lunchNoticeText: "The timer is paused to encourage screen-free mealtime. You can manually resume if needed.",
    afterHoursNoticeTitle: "Workday Completed (After 18:00)",
    afterHoursNoticeText: "Your eyes have worked hard. The timer is automatically stopped for the evening.",

    // Daily Stats
    statsTitle: "Today's Wellness",
    statsBreaksCompleted: "Breaks Completed",
    statsFocusTime: "Focus Time",
    statsMinutes: "min",
    statsStreak: "Daily Streak",
    statsDays: "days",

    // 20-20-20 Guide
    guideTitle: "The 20-20-20 Rule",
    guideP1: "Developed by optometrist Dr. Jeffrey Anshel, the 20-20-20 rule helps prevent computer vision syndrome (digital eye strain).",
    guideRule1: "Every 20 minutes",
    guideRule1Desc: "of looking at a screen...",
    guideRule2: "Look 20 feet away",
    guideRule2Desc: "at a distant object or out a window...",
    guideRule3: "For 20 seconds",
    guideRule3Desc: "to allow your eye focusing muscles (ciliary muscles) to fully relax.",
    ergonomicTip: "Tip: Ensure your screen is about an arm's length (50–70 cm) away and the top of the monitor is at or slightly below eye level.",

    // Settings
    settingsTitle: "Preferences & Settings",
    settingWorkDuration: "Focus Interval (minutes)",
    settingBreakDuration: "Break Duration (seconds)",
    settingNotifications: "Desktop Notifications",
    settingNotificationsDesc: "Receive alerts when it's time for a break even if the browser is hidden.",
    settingSound: "Audio Chime",
    settingSoundDesc: "Play a gentle singing bowl chime at the start and end of breaks.",
    settingVolume: "Chime Volume",
    settingBusinessHours: "Enforce Business Hours",
    settingBusinessHoursDesc: "Automatically stop tracking after 18:00.",
    settingLunchBreak: "Enforce Lunch Break",
    settingLunchBreakDesc: "Pause timer between 11:30 and 13:00.",
    settingTestingMode: "Demo / Fast Testing Mode",
    settingTestingModeDesc: "Shortens intervals (10s focus / 5s break) for instant demonstration.",
    
    // Notifications & Audio
    notificationBreakTitle: "Time for a 20-second eye break!",
    notificationBreakBody: "Look at an object 20 feet (6m) away to relax your ciliary muscles.",
    notificationWorkTitle: "Break complete! Ready to refocus.",
    notificationWorkBody: "Your 20-minute focus session is starting now.",
    notificationLunchTitle: "Lunch break has arrived!",
    notificationLunchBody: "Step away from your workstation and recharge.",
    notificationAfterHoursTitle: "Workday is finished!",
    notificationAfterHoursBody: "Timer stopped at 18:00. Rest your eyes for the evening.",

    // General
    themeToggle: "Toggle Theme",
    languageSelect: "Language",
    permissionGranted: "Notifications Active",
    permissionDenied: "Notifications Blocked (check browser settings)",
    permissionDefault: "Permission Needed",
  },

  de: {
    appTitle: "20 · 20 · 20",
    appSubtitle: "Augenentspannung & Digitales Wohlbefinden",
    workPhase: "Fokusphase",
    breakPhase: "Augenpause",
    pausedPhase: "Pausiert",
    idlePhase: "Bereit zum Fokussieren",
    lunchPhase: "Mittagspause",
    afterHoursPhase: "Feierabend",
    
    statusReady: "Bereit, wenn Sie es sind. Drücken Sie Start, um Ihre 20-minütige Fokusphase zu beginnen.",
    statusWorking: "Konzentrieren Sie sich auf Ihren Bildschirm. Wir erinnern Sie rechtzeitig an Ihre Augenpause.",
    statusBreak: "Blicken Sie 20 Sekunden lang auf einen Punkt in mindestens 6 Metern (20 Fuß) Entfernung.",
    statusPaused: "Sitzung pausiert. Klicken Sie auf Fortsetzen, wenn Sie wieder am Platz sind.",
    statusLunch: "Mittagspause (11:30 – 13:00). Zeit für eine Bildschirmpause und gutes Essen!",
    statusAfterHours: "Nach 18:00 Uhr. Gute Arbeit heute! Gönnen Sie Ihren Augen Feierabend.",
    
    btnStart: "Fokus starten",
    btnPause: "Pausieren",
    btnResume: "Fortsetzen",
    btnReset: "Zurücksetzen",
    btnTakeBreakNow: "Jetzt 20s Pause",
    btnSkipBreak: "Pause überspringen",
    btnFinishBreak: "Pause beendet",
    btnResumeAnyway: "Trotzdem arbeiten",
    btnSettings: "Einstellungen",
    btnClose: "Schließen",
    btnSave: "Speichern",
    btnTestNotification: "Benachrichtigung testen",
    btnRequestPermission: "Benachrichtigungen aktivieren",

    modalBreakTitle: "20-Sekunden Augenpause",
    modalBreakInstruction: "Richten Sie Ihren Blick auf einen mindestens 6 Meter entfernten Gegenstand.",
    modalDistanceText: "6 METER / 20 FUß",
    tipBlink: "Blinzeln Sie sanft einige Male, um die Augen zu befeuchten.",
    tipBreathe: "Atmen Sie tief ein und lassen Sie die Schultern locker.",
    tipRelaxFace: "Entspannen Sie Stirn und Kiefermuskeln.",
    secondsRemaining: "Sekunden verbleibend",

    scheduleTitle: "Arbeitszeiten & Pausen",
    scheduleDescription: "Berücksichtigt reguläre Arbeitszeiten (Ende um 18:00) mit Mittagspause (11:30 – 13:00).",
    lunchNoticeTitle: "Mittagspause (11:30 – 13:00)",
    lunchNoticeText: "Der Timer ist pausiert, um eine bildschirmfreie Mahlzeit zu unterstützen.",
    afterHoursNoticeTitle: "Feierabend (nach 18:00)",
    afterHoursNoticeText: "Ihre Augen haben viel geleistet. Der Timer ist für heute automatisch beendet.",

    statsTitle: "Heutiges Wohlbefinden",
    statsBreaksCompleted: "Augenpausen",
    statsFocusTime: "Fokuszeit",
    statsMinutes: "Min",
    statsStreak: "Tages-Serie",
    statsDays: "Tage",

    guideTitle: "Die 20-20-20-Regel",
    guideP1: "Entwickelt vom Optometristen Dr. Jeffrey Anshel zur Vorbeugung von digitaler Augenüberlastung (Office-Eye-Syndrom).",
    guideRule1: "Alle 20 Minuten",
    guideRule1Desc: "Bildschirmarbeit...",
    guideRule2: "In 20 Fuß (6 m) Weite",
    guideRule2Desc: "in die Ferne oder aus dem Fenster blicken...",
    guideRule3: "Für 20 Sekunden",
    guideRule3Desc: "damit sich die Ziliarmuskeln der Augen vollständig entspannen können.",
    ergonomicTip: "Tipp: Halten Sie etwa eine Armlänge (50–70 cm) Abstand zum Bildschirm und positionieren Sie die Oberkante auf Augenhöhe.",

    settingsTitle: "Einstellungen",
    settingWorkDuration: "Fokusintervall (Minuten)",
    settingBreakDuration: "Pausendauer (Sekunden)",
    settingNotifications: "Desktop-Benachrichtigungen",
    settingNotificationsDesc: "Erhalten Sie Hinweise auch bei minimiertem Browserfenster.",
    settingSound: "Klangschalen-Ton",
    settingSoundDesc: "Spielt einen sanften Gong zu Beginn und Ende jeder Pause.",
    settingVolume: "Lautstärke",
    settingBusinessHours: "Arbeitszeiten beachten",
    settingBusinessHoursDesc: "Stoppt automatisch nach 18:00 Uhr.",
    settingLunchBreak: "Mittagspause beachten",
    settingLunchBreakDesc: "Pausiert automatisch zwischen 11:30 und 13:00 Uhr.",
    settingTestingMode: "Demo- / Schnelltest-Modus",
    settingTestingModeDesc: "Verkürzt Zeiten (10s Fokus / 5s Pause) für Vorführungen.",

    notificationBreakTitle: "Zeit für eine 20-Sekunden Augenpause!",
    notificationBreakBody: "Schauen Sie in 6 Meter Entfernung, um die Augenmuskeln zu lockern.",
    notificationWorkTitle: "Pause vorbei! Weiter geht's.",
    notificationWorkBody: "Ihre 20-minütige Fokusphase beginnt jetzt.",
    notificationLunchTitle: "Mittagspause!",
    notificationLunchBody: "Verlassen Sie Ihren Schreibtisch und tanken Sie neue Energie.",
    notificationAfterHoursTitle: "Feierabend erreicht!",
    notificationAfterHoursBody: "Timer um 18:00 Uhr gestoppt. Gönnen Sie Ihren Augen Ruhe.",

    themeToggle: "Farbschema wechseln",
    languageSelect: "Sprache",
    permissionGranted: "Benachrichtigungen aktiv",
    permissionDenied: "Blockiert (im Browser freigeben)",
    permissionDefault: "Berechtigung erforderlich",
  },

  fr: {
    appTitle: "20 · 20 · 20",
    appSubtitle: "Relaxation Oculaire & Bien-être Numérique",
    workPhase: "Session de Concentration",
    breakPhase: "Pause Oculaire",
    pausedPhase: "En pause",
    idlePhase: "Prêt à se concentrer",
    lunchPhase: "Pause Déjeuner",
    afterHoursPhase: "Journée Terminée",
    
    statusReady: "Prêt quand vous l'êtes. Cliquez sur Démarrer pour débuter votre session de 20 minutes.",
    statusWorking: "Concentrez-vous sur votre écran. Nous vous avertirons dès qu'il sera temps de détendre vos yeux.",
    statusBreak: "Regardez un objet à au moins 6 mètres (20 pieds) pendant 20 secondes.",
    statusPaused: "Session en pause. Cliquez sur Reprendre lorsque vous êtes de retour.",
    statusLunch: "Pause déjeuner (11h30 – 13h00). Éloignez-vous des écrans et savourez votre repas !",
    statusAfterHours: "Après 18h00. Beau travail aujourd'hui ! Il est temps de déconnecter et reposer vos yeux.",
    
    btnStart: "Démarrer",
    btnPause: "Pause",
    btnResume: "Reprendre",
    btnReset: "Réinitialiser",
    btnTakeBreakNow: "Pause de 20s maintenant",
    btnSkipBreak: "Passer la pause",
    btnFinishBreak: "Pause terminée",
    btnResumeAnyway: "Continuer quand même",
    btnSettings: "Paramètres",
    btnClose: "Fermer",
    btnSave: "Enregistrer",
    btnTestNotification: "Tester la notification",
    btnRequestPermission: "Activer les notifications",

    modalBreakTitle: "Pause Oculaire de 20 Secondes",
    modalBreakInstruction: "Portez votre regard sur un point situé à au moins 6 mètres (20 pieds) de vous.",
    modalDistanceText: "6 MÈTRES / 20 PIEDS",
    tipBlink: "Clignez doucement des yeux pour bien les hydrater.",
    tipBreathe: "Respirez profondément et détendez vos épaules.",
    tipRelaxFace: "Relâchez le front et les muscles de la mâchoire.",
    secondsRemaining: "secondes restantes",

    scheduleTitle: "Horaires & Temps de Repos",
    scheduleDescription: "Respecte les horaires de bureau (arrêt à 18h00) avec pause déjeuner (11h30 – 13h00).",
    lunchNoticeTitle: "Pause Déjeuner (11h30 – 13h00)",
    lunchNoticeText: "Le chronomètre est suspendu pour encourager un repas sans écran.",
    afterHoursNoticeTitle: "Fin de Journée (après 18h00)",
    afterHoursNoticeText: "Vos yeux ont bien travaillé. Le minuteur est automatiquement arrêté pour la soirée.",

    statsTitle: "Bien-être du Jour",
    statsBreaksCompleted: "Pauses Réalisées",
    statsFocusTime: "Temps de Focus",
    statsMinutes: "min",
    statsStreak: "Série en cours",
    statsDays: "jours",

    guideTitle: "La Règle des 20-20-20",
    guideP1: "Conçue par l'optométriste Dr Jeffrey Anshel pour prévenir la fatigue oculaire liée aux écrans.",
    guideRule1: "Toutes les 20 minutes",
    guideRule1Desc: "passées devant l'écran...",
    guideRule2: "Regardez à 6 mètres (20 pieds)",
    guideRule2Desc: "vers un point lointain ou par la fenêtre...",
    guideRule3: "Pendant 20 secondes",
    guideRule3Desc: "pour permettre aux muscles ciliaires de vos yeux de se relâcher complètement.",
    ergonomicTip: "Astuce : Placez votre écran à une longueur de bras (50–70 cm) avec le haut du moniteur au niveau des yeux.",

    settingsTitle: "Paramètres & Préférences",
    settingWorkDuration: "Durée de travail (minutes)",
    settingBreakDuration: "Durée de pause (secondes)",
    settingNotifications: "Notifications Bureau",
    settingNotificationsDesc: "Recevoir une alerte même si votre navigateur est en arrière-plan.",
    settingSound: "Carillon Sonore",
    settingSoundDesc: "Joue un tintement apaisant au début et à la fin de chaque pause.",
    settingVolume: "Volume sonore",
    settingBusinessHours: "Respecter les heures de bureau",
    settingBusinessHoursDesc: "Arrêt automatique après 18h00.",
    settingLunchBreak: "Respecter la pause déjeuner",
    settingLunchBreakDesc: "Pause automatique entre 11h30 et 13h00.",
    settingTestingMode: "Mode Démonstration / Test Rapide",
    settingTestingModeDesc: "Raccourcit les cycles (10s travail / 5s pause) pour tester rapidement.",

    notificationBreakTitle: "Pause de 20 secondes pour vos yeux !",
    notificationBreakBody: "Regardez au loin à 6 mètres pour relaxer vos muscles oculaires.",
    notificationWorkTitle: "Pause terminée ! Prêt à reprendre.",
    notificationWorkBody: "Votre session de concentration commence maintenant.",
    notificationLunchTitle: "C'est l'heure du déjeuner !",
    notificationLunchBody: "Éloignez-vous de votre écran et rechargez vos batteries.",
    notificationAfterHoursTitle: "Fin de la journée de travail !",
    notificationAfterHoursBody: "Minuteur arrêté à 18h00. Reposez vos yeux ce soir.",

    themeToggle: "Changer de thème",
    languageSelect: "Langue",
    permissionGranted: "Notifications activées",
    permissionDenied: "Bloquées (vérifiez votre navigateur)",
    permissionDefault: "Autorisation requise",
  },

  it: {
    appTitle: "20 · 20 · 20",
    appSubtitle: "Rilassamento Oculare & Benessere Digitale",
    workPhase: "Sessione di Concentrazione",
    breakPhase: "Pausa per gli Occhi",
    pausedPhase: "In pausa",
    idlePhase: "Pronto a iniziare",
    lunchPhase: "Pausa Pranzo",
    afterHoursPhase: "Giornata Conclusa",
    
    statusReady: "Pronto quando vuoi. Premi Avvia per iniziare la tua sessione da 20 minuti.",
    statusWorking: "Concentrati sullo schermo. Ti ricorderemo noi quando riposare la vista.",
    statusBreak: "Guarda un oggetto ad almeno 6 metri (20 piedi) per 20 secondi.",
    statusPaused: "Sessione in pausa. Premi Riprendi quando torni alla scrivania.",
    statusLunch: "Pausa pranzo (11:30 – 13:00). Allontanati dagli schermi e goditi il pasto!",
    statusAfterHours: "Dopo le 18:00. Ottimo lavoro oggi! È il momento di staccare e rilassare la vista.",
    
    btnStart: "Inizia Concentrazione",
    btnPause: "Pausa",
    btnResume: "Riprendi",
    btnReset: "Reimposta",
    btnTakeBreakNow: "Fai Pausa di 20s Ora",
    btnSkipBreak: "Salta Pausa",
    btnFinishBreak: "Pausa Finita",
    btnResumeAnyway: "Lavora Comunque",
    btnSettings: "Impostazioni",
    btnClose: "Chiudi",
    btnSave: "Salva Impostazioni",
    btnTestNotification: "Testa Notifica",
    btnRequestPermission: "Attiva Notifiche",

    modalBreakTitle: "Pausa Oculare di 20 Secondi",
    modalBreakInstruction: "Fissa un punto o un oggetto distante almeno 6 metri (20 piedi).",
    modalDistanceText: "6 METRI / 20 PIEDI",
    tipBlink: "Sbatti delicatamente le palpebre per idratare gli occhi.",
    tipBreathe: "Fai un respiro profondo e rilassa le spalle.",
    tipRelaxFace: "Rilassa la fronte e i muscoli della mandibola.",
    secondsRemaining: "secondi rimanenti",

    scheduleTitle: "Orari & Pausa Pranzo",
    scheduleDescription: "Rispetta gli orari d'ufficio (arresto alle 18:00) con pausa pranzo (11:30 – 13:00).",
    lunchNoticeTitle: "Pausa Pranzo (11:30 – 13:00)",
    lunchNoticeText: "Il timer è in pausa per permetterti un pranzo lontano dagli schermi.",
    afterHoursNoticeTitle: "Giornata Lavorativa Conclusa (dopo le 18:00)",
    afterHoursNoticeText: "I tuoi occhi hanno lavorato a lungo. Il timer è disattivato per la serata.",

    statsTitle: "Benessere Oggi",
    statsBreaksCompleted: "Pause Completate",
    statsFocusTime: "Tempo di Focus",
    statsMinutes: "min",
    statsStreak: "Giorni Consecutivi",
    statsDays: "giorni",

    guideTitle: "La Regola 20-20-20",
    guideP1: "Creata dall'optometrista Dr. Jeffrey Anshel per prevenire l'affaticamento visivo da videoterminale.",
    guideRule1: "Ogni 20 minuti",
    guideRule1Desc: "davanti a uno schermo...",
    guideRule2: "Guarda a 20 piedi (6m)",
    guideRule2Desc: "verso un punto lontano o fuori dalla finestra...",
    guideRule3: "Per 20 secondi",
    guideRule3Desc: "per permettere ai muscoli ciliari degli occhi di distendersi completamente.",
    ergonomicTip: "Suggerimento: Mantieni lo schermo a una distanza di circa 50–70 cm con la parte superiore all'altezza degli occhi.",

    settingsTitle: "Preferenze & Impostazioni",
    settingWorkDuration: "Intervallo di Focus (minuti)",
    settingBreakDuration: "Durata Pausa (secondi)",
    settingNotifications: "Notifiche Desktop",
    settingNotificationsDesc: "Ricevi avvisi anche quando la finestra del browser non è visibile.",
    settingSound: "Campana Sonora",
    settingSoundDesc: "Riproduce un suono rilassante all'inizio e alla fine di ogni pausa.",
    settingVolume: "Volume Campana",
    settingBusinessHours: "Rispetta Orari di Lavoro",
    settingBusinessHoursDesc: "Arresto automatico dopo le 18:00.",
    settingLunchBreak: "Rispetta Pausa Pranzo",
    settingLunchBreakDesc: "Pausa automatica dalle 11:30 alle 13:00.",
    settingTestingMode: "Modalità Demo / Test Rapido",
    settingTestingModeDesc: "Accorcia gli intervalli (10s focus / 5s pausa) per verificare il funzionamento.",

    notificationBreakTitle: "Pausa di 20 secondi per la vista!",
    notificationBreakBody: "Guarda a 6 metri di distanza per rilassare i muscoli oculari.",
    notificationWorkTitle: "Pausa terminata! Pronto a concentrarti.",
    notificationWorkBody: "La tua sessione di concentrazione da 20 minuti inizia ora.",
    notificationLunchTitle: "È ora di pranzo!",
    notificationLunchBody: "Allontanati dalla postazione e fai il pieno di energie.",
    notificationAfterHoursTitle: "Giornata lavorativa terminata!",
    notificationAfterHoursBody: "Timer arrestato alle 18:00. Riposa la vista per stasera.",

    themeToggle: "Cambia tema",
    languageSelect: "Lingua",
    permissionGranted: "Notifiche attive",
    permissionDenied: "Bloccate (controlla le impostazioni)",
    permissionDefault: "Autorizzazione richiesta",
  }
};

let currentLanguage = "en";

export function getCurrentLanguage() {
  return currentLanguage;
}

export function t(key) {
  const dict = translations[currentLanguage] || translations.en;
  return dict[key] || translations.en[key] || key;
}

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem("app_language_202020", lang);
    applyTranslations();
    document.documentElement.lang = lang;
  }
}

export function initLanguage() {
  const saved = localStorage.getItem("app_language_202020");
  if (saved && translations[saved]) {
    currentLanguage = saved;
  } else {
    // Detect browser language
    const navLang = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (translations[navLang]) {
      currentLanguage = navLang;
    } else {
      currentLanguage = "en";
    }
  }
  document.documentElement.lang = currentLanguage;
  applyTranslations();
}

export function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      const translated = t(key);
      if (el.tagName === "INPUT" && el.type === "button") {
        el.value = translated;
      } else {
        el.textContent = translated;
      }
    }
  });

  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  placeholders.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.placeholder = t(key);
    }
  });

  const titles = document.querySelectorAll("[data-i18n-title]");
  titles.forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (key) {
      el.title = t(key);
    }
  });

  const ariaLabels = document.querySelectorAll("[data-i18n-aria]");
  ariaLabels.forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key) {
      el.setAttribute("aria-label", t(key));
    }
  });

  // Dispatch event so any custom JS can re-render dynamic strings
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: currentLanguage } }));
}
