# Resource Request Form — Technical Documentation

## 1. Overview

The Resource Request form is a client-rendered React component that lives at the
bottom of the `/resources` page. It allows visitors to submit a brief pitch for
an SOP, template, or other resource that does not yet exist in the library. On
submit, the form sends a JSON payload to a Make.com webhook, which triggers an
external automation (e.g. email notification, database insert, Slack alert).

---

## 2. File Structure

```
resources/
├── components/
│   └── ResourceRequest.tsx      ← the form component
├── app/
│   └── resources/
│       └── page.tsx             ← imports & places the form
└── docs/
    └── RESOURCE_REQUEST_FORM.md ← this document
```

---

## 3. Component Anatomy

### 3.1 File: `components/ResourceRequest.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
```

All state and rendering happen on the client side; the component is never
server-rendered.

### 3.2 Constants

| Constant | Value | Purpose |
|---|---|---|
| `WEBHOOK_URL` | `https://hook.eu1.make.com/rdk97wmwkvqke9jp3jidxrum59sp6c4z` | Make.com webhook endpoint |

---

## 4. State Management

Four `useState` hooks track the form lifecycle:

| State Variable | Type | Purpose |
|---|---|---|
| `email` | `string` | Bound to the email input field |
| `topic` | `string` | Bound to the topic textarea |
| `submitted` | `boolean` | `true` after a successful webhook response — triggers the success message |
| `submitting` | `boolean` | `true` during the in-flight `fetch` — disables the button and shows "Sending…" |
| `error` | `string` | Holds a human-readable validation or network error message |

---

## 5. Form Validation

Two layers of validation run **before** the network request:

### 5.1 Empty-field check

```
if (!email.trim() || !topic.trim()) → "Please fill in both fields."
```

Trims whitespace so a string of spaces is treated as empty.

### 5.2 Email format check

```
const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
```

A pragmatic regex that rejects:
- Strings with no `@` symbol
- Strings with spaces
- Strings with no dot after the `@`

Rejects strings like `"no-at-sign"`, `"missing@dot"`, `"has space@domain.com"`.

### 5.3 Network-level validation

If the `fetch` to the Make.com webhook returns a non-2xx status, the catch
handler sets the error message to:

```
"Something went wrong. Please try again."
```

---

## 6. Submission Flow

```
User clicks "Request Resource"
         │
         ▼
handleSubmit(e) fires
         │
         ├─ preventDefault()          ← stops browser form navigation
         ├─ Empty-field check         ← if fail → setError + stop
         ├─ Email format check        ← if fail → setError + stop
         │
         ▼  (all checks pass)
setSubmitting(true)
         │
         ▼
fetch(WEBHOOK_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email:   email.trim(),
    topic:   topic.trim(),
    date:    new Date().toISOString()
  })
})
         │
    ┌────┴────┐
    │         │
  res.ok      !res.ok
    │         │
    ▼         ▼
setSubmitted  setError("Something went wrong…")
(true)          (finally: setSubmitting(false))
    │
setEmail("")
setTopic("")
setSubmitting(false)
```

### 6.1 Payload Shape

```json
{
  "email": "user@example.com",
  "topic": "A social media content calendar for a SaaS startup",
  "date":  "2026-08-19T14:32:07.123Z"
}
```

Key point: `email` and `topic` are **trimmed** of leading/trailing whitespace
before being serialised. `date` is added automatically as an ISO-8601 UTC
timestamp.

### 6.2 Webhook endpoint

```
POST https://hook.eu1.make.com/rdk97wmwkvqke9jp3jidxrum59sp6c4z
Content-Type: application/json
```

This URL is a **Make.com webhook** (formerly Integromat). When Make receives the
POST it can trigger any configured scenario — commonly:
- Send an email notification to the site owner
- Append the row to a Google Sheet or Airtable
- Post to a Slack channel
- Create a task in a project management tool

---

## 7. UI States

The component uses `AnimatePresence mode="wait"` to smoothly cross-fade between
two mutually exclusive views.

### 7.1 Form state (`submitted === false`)

Renders a `<form>` containing:

| Element | Details |
|---|---|
| Email `<input>` | `type="email"`, `id="requesterEmail"`, required, `placeholder="you@example.com"` |
| Topic `<textarea>` | `id="sopTopic"`, required, `maxLength={100}`, `rows={3}`, `placeholder='e.g. "A social media content calendar for a SaaS startup"'` |
| Helper text | `"Keep it brief — max 100 characters (one or two sentences)"` below the textarea |
| Error message | Red `text-xs` `<p>` that animates in/out with `AnimatePresence` |
| Submit button | Full-width, `Send` icon + "Request Resource" label, disabled while `submitting` |

### 7.2 Success state (`submitted === true`)

Shows a centered success message:

```
Request received! We'll draft an outline and notify you once it's live.
```

Plus a low-key "Submit another request" link that resets `submitted` to `false`
without clearing the inputs (the inputs are already cleared on submit).

### 7.3 Transition animations

| Property | Value |
|---|---|
| Enter (form & success) | `opacity: 0 → 1`, `y: 10 → 0`, duration 0.25 s |
| Exit | `opacity: 1 → 0`, `y: 0 → -10`, duration 0.2 s |

Because `mode="wait"` is set, the exiting view finishes its exit animation
before the entering view begins — no overlap.

---

## 8. Design System Integration

The form's visual language is derived directly from the project's design tokens
defined in `app/globals.css`:

| Aspect | Implementation |
|---|---|
| **Card container** | `bg-white dark:bg-warm-900 rounded-2xl border border-warm-200 dark:border-warm-800 shadow-xl` |
| **Typography** | `font-display` (Playfair Display) for heading; `text-warm-900/700/600/400` for body |
| **Input fields** | `bg-warm-50 dark:bg-warm-800` with `border-warm-200 dark:border-warm-700`; focus ring uses `ring-accent/40` |
| **Primary button** | `bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900` — identical to the download CTA |
| **Error text** | `text-red-500 dark:text-red-400` |
| **Helper text** | `text-warm-400 dark:text-warm-500` |
| **Spacing** | `space-y-4` between fields; `p-6 sm:p-8 md:p-10` on the card |

### 8.1 Dark mode

All color tokens have explicit dark-mode counterparts. No hardcoded hex values
appear in the component — it relies entirely on the `dark:` variant classes.

---

## 9. Page Integration

In `app/resources/page.tsx` the form is rendered **inside** the existing page
padding container, directly after the resource cards grid:

```tsx
{/* Resource Request */}
<div className="mt-12 md:mt-20">
  <ResourceRequest />
</div>
```

| Breakpoint | Top margin |
|---|---|
| Mobile (`default`) | `mt-12` → 48 px |
| Tablet & up (`md:`) | `mt-20` → 80 px |

This creates premium breathing room between the last card row and the form card.
The form card itself is centered with `max-w-2xl mx-auto` inside the component,
so it never stretches full-width on large screens.

---

## 10. Accessibility

| Feature | Implementation |
|---|---|
| **Label association** | Every `<input>` / `<textarea>` has a `<label htmlFor>` matching its `id` |
| **Required fields** | Native HTML `required` attribute on both fields |
| **Error announcement** | Error text is a `<p>` element, not an `alert`, so it reads naturally in the DOM |
| **Keyboard submit** | `<form onSubmit>` handles Enter key submission natively |
| **Disabled state** | Button gets `disabled` attribute + `disabled:opacity-50` visual while submitting |
| **Focus order** | Logical top-to-bottom: email → topic → submit |

Note: the form uses **controlled inputs** (React `useState`), so React handles
the DOM value on every keystroke. The HTML `required` and `type="email"`
attributes provide native browser validation as a safety net before React's logic
runs.

---

## 11. Character Limits

The topic field enforces a hard ceiling:

```tsx
<textarea maxLength={100} ... />
```

Browsers silently stop accepting input at 100 characters. The helper text below
the field ("Keep it brief — max 100 characters (one or two sentences)") and the
placeholder (`'e.g. "A social media content calendar for a SaaS startup"'`)
guide users to stay well under the limit without needing to count characters.

---

## 12. Error Handling Summary

| Error condition | User-visible message |
|---|---|
| Both fields blank | "Please fill in both fields." |
| Invalid email format | "Please enter a valid email address." |
| Webhook returns non-2xx | "Something went wrong. Please try again." |
| Network failure (fetch throws) | "Something went wrong. Please try again." |

All error messages are styled in `text-red-500 dark:text-red-400` and animate
in with a subtle fade + slide via `AnimatePresence`. They clear automatically
on the next successful validation pass (the `setError("")` call at the top of
`handleSubmit`).

---

## 13. Future Customisation Points

If requirements change, these are the natural extension points:

| What | Where |
|---|---|
| Change webhook URL | `WEBHOOK_URL` constant at the top of `ResourceRequest.tsx` |
| Add a dropdown / select field | New `<select>` alongside the existing fields in the form JSX |
| Add CAPTCHA / anti-spam | Wrap `handleSubmit` body, or add a honeypot hidden field |
| Persist to a database | Change the webhook URL to your own API route (`/api/resource-request`) |
| Add a reCAPTCHA badge or privacy note | Below the submit button, before the closing `</form>` |
| Change the character limit | Update `maxLength={100}` on the `<textarea>` and the helper text string |
| Adjust animation speed | Modify `transition={{ duration: 0.25 }}` on the `motion.form` / `motion.div` elements |