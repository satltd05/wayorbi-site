import { useId, useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import type { Carnet } from '../data/carnets';
import { getTraveler } from '../lib/carnets';
import { demoActions, useDemoState } from '../lib/demoStore';
import TravelerAvatar from './TravelerAvatar';
import { SiteLink } from './SiteLink';
import DemoNote, { DemoTag } from './DemoNote';

const MAX = 500;

/** Commentaires d'un carnet : exemples fictifs + commentaires du visiteur, gardés dans son navigateur. */
export default function CommentsSection({ carnet }: { carnet: Carnet }) {
  const { comments } = useDemoState();
  const mine = comments.filter((c) => c.carnetId === carnet.id);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const fieldId = useId();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (text.trim().length < 2) {
      setError('Écris au moins quelques mots avant d’ajouter ton commentaire.');
      return;
    }
    demoActions.addComment(carnet.id, text);
    setText('');
    setError('');
  };

  return (
    <div>
      <ul className="space-y-5">
        {carnet.comments.map((comment, index) => {
          const author = getTraveler(comment.authorId);
          if (!author) return null;
          return (
            <li key={index} className="flex gap-3">
              <TravelerAvatar traveler={author} size="sm" />
              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-white p-4 border border-line">
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <SiteLink to={`/voyageurs/${author.id}`} className="font-semibold text-ink hover:text-sky">
                    {author.name}
                  </SiteLink>
                  {author.id === carnet.authorId && <span className="tag">A écrit ce carnet</span>}
                  <DemoTag>Exemple fictif</DemoTag>
                </p>
                <p className="mt-1.5 text-ink-soft">{comment.text}</p>
              </div>
            </li>
          );
        })}
        {mine.map((comment) => (
          <li key={comment.id} className="flex gap-3">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
              Toi
            </span>
            <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-sky/25 bg-sky/5 p-4">
              <p className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-ink">
                  Ton commentaire <DemoTag>Visible seulement dans ce navigateur</DemoTag>
                </span>
                <button type="button" onClick={() => demoActions.deleteComment(comment.id)} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted hover:bg-white hover:text-like">
                  <Trash2 size={13} aria-hidden="true" /> Supprimer
                </button>
              </p>
              <p className="mt-1.5 whitespace-pre-line text-ink-soft">{comment.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={submit} className="mt-6 rounded-[var(--radius-card)] border border-line bg-white p-4 sm:p-5">
        <label htmlFor={fieldId} className="text-sm font-semibold text-ink">
          Poser une question ou partager une expérience
        </label>
        <textarea
          id={fieldId}
          value={text}
          onChange={(event) => setText(event.target.value.slice(0, MAX))}
          rows={3}
          placeholder="Par exemple : combien de temps faut-il prévoir pour cette étape ?"
          className="field mt-2 resize-y"
          aria-describedby={`${fieldId}-help`}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <DemoNote className="max-w-md">
            <span id={`${fieldId}-help`}>Démonstration : ton commentaire reste dans ce navigateur, personne d’autre ne le voit. {text.length}/{MAX} caractères.</span>
          </DemoNote>
          <button type="submit" className="btn-primary">
            Ajouter mon commentaire
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-like">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
