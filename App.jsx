import { useState } from 'react'

export default function App() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const shorten = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>URL Shortener</h1>
      <div style={{ marginBottom: 8 }}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter a long URL" style={{ width: 400, padding: 8 }} />
        <button onClick={shorten} style={{ marginLeft: 8, padding: '8px 12px' }} disabled={loading || !url}>
          {loading ? 'Shortening…' : 'Shorten'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 12 }}>
          {result.error ? (
            <div style={{ color: 'red' }}>Error: {result.error}</div>
          ) : (
            <div>
              Short URL: <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
              <div style={{ marginTop: 6 }}>Code: <code>{result.code}</code></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
