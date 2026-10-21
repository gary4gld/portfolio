'use client'

import { useState } from 'react'

// Copies the email address to the clipboard, for visitors who use webmail
// instead of a desktop mail app (where mailto: links do nothing useful).
export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // Older browsers / insecure contexts: fall back to a hidden textarea.
      const ta = document.createElement('textarea')
      ta.value = email
      ta.setAttribute('readonly', '')
      ta.style.position = 'absolute'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="px-6 py-3 border border-white/20 text-sm text-white rounded-lg hover:bg-white/5 hover:border-blue-500/40 transition-colors"
    >
      {/* aria-live announces the change to screen readers */}
      <span aria-live="polite">{copied ? 'Copied ✓' : 'Copy email'}</span>
    </button>
  )
}
