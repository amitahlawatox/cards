export type EditorElementKind = 'text' | 'image' | 'shape' | 'sticker';

export interface EditorElement {
  id: string;
  kind: EditorElementKind;
  x: number;
  y: number;
  w: number;
  h: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  src?: string;
  shapeType?: 'rect' | 'circle' | 'line';
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  emoji?: string;
}

export interface SharedInviteMeta {
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  rsvpBy: string;
  dressCode: string;
  schedule: string;
  notes: string;
}

export interface SharedInvitePayload {
  version: 1;
  occasionSlug: string;
  occasionName: string;
  activeTemplate: number;
  elements: EditorElement[];
  meta: SharedInviteMeta;
  updatedAt: string;
}

export const EMPTY_SHARE_META: SharedInviteMeta = {
  hostName: '',
  hostEmail: '',
  hostPhone: '',
  rsvpBy: '',
  dressCode: '',
  schedule: '',
  notes: '',
};

function toBase64(value: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'utf-8').toString('base64url');
  }

  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64(value: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'base64url').toString('utf-8');
  }

  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  const binary = atob(normalized + padding);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeInvitePayload(payload: SharedInvitePayload) {
  return toBase64(JSON.stringify(payload));
}

export function decodeInvitePayload(value: string): SharedInvitePayload | null {
  try {
    const parsed = JSON.parse(fromBase64(value)) as SharedInvitePayload;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.elements)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
