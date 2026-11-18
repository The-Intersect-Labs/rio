// ─────────────────────────────────────────────────────────────────────────────
// RIO API — HTTP client
// - Injects the Firebase/Auth0 bearer token on every request
// - Unwraps the { success, message, data } envelope
// - Normalises the { success:false, message, statusCode, ... } error envelope
//   into a thrown ApiError
// ─────────────────────────────────────────────────────────────────────────────
import type { ApiEnvelope, ApiErrorBody } from './types'

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://rioai-api.onrender.com/v1'

export class ApiError extends Error {
  status: number
  path?: string
  /** Raw message array (class-validator can return string[]). */
  details?: string[]

  constructor(
    message: string,
    status: number,
    opts?: { path?: string; details?: string[] },
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.path = opts?.path
    this.details = opts?.details
  }
}

/** Resolves the current auth token. Registered by the AuthProvider. */
type TokenGetter = () => Promise<string | null>
let getToken: TokenGetter = async () => null

export function setTokenGetter(fn: TokenGetter) {
  getToken = fn
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  /** Extra headers, e.g. X-Tab-ID for session heartbeat. */
  headers?: Record<string, string>
  /** Skip auth header (used only for /auth/sync). */
  anonymous?: boolean
  signal?: AbortSignal
}

function flattenMessage(message: string | string[]): {
  text: string
  details?: string[]
} {
  if (Array.isArray(message)) {
    return { text: message[0] ?? 'Request failed', details: message }
  }
  return { text: message || 'Request failed' }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, headers = {}, anonymous = false, signal } = options

  const finalHeaders: Record<string, string> = {
    Accept: 'application/json',
    ...headers,
  }
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json'

  if (!anonymous) {
    const token = await getToken()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
      // API auth is bearer-only (no cookies) — keep it simple + cacheable.
      credentials: 'omit',
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    throw new ApiError('Network error — could not reach the RIO API', 0)
  }

  // 204 / empty body
  const text = await res.text()
  const json = text ? (JSON.parse(text) as unknown) : null

  if (!res.ok) {
    const errBody = json as ApiErrorBody | null
    const { text: msg, details } = flattenMessage(errBody?.message ?? res.statusText)
    throw new ApiError(msg, res.status, { path: errBody?.path, details })
  }

  // Unwrap the success envelope
  const envelope = json as ApiEnvelope<T> | null
  if (envelope && typeof envelope === 'object' && 'success' in envelope) {
    if (!envelope.success) {
      throw new ApiError(envelope.message || 'Request failed', res.status)
    }
    return envelope.data as T
  }
  // Fallback for endpoints that don't wrap (e.g. /health)
  return json as T
}

export const api = {
  get: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'GET' }),
  post: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'POST', body }),
  patch: <T>(path: string, body?: unknown, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'PATCH', body }),
  del: <T>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...opts, method: 'DELETE' }),
}
