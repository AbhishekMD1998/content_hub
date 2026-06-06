import LegalPage from '../components/LegalPage';
import { useMeta } from '../hooks/useMeta';

export default function About() {
  useMeta({ title: 'About', description: 'Learn about Content Hub — our mission, content policy, and how to contact us.', url: '/about' });
  return (
    <LegalPage title="About Content Hub">
      <p>
        Content Hub is a blog and articles platform for thoughtful long-form writing on
        productivity, design, and everyday work. We publish in English and offer Kannada
        reading so more readers can learn in the language they prefer.
      </p>
      <p>
        Posts come from our editorial team and signed-in writers. Some articles may be
        marked as sponsored when we partner with brands we believe are useful to our
        audience. We always disclose paid partnerships clearly.
      </p>
      <h2>Our mission</h2>
      <p>
        Help people find practical ideas they can use right away — without hype, filler,
        or clickbait.
      </p>
      <h2>Contact</h2>
      <p>
        Questions, feedback, or partnership ideas? Email us at{' '}
        <a href="mailto:content98hub@gmail.com">content98hub@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
