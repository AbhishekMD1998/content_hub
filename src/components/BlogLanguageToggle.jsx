import { useBlogLanguage } from '../context/BlogLanguageContext';

export default function BlogLanguageToggle({ compact = false }) {
  const { language, setLanguage } = useBlogLanguage();

  return (
    <div
      className={`blog-lang-toggle${compact ? ' blog-lang-toggle-compact' : ''}`}
      role="group"
      aria-label="Blog language"
    >
      <span
        className="blog-lang-indicator"
        aria-hidden="true"
        style={{ transform: language === 'kn' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      <button
        type="button"
        className={language === 'en' ? 'active' : ''}
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
      >
        English
      </button>
      <button
        type="button"
        className={language === 'kn' ? 'active' : ''}
        aria-pressed={language === 'kn'}
        onClick={() => setLanguage('kn')}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
