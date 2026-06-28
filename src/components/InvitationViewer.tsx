import { useEffect, useMemo, useState } from 'react';
import { decodeInvitePayload, EMPTY_SHARE_META, type EditorElement, type SharedInviteMeta, type SharedInvitePayload } from '../lib/editor-share';

interface Props {
  occasionName: string;
}

type RsvpResponse = 'yes' | 'no' | 'maybe';

const RSVP_RESPONSE_LABELS: Record<RsvpResponse, string> = {
  yes: 'Yes, attending',
  no: 'No, unable to attend',
  maybe: 'Maybe, still confirming',
};

function formatDisplayDateTime(value: string) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.replace('T', ' ');
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

function getEventDates(meta: SharedInviteMeta) {
  const start = meta.startDateTime ? new Date(meta.startDateTime) : null;
  if (!start || Number.isNaN(start.getTime())) {
    return { start: null, end: null };
  }

  const rawEnd = meta.endDateTime ? new Date(meta.endDateTime) : null;
  const hasValidEnd = rawEnd && !Number.isNaN(rawEnd.getTime()) && rawEnd.getTime() > start.getTime();
  const end = hasValidEnd ? rawEnd : new Date(start.getTime() + 2 * 60 * 60 * 1000);

  return { start, end };
}

function toCalendarStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function escapeIcsText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function buildLocation(meta: SharedInviteMeta) {
  return [meta.venueName.trim(), meta.venueAddress.trim()].filter(Boolean).join(', ');
}

function buildEventTitle(meta: SharedInviteMeta, occasionName: string) {
  return meta.eventTitle.trim() || `${occasionName} Invitation`;
}

async function copyText(value: string, fallbackLabel: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    window.prompt(fallbackLabel, value);
    return false;
  }
}

function RenderSharedElement({ element }: { element: EditorElement }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.x,
    top: element.y,
    width: element.w,
    minHeight: element.h,
    transform: `rotate(${element.rotation}deg)`,
    opacity: element.opacity,
    zIndex: element.zIndex,
    borderRadius: 4,
  };

  return (
    <div style={style}>
      {element.kind === 'text' && (
        <div
          style={{
            fontSize: element.fontSize ?? 20,
            fontFamily: element.fontFamily ?? 'Inter',
            fontWeight: element.fontWeight ?? '400',
            color: element.color ?? '#1A1340',
            textAlign: element.textAlign ?? 'center',
            lineHeight: 1.3,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {element.text}
        </div>
      )}
      {element.kind === 'image' && element.src && <img src={element.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
      {element.kind === 'sticker' && <div style={{ fontSize: element.fontSize ?? 48, lineHeight: 1 }}>{element.emoji}</div>}
      {element.kind === 'shape' && (
        <svg width={element.w} height={element.h} viewBox={`0 0 ${element.w} ${element.h}`} style={{ display: 'block' }}>
          {element.shapeType === 'rect' && <rect x={1} y={1} width={element.w - 2} height={element.h - 2} rx={8} fill={element.fill ?? '#4F46E5'} />}
          {element.shapeType === 'circle' && <ellipse cx={element.w / 2} cy={element.h / 2} rx={element.w / 2 - 1} ry={element.h / 2 - 1} fill={element.fill ?? '#EC4899'} />}
          {element.shapeType === 'line' && <line x1={0} y1={element.h / 2} x2={element.w} y2={element.h / 2} stroke={element.fill ?? '#4F46E5'} strokeWidth={element.strokeWidth ?? 3} />}
        </svg>
      )}
    </div>
  );
}

export default function InvitationViewer({ occasionName }: Props) {
  const [payload, setPayload] = useState<SharedInvitePayload | null>(null);
  const [response, setResponse] = useState<RsvpResponse>('yes');
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const [eventCopyState, setEventCopyState] = useState<'idle' | 'copied'>('idle');
  const [calendarState, setCalendarState] = useState<'idle' | 'ready'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('design');
    if (!encoded) return;
    setPayload(decodeInvitePayload(encoded));
  }, []);

  const meta = payload?.meta ?? EMPTY_SHARE_META;
  const { start: eventStart, end: eventEnd } = useMemo(() => getEventDates(meta), [meta]);
  const locationLabel = useMemo(() => buildLocation(meta), [meta]);
  const eventTitle = useMemo(() => buildEventTitle(meta, occasionName), [meta, occasionName]);
  const hasEventDetails = Boolean(meta.eventTitle || meta.venueName || meta.venueAddress || meta.startDateTime || meta.endDateTime);

  const eventDetailsMessage = useMemo(() => {
    const lines = [
      eventTitle,
      eventStart ? `When: ${formatDisplayDateTime(meta.startDateTime)}` : '',
      meta.endDateTime && eventEnd ? `Ends: ${formatDisplayDateTime(meta.endDateTime)}` : '',
      locationLabel ? `Where: ${locationLabel}` : '',
      meta.hostName ? `Host: ${meta.hostName}` : '',
      meta.rsvpBy ? `RSVP by: ${meta.rsvpBy}` : '',
      meta.dressCode ? `Dress code: ${meta.dressCode}` : '',
      meta.schedule ? `Schedule: ${meta.schedule}` : '',
      meta.notes ? `Notes: ${meta.notes}` : '',
    ].filter(Boolean);

    return lines.join('\n');
  }, [eventEnd, eventStart, eventTitle, locationLabel, meta.dressCode, meta.endDateTime, meta.hostName, meta.notes, meta.rsvpBy, meta.schedule, meta.startDateTime]);

  const rsvpMessage = useMemo(() => {
    const greeting = meta.hostName ? `Hello ${meta.hostName},` : 'Hello,';
    const lines = [
      greeting,
      '',
      `I am replying to the ${occasionName} invitation.`,
      `Response: ${RSVP_RESPONSE_LABELS[response]}`,
      `Guest name: ${guestName.trim() || '[Your name]'}`,
      `Guest count: ${guestCount.trim() || '[Guest count]'}`,
      meta.rsvpBy ? `RSVP by: ${meta.rsvpBy}` : '',
      guestMessage.trim() ? `Message: ${guestMessage.trim()}` : '',
    ].filter(Boolean);

    return lines.join('\n');
  }, [guestCount, guestMessage, guestName, meta.hostName, meta.rsvpBy, occasionName, response]);

  const emailHref = useMemo(() => {
    if (!meta.hostEmail) return '';
    const subject = encodeURIComponent(`${RSVP_RESPONSE_LABELS[response]} | ${occasionName} RSVP`);
    const body = encodeURIComponent(rsvpMessage);
    return `mailto:${meta.hostEmail}?subject=${subject}&body=${body}`;
  }, [meta.hostEmail, occasionName, response, rsvpMessage]);

  const whatsappHref = useMemo(() => {
    if (!meta.hostPhone) return '';
    const digits = meta.hostPhone.replace(/[^\d+]/g, '');
    const text = encodeURIComponent(rsvpMessage);
    return `https://wa.me/${digits.replace(/^\+/, '')}?text=${text}`;
  }, [meta.hostPhone, rsvpMessage]);

  const googleCalendarHref = useMemo(() => {
    if (!eventStart || !eventEnd) return '';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      dates: `${toCalendarStamp(eventStart)}/${toCalendarStamp(eventEnd)}`,
      details: eventDetailsMessage,
      location: locationLabel,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [eventDetailsMessage, eventEnd, eventStart, eventTitle, locationLabel]);

  const mapsHref = useMemo(() => {
    if (!locationLabel) return '';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationLabel)}`;
  }, [locationLabel]);

  async function handleCopyMessage() {
    await copyText(rsvpMessage, 'Copy this RSVP summary');
    setCopyState('copied');
    window.setTimeout(() => setCopyState('idle'), 2200);
  }

  async function handleCopyEventDetails() {
    await copyText(eventDetailsMessage, 'Copy these event details');
    setEventCopyState('copied');
    window.setTimeout(() => setEventCopyState('idle'), 2200);
  }

  function handleDownloadCalendar() {
    if (!eventStart || !eventEnd) return;

    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Bespoke Card Studio//Hosted Invite//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@bespokecardstudio.com`,
      `DTSTAMP:${toCalendarStamp(new Date())}`,
      `DTSTART:${toCalendarStamp(eventStart)}`,
      `DTEND:${toCalendarStamp(eventEnd)}`,
      `SUMMARY:${escapeIcsText(eventTitle)}`,
      `DESCRIPTION:${escapeIcsText(eventDetailsMessage)}`,
      locationLabel ? `LOCATION:${escapeIcsText(locationLabel)}` : '',
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .filter(Boolean)
      .join('\r\n');

    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'event'}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    setCalendarState('ready');
    window.setTimeout(() => setCalendarState('idle'), 2200);
  }

  if (!payload) {
    return (
      <div className="rounded-3xl border p-8 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>Invite preview unavailable</h2>
        <p className="mt-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          This hosted invitation needs a valid share link generated from the editor.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_0.55fr]">
      <div className="card-preview-wrap mx-auto w-full max-w-[600px]">
        <div style={{ position: 'relative', width: 600, height: 840, maxWidth: '100%', background: '#fff', overflow: 'hidden', aspectRatio: '600 / 840' }}>
          {payload.elements.map((element) => (
            <RenderSharedElement key={element.id} element={element} />
          ))}
        </div>
      </div>

      <aside className="space-y-5">
        <div className="rounded-3xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>Event details</h2>
          <div className="mt-4 space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <p>
              <strong style={{ color: 'var(--color-text)' }}>Title:</strong> {eventTitle}
            </p>
            {eventStart && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>When:</strong> {formatDisplayDateTime(meta.startDateTime)}
              </p>
            )}
            {meta.endDateTime && eventEnd && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Ends:</strong> {formatDisplayDateTime(meta.endDateTime)}
              </p>
            )}
            {meta.venueName && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Venue:</strong> {meta.venueName}
              </p>
            )}
            {meta.venueAddress && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Address:</strong> {meta.venueAddress}
              </p>
            )}
            {meta.hostName && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Host:</strong> {meta.hostName}
              </p>
            )}
            {meta.rsvpBy && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>RSVP by:</strong> {meta.rsvpBy}
              </p>
            )}
            {meta.dressCode && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Dress code:</strong> {meta.dressCode}
              </p>
            )}
            {meta.schedule && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Schedule:</strong> {meta.schedule}
              </p>
            )}
            {meta.notes && (
              <p>
                <strong style={{ color: 'var(--color-text)' }}>Notes:</strong> {meta.notes}
              </p>
            )}
            {!hasEventDetails && !meta.hostName && !meta.rsvpBy && !meta.dressCode && !meta.schedule && !meta.notes && (
              <p>This hosted invitation is using only the shared card design right now. The host can add event details from the editor&apos;s Share panel.</p>
            )}
          </div>

          {(googleCalendarHref || mapsHref || hasEventDetails) && (
            <div className="mt-5 grid gap-3">
              {googleCalendarHref && (
                <a href={googleCalendarHref} target="_blank" rel="noreferrer" className="rounded-2xl px-4 py-3 text-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
                  Add to Google Calendar
                </a>
              )}
              {eventStart && (
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
                  style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                >
                  {calendarState === 'ready' ? 'Calendar File Ready' : 'Download Calendar File'}
                </button>
              )}
              {mapsHref && (
                <a href={mapsHref} target="_blank" rel="noreferrer" className="rounded-2xl px-4 py-3 text-center text-sm font-bold" style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE' }}>
                  Open Location in Maps
                </a>
              )}
              <button
                type="button"
                onClick={handleCopyEventDetails}
                className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
              >
                {eventCopyState === 'copied' ? 'Event Details Copied' : 'Copy Event Details'}
              </button>
            </div>
          )}
        </div>

        <div className="rounded-3xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>Reply to this invitation</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Choose a response, add your details, and send a structured RSVP to the host by email or WhatsApp.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(Object.entries(RSVP_RESPONSE_LABELS) as Array<[RsvpResponse, string]>).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setResponse(value)}
                className="rounded-2xl px-4 py-3 text-sm font-bold transition-all"
                style={{
                  background: response === value ? 'linear-gradient(135deg,#4F46E5,#7C3AED)' : 'var(--color-surface-2)',
                  color: response === value ? '#fff' : 'var(--color-text)',
                  border: `1px solid ${response === value ? 'transparent' : 'var(--color-border)'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
                Your name
              </label>
              <input
                value={guestName}
                onChange={(event) => setGuestName(event.target.value)}
                className="w-full rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                placeholder="e.g. Priya Sharma"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
                Guest count
              </label>
              <input
                value={guestCount}
                onChange={(event) => setGuestCount(event.target.value)}
                className="w-full rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                placeholder="e.g. 2"
                inputMode="numeric"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em]" style={{ color: 'var(--color-text-muted)' }}>
                Message for the host
              </label>
              <textarea
                value={guestMessage}
                onChange={(event) => setGuestMessage(event.target.value)}
                className="min-h-[100px] w-full rounded-2xl px-4 py-3 text-sm"
                style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
                placeholder="e.g. We are excited to celebrate with you."
              />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border p-4" style={{ background: 'rgba(79,70,229,0.04)', borderColor: 'rgba(79,70,229,0.16)' }}>
            <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: '#4F46E5' }}>
              RSVP summary
            </p>
            <pre className="mt-3 whitespace-pre-wrap text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)', fontFamily: 'Inter, sans-serif' }}>
              {rsvpMessage}
            </pre>
          </div>

          <div className="mt-4 grid gap-3">
            {emailHref && (
              <a href={emailHref} className="rounded-2xl px-4 py-3 text-center text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }}>
                Send RSVP by Email
              </a>
            )}
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-2xl px-4 py-3 text-center text-sm font-bold" style={{ background: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC' }}>
                Send RSVP on WhatsApp
              </a>
            )}
            <button
              type="button"
              onClick={handleCopyMessage}
              className="rounded-2xl px-4 py-3 text-center text-sm font-bold"
              style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)', border: '1px solid var(--color-border)' }}
            >
              {copyState === 'copied' ? 'RSVP Message Copied' : 'Copy RSVP Message'}
            </button>
            {!emailHref && !whatsappHref && (
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                The host has not added RSVP contact details yet, but you can still copy the RSVP summary and send it manually.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
