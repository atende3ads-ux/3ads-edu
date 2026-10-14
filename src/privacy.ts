export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  mode: 'basic';
  version: typeof CONSENT_VERSION;
  updatedAt: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export const CONSENT_VERSION = '1.0';
export const CONSENT_STORAGE_KEY = '3adsedu_privacy_preferences';
export const PRIVACY_EVENT = '3adsedu:privacy-changed';
const GTM_ID = 'GTM-K82W4KD';

function dataLayerCommand(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function consentState(preferences?: ConsentPreferences) {
  return {
    analytics_storage: preferences?.analytics ? 'granted' : 'denied',
    ad_storage: preferences?.marketing ? 'granted' : 'denied',
    ad_user_data: preferences?.marketing ? 'granted' : 'denied',
    ad_personalization: preferences?.marketing ? 'granted' : 'denied',
  } as const;
}

export function readConsentPreferences(): ConsentPreferences | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
    if (
      parsed.version !== CONSENT_VERSION ||
      parsed.mode !== 'basic' ||
      parsed.necessary !== true ||
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      typeof parsed.updatedAt !== 'string'
    ) return null;
    return parsed as ConsentPreferences;
  } catch {
    return null;
  }
}

function loadTagManager() {
  if (document.querySelector(`script[data-gtm-id="${GTM_ID}"]`)) return;
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  script.dataset.gtmId = GTM_ID;
  document.head.append(script);
}

function clearOptionalCookies() {
  const prefixes = ['_ga', '_gid', '_gat', '_fbp', '_fbc', '_clck', '_clsk'];
  const exact = new Set(['CLID', 'ANONCHK', 'MR', 'MUID', 'SM']);
  const hostParts = window.location.hostname.split('.');
  const domains = ['', window.location.hostname, hostParts.length > 2 ? `.${hostParts.slice(-2).join('.')}` : `.${window.location.hostname}`];

  for (const item of document.cookie.split(';')) {
    const name = item.split('=')[0]?.trim();
    if (!name || (!prefixes.some((prefix) => name.startsWith(prefix)) && !exact.has(name))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

function applyConsent(preferences: ConsentPreferences) {
  dataLayerCommand('consent', 'update', consentState(preferences));
}

export function initializePrivacy() {
  window.dataLayer = window.dataLayer || [];
  dataLayerCommand('consent', 'default', consentState());
  dataLayerCommand('set', 'ads_data_redaction', true);
  dataLayerCommand('set', 'url_passthrough', false);

  const saved = readConsentPreferences();
  if (saved) applyConsent(saved);
  loadTagManager();
}

export function saveConsentPreferences(values: Pick<ConsentPreferences, 'analytics' | 'marketing'>) {
  const previous = readConsentPreferences();
  const preferences: ConsentPreferences = {
    necessary: true,
    analytics: values.analytics,
    marketing: values.marketing,
    mode: 'basic',
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // A escolha continua válida na sessão mesmo quando o navegador bloqueia o armazenamento.
  }
  applyConsent(preferences);
  window.dispatchEvent(new CustomEvent(PRIVACY_EVENT, { detail: preferences }));

  const optionalConsentRevoked = Boolean(previous && (
    (previous.analytics && !preferences.analytics) ||
    (previous.marketing && !preferences.marketing)
  ));
  if (optionalConsentRevoked) {
    clearOptionalCookies();
  }

  return preferences;
}

export function trackAnalyticsEvent(event: string, parameters: Record<string, string> = {}) {
  const consent = readConsentPreferences();
  if (!(consent?.analytics && consent.marketing)) return;
  window.dataLayer.push({ event, ...parameters });
}

export function openPrivacySettings() {
  window.dispatchEvent(new Event('3adsedu:open-privacy-settings'));
}
