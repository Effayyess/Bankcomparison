// AuthorByline.tsx — Reusable author byline component for guides and bank reviews
// Displays author photo, name, role, credentials, and a "Last Reviewed" date
// Satisfies Google E-E-A-T requirements for YMYL finance content

import { Link } from 'wouter';
import { authors } from '../lib/authorsData';
import { Calendar, Award, ExternalLink } from 'lucide-react';

interface AuthorBylineProps {
  authorId: string;
  lastReviewed?: string; // e.g. "March 2026"
  variant?: 'full' | 'compact';
  showMethodologyLink?: boolean;
}

export default function AuthorByline({
  authorId,
  lastReviewed,
  variant = 'full',
  showMethodologyLink = true,
}: AuthorBylineProps) {
  const author = authors[authorId];
  if (!author) return null;

  const reviewDate = lastReviewed || new Date().toLocaleString('en-GB', { month: 'long', year: 'numeric' });

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm">
        <img
          src={author.photo}
          alt={author.name}
          className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <span className="text-gray-500 text-xs">Written by </span>
          <span className="font-semibold text-gray-800">{author.name}</span>
          <span className="text-gray-500 text-xs">, {author.role}</span>
        </div>
        {lastReviewed && (
          <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
            <Calendar className="w-3 h-3" />
            <span>Reviewed {reviewDate}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Header row */}
      <div className="flex items-start gap-4">
        <img
          src={author.photo}
          alt={author.name}
          className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-100 shadow-sm"
          itemProp="image"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-0.5">Written by</p>
              <h3
                className="font-bold text-gray-900 text-base leading-tight"
                style={{ fontFamily: 'Sora, sans-serif' }}
                itemProp="name"
              >
                {author.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5" itemProp="jobTitle">{author.role}</p>
            </div>
            {lastReviewed && (
              <div
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'rgba(13,148,136,0.08)', color: '#0d9488', border: '1px solid rgba(13,148,136,0.2)' }}
              >
                <Calendar className="w-3 h-3" />
                <span>Last reviewed: {reviewDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Short bio */}
      <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3" itemProp="description">
        {author.shortBio}
      </p>

      {/* Credentials */}
      <div className="flex flex-wrap gap-2 mb-3">
        {author.credentials.map((cred) => (
          <span
            key={cred}
            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd' }}
          >
            <Award className="w-3 h-3 flex-shrink-0" />
            {cred}
          </span>
        ))}
      </div>

      {/* Specialisms */}
      <div className="flex flex-wrap gap-1.5">
        {author.specialisms.map((spec) => (
          <span
            key={spec}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' }}
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Methodology link */}
      {showMethodologyLink && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link
            href="/how-we-review"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium no-underline transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            How we review and rate business bank accounts
          </Link>
        </div>
      )}
    </div>
  );
}
