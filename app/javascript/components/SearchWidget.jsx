import React, { useState } from 'react';

export default function SearchWidget() {
  const [form, setForm] = useState({ location: '', adults: 1 });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resp = await fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify(form)
    });
    const json = await resp.json();
    setData(json);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={onSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          placeholder="Location"
          onChange={e => setForm({...form, location: e.target.value})}
          required
        />
        <select onChange={e => setForm({...form, adults: e.target.value})}>
          {[1,2,3,4].map(n => <option key={n} value={n}>{n} Adults</option>)}
        </select>
        <button type="submit" disabled={loading}>{loading ? '...' : 'Search'}</button>
      </form>

      {data && (
        <pre style={{ background: '#f4f4f4', padding: '15px', overflow: 'auto', borderRadius: '5px' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}