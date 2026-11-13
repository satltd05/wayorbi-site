import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const INTEREST_OPTIONS = [
  'Créer mes carnets de voyage',
  'Consulter des budgets réels',
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
      setError('Merci d’indiquer votre prénom (au moins 2 caractères).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Merci de saisir une adresse e-mail valide.');
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
      className="relative overflow-hidden bg-gradient-to-br from-[#EAF1FF] via-[#F2F5F9] to-[#F1EBFC] text-[#111827] py-20 sm:py-24 lg:py-28 border-t border-[#E4E9F1]"
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
              className="font-display font-bold tracking-tight text-[#111827] text-3xl sm:text-4xl leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Construisons ensemble le carnet de voyage que vous aimeriez utiliser
            </h2>
            <p className="text-[#4B5563] leading-relaxed text-base">
              Wayorbi est un projet en cours de construction. Préparez un message à envoyer depuis votre messagerie si vous souhaitez suivre ses prochaines étapes ou partager vos attentes de voyageur.
            </p>
            <div className="pt-2 space-y-2 text-sm text-[#4B5563]">
              <p>Aucune inscription ni donnée de contact n’est enregistrée sur cette page.</p>
              <p>Vos retours orientent directement les priorités de la plateforme.</p>
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
                  Votre message est prêt à être envoyé.
                </h3>
                <p className="text-[#4B5563] leading-relaxed max-w-lg">
                  Si votre messagerie s’est ouverte, envoyez le courriel pour que votre demande soit reçue. Rien n’a été enregistré automatiquement sur ce site.
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
                    Ce qui vous intéresse le plus sur Wayorbi
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
                    Une suggestion ou une destination que vous aimeriez documenter ? (optionnel)
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

                <p className="text-xs text-[#6A7891]">Le bouton ouvre votre messagerie avec un brouillon à envoyer à contact@wayorbi.com. Aucun formulaire n’est transmis par ce site.</p>
                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl text-sm sm:text-base font-medium text-white bg-gradient-to-r from-[#2563EB] via-[#5B7CFA] to-[#7C3AED] hover:brightness-105 shadow-[0_10px_28px_rgba(74,143,245,0.28)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A8FF5]"
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
