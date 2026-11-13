import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const INTEREST_OPTIONS = [
  'Créer mes carnets de voyage',
  'Comparer des budgets détaillés',
  'Trouver des itinéraires',
  'Partager des bons plans',
];

export default function JoinProjectSection() {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState(INTEREST_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError('Indique ton prénom (au moins 2 caractères).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Saisis une adresse e-mail valide, par exemple camille@exemple.fr.');
      return;
    }

    setError('');
    const subject = encodeURIComponent('Wayorbi — Suivre le projet');
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite suivre le projet Wayorbi.\n\nPrénom : ${trimmedName}\nE-mail : ${trimmedEmail}\nCe qui m’intéresse : ${selectedInterest}\nMessage : ${message.trim() || '(aucun)'}\n\nMerci !`);
    window.location.href = `mailto:contact@wayorbi.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="rejoindre"
      className="relative overflow-hidden scroll-mt-20 bg-gradient-to-br from-[#eaf1ff] via-mist to-[#f1ebfc] text-ink py-20 sm:py-24 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left column: Honest project invitation */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <p className="text-sm font-semibold text-[#5468DC]">
              Suivre l’évolution de Wayorbi
            </p>
            <h2
              className="font-display font-semibold text-ink text-3xl sm:text-4xl leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Construisons ensemble l’application que tu aimerais utiliser
            </h2>
            <p className="text-[#4B5563] leading-relaxed text-base">
              Wayorbi est un projet en cours de construction. Prépare un message à envoyer depuis ta messagerie pour suivre ses prochaines étapes ou partager tes attentes de voyageur.
            </p>
            <div className="pt-2 space-y-2 text-sm text-[#4B5563]">
              <p>Aucune inscription ni donnée de contact n’est enregistrée sur cette page.</p>
              <p>Tes retours aident à choisir les priorités du projet.</p>
            </div>
          </motion.div>

          {/* Right column: Validated interactive interest form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-[20px] bg-white border border-[#E4E9F1] shadow-[0_12px_36px_rgba(17,24,39,0.06)] p-6 sm:p-8"
          >
            {submitted ? (
              <div className="py-8 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#6E85EF]/15 text-[#5468DC]">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#111827]">
                  Ton message est prêt à être envoyé.
                </h3>
                <p className="text-[#4B5563] leading-relaxed max-w-lg">
                  Si ta messagerie s’est ouverte, envoie le message pour qu’il soit reçu. Rien n’a été enregistré sur ce site.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="inline-flex items-center min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium text-[#5468DC] border border-[#E4E9F1] hover:bg-[#F7F9FC] transition-colors"
                >
                  Revenir au formulaire
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="wayorbi-name" className="block text-sm font-medium text-[#111827]">
                      Prénom
                    </label>
                    <input
                      id="wayorbi-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Camille"
                      required
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] text-[#111827] placeholder:text-[#8A94A6] text-sm focus:outline-none focus:bg-white focus:border-[#6E85EF] focus:ring-2 focus:ring-[#6E85EF]/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="wayorbi-email" className="block text-sm font-medium text-[#111827]">
                      Adresse e-mail
                    </label>
                    <input
                      id="wayorbi-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="camille@exemple.fr"
                      required
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] text-[#111827] placeholder:text-[#8A94A6] text-sm focus:outline-none focus:bg-white focus:border-[#6E85EF] focus:ring-2 focus:ring-[#6E85EF]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-sm font-medium text-[#111827]">
                    Ce qui t’intéresse le plus
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((option) => {
                      const active = selectedInterest === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedInterest(option)}
                          aria-pressed={active}
                          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-left text-sm transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5] ${
                            active
                              ? 'bg-[#6E85EF]/12 border-[#6E85EF] text-[#111827] font-semibold'
                              : 'bg-[#F7F9FC] border-[#E4E9F1] text-[#4B5563] hover:text-[#111827]'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wayorbi-message" className="block text-sm font-medium text-[#111827]">
                    Une suggestion ou une destination que tu aimerais raconter ? (facultatif)
                  </label>
                  <textarea
                    id="wayorbi-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ex. : pouvoir structurer mes dépenses par étape ou partager un itinéraire avec mes proches..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] text-[#111827] placeholder:text-[#8A94A6] text-sm focus:outline-none focus:bg-white focus:border-[#6E85EF] focus:ring-2 focus:ring-[#6E85EF]/20 resize-y"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-[#E11D48] font-medium">
                    {error}
                  </p>
                )}

                <p className="text-xs text-[#6A7891]">Le bouton ouvre ta messagerie avec un message prêt à envoyer à contact@wayorbi.com. Ce site ne transmet aucun formulaire.</p>
                <div className="pt-1">
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Préparer mon message e-mail
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
