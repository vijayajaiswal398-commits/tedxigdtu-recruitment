'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileText,
  Filter,
  LockKeyhole,
  Search,
  Ticket,
  X,
} from 'lucide-react'

const domains = ['Content', 'Design', 'Events', 'Finance', 'Marketing', 'Operations', 'PR & Outreach']
const statuses = ['Pending', 'Shortlisted', 'Rejected'] as const

type Status = (typeof statuses)[number]
type Application = {
  id: string
  name: string
  email: string
  branch: string
  year: string
  domain: string
  portfolio: string
  why: string
  experience: string
  status: Status
}

const seedApplications: Application[] = [
  { id: 'TXG-2026-0001', name: 'Aarushi Mehta', email: 'aarushi.m@example.com', branch: 'CSE', year: '3rd Year', domain: 'Design', portfolio: 'behance.net/aarushi', why: 'I want to make ideas impossible to ignore.', experience: 'Designed for two campus festivals.', status: 'Shortlisted' },
  { id: 'TXG-2026-0002', name: 'Rohan Kapoor', email: 'rohan.k@example.com', branch: 'ECE', year: '2nd Year', domain: 'Events', portfolio: 'linkedin.com/in/rohan-k', why: 'The best moments happen behind the curtain.', experience: 'Volunteer lead at E-Summit.', status: 'Pending' },
  { id: 'TXG-2026-0003', name: 'Sana Sheikh', email: 'sana.s@example.com', branch: 'IT', year: '4th Year', domain: 'Content', portfolio: 'sanasheikh.com', why: 'Stories create the bridges we need.', experience: 'Editor for the university magazine.', status: 'Shortlisted' },
  { id: 'TXG-2026-0004', name: 'Dev Agarwal', email: 'dev.a@example.com', branch: 'ME', year: '1st Year', domain: 'Marketing', portfolio: 'linkedin.com/in/dev-a', why: 'I bring curiosity, energy, and a full notebook.', experience: 'Managed social content for a student club.', status: 'Rejected' },
]

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>
}

function StatusPill({ status }: { status: Status }) {
  return <span className={`status status-${status.toLowerCase()}`}><i />{status}</span>
}

export default function Page() {
  const [view, setView] = useState<'apply' | 'admin'>('apply')
  const [applications, setApplications] = useState(seedApplications)
  const [submitted, setSubmitted] = useState<Application | null>(null)
  const [selected, setSelected] = useState<Application | null>(null)
  const [search, setSearch] = useState('')
  const [domainFilter, setDomainFilter] = useState('All domains')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [form, setForm] = useState({ name: '', email: '', branch: '', year: '', domain: '', portfolio: '', why: '', experience: '' })
  const [error, setError] = useState('')

  const filtered = useMemo(() => applications.filter((app) => {
    const matchesSearch = `${app.name} ${app.email} ${app.id}`.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (domainFilter === 'All domains' || app.domain === domainFilter) && (statusFilter === 'All statuses' || app.status === statusFilter)
  }), [applications, search, domainFilter, statusFilter])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name || !form.email || !form.branch || !form.year || !form.domain || !form.why) return setError('Please complete all required fields marked with *.')
    if (applications.some((app) => app.email.toLowerCase() === form.email.toLowerCase())) return setError('An application with this email already exists.')
    const id = `TXG-2026-${String(applications.length + 1).padStart(4, '0')}`
    const next = { ...form, id, status: 'Pending' as Status }
    setApplications((current) => [...current, next])
    setSubmitted(next)
    setError('')
  }

  const exportCsv = () => {
    const header = 'Ticket,Name,Email,Branch,Year,Domain,Status\n'
    const rows = applications.map((a) => [a.id, a.name, a.email, a.branch, a.year, a.domain, a.status].join(',')).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a'); link.href = url; link.download = 'tedxigdtU-applications.csv'; link.click(); URL.revokeObjectURL(url)
  }

  return <main className="site-shell">
    <header className="topbar"><a className="brand" href="#top">TEDx<span>IGDTU</span></a><nav><a href="#about">About</a><a href="#theme">Theme</a><a href="#speakers">Speakers</a><a href="#timeline">Timeline</a><a href="#partners">Partners</a><a href="#team">Team</a><button className={view === 'apply' ? 'active' : ''} onClick={() => setView('apply')}>Join the team</button><button className={view === 'admin' ? 'active' : ''} onClick={() => setView('admin')}>Team login</button></nav></header>
    {view === 'apply' ? <>
      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">TEDxIGDTU / TENURE 2026</p><h1>Ideas worth<br /><em>spreading.</em></h1><p className="hero-text">The stage is waiting for the people who make things happen. Join the team behind the next idea worth spreading.</p><button className="red-button" onClick={() => document.getElementById('application')?.scrollIntoView({ behavior: 'smooth' })}>Start your application <ArrowRight size={16} /></button></div><div className="hero-note"><span>01</span><p>Not just a team.<br />A movement.</p></div></section>
      <section className="apply-section" id="application"><div className="section-heading"><div><p className="eyebrow">THE APPLICATION</p><h2>Claim your <em>place.</em></h2></div><p className="heading-note">Tell us a little about yourself.<br />We’re listening.</p></div><div className="application-grid"><form onSubmit={submit} className="application-form"><div className="form-row"><Field label="Full name *"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></Field><Field label="Email address *"><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></Field></div><div className="form-row"><Field label="Branch *"><select value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}><option value="">Select branch</option><option>CSE</option><option>ECE</option><option>IT</option><option>ME</option><option>Other</option></select></Field><Field label="Year *"><select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}><option value="">Select year</option><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select></Field></div><Field label="Choose your domain *"><div className="domain-grid">{domains.map(domain => <button type="button" key={domain} className={form.domain === domain ? 'domain selected' : 'domain'} onClick={() => setForm({ ...form, domain })}>{form.domain === domain && <Check size={14} />}{domain}</button>)}</div></Field><Field label="Portfolio / LinkedIn link" hint="Optional, but we’d love to see your work"><div className="input-with-icon"><ExternalLink size={15} /><input value={form.portfolio} onChange={e => setForm({ ...form, portfolio: e.target.value })} placeholder="https://..." /></div></Field><Field label="Why do you want to join TEDxIGDTU? *"><textarea value={form.why} onChange={e => setForm({ ...form, why: e.target.value })} placeholder="In a few honest words..." maxLength={300} /></Field><Field label="Relevant experience"><textarea value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="Clubs, projects, things you’ve built..." maxLength={300} /></Field>{error && <p className="form-error">{error}</p>}<button className="red-button submit-button" type="submit">Submit application <ArrowRight size={16} /></button><p className="privacy"><LockKeyhole size={13} /> Your details stay with the TEDxIGDTU team.</p></form><aside className="ticket-preview"><p className="eyebrow">LIVE PREVIEW</p><div className="ticket"><div className="ticket-top"><span>TEDx<span>IGDTU</span></span><span>2026</span></div><div className="ticket-main"><Ticket size={28} /><h3>{form.name || 'Your name here'}</h3><p>{form.domain || 'YOUR DOMAIN'}</p></div><div className="ticket-bottom"><span>{submitted?.id || 'TXG-2026-____'}</span><span>IDEAS WORTH SPREADING</span></div></div><p className="ticket-caption">This is your ticket stub. It becomes real when you submit.</p></aside></div></section>
      <section className="why-section" id="why"><p className="eyebrow">WHY TEDxIGDTU?</p><h2>Ideas don’t spread<br />themselves. <em>People do.</em></h2><div className="why-grid"><div id="about"><span>01</span><h3>Find your people</h3><p>Work with curious minds from every corner of campus.</p></div><div id="theme"><span>02</span><h3>Build something real</h3><p>From a blank page to a room full of listeners.</p></div><div id="speakers"><span>03</span><h3>Leave a mark</h3><p>Help create a stage that makes the world a little bigger.</p></div></div><div className="event-strip" id="timeline"><div><span>2026 EDITION</span><strong>Beyond barriers.</strong></div><div id="partners"><span>THE STAGE</span><strong>Delhi · IGDTU</strong></div><div id="team"><span>THE CREW</span><strong>Open for curious minds</strong></div></div></section><footer className="site-footer"><span>TEDx<span>IGDTU</span></span><small>This independent TEDx event is operated under license from TED.</small></footer>
    </> : <Admin applications={filtered} allApplications={applications} search={search} setSearch={setSearch} domainFilter={domainFilter} setDomainFilter={setDomainFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} setApplications={setApplications} setSelected={setSelected} exportCsv={exportCsv} />}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><article className="detail-modal" onClick={e => e.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button><p className="eyebrow">{selected.id}</p><h2>{selected.name}</h2><StatusPill status={selected.status} /><div className="detail-meta"><span>{selected.email}</span><span>{selected.branch} · {selected.year}</span><span>{selected.domain}</span></div><hr /><h4>Why join?</h4><p>{selected.why}</p><h4>Experience</h4><p>{selected.experience || 'No experience shared.'}</p>{selected.portfolio && <a href={selected.portfolio.startsWith('http') ? selected.portfolio : `https://${selected.portfolio}`} target="_blank" rel="noreferrer" className="text-link">Open portfolio <ExternalLink size={14} /></a>}</article></div>}
  </main>
}

function Admin({ applications, allApplications, search, setSearch, domainFilter, setDomainFilter, statusFilter, setStatusFilter, setApplications, setSelected, exportCsv }: any) {
  const topDomain = domains.map(domain => [domain, allApplications.filter((a: Application) => a.domain === domain).length] as const).sort((a, b) => b[1] - a[1])[0]
  return <section className="admin-section"><div className="admin-heading"><div><p className="eyebrow">TEAM MANIFEST / PRIVATE VIEW</p><h1>Application <em>control room.</em></h1></div><button className="outline-button" onClick={exportCsv}><Download size={15} /> Export CSV</button></div><div className="stat-grid"><div><span>Total applications</span><strong>{allApplications.length}</strong></div><div><span>Shortlisted</span><strong>{allApplications.filter((a: Application) => a.status === 'Shortlisted').length}</strong></div><div><span>Top domain</span><strong className="stat-domain">{topDomain?.[0]}</strong><small>{topDomain?.[1]} applications</small></div><div><span>Open roles</span><strong>7</strong></div></div><div className="manifest"><div className="manifest-toolbar"><div className="search-box"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email or ticket..." /></div><div className="filter"><Filter size={15} /><select value={domainFilter} onChange={e => setDomainFilter(e.target.value)}><option>All domains</option>{domains.map(d => <option key={d}>{d}</option>)}</select><ChevronDown size={14} /></div><div className="filter"><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>All statuses</option>{statuses.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={14} /></div></div><div className="table-wrap"><table><thead><tr><th>Ticket</th><th>Applicant</th><th>Academic</th><th>Domain</th><th>Status</th><th /></tr></thead><tbody>{applications.map((app: Application) => <tr key={app.id}><td className="ticket-id">{app.id}</td><td><strong>{app.name}</strong><small>{app.email}</small></td><td>{app.branch}<small>{app.year}</small></td><td>{app.domain}</td><td><select className={`status-select ${app.status.toLowerCase()}`} value={app.status} onChange={e => setApplications((current: Application[]) => current.map(item => item.id === app.id ? { ...item, status: e.target.value as Status } : item))}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td><td><button className="view-button" onClick={() => setSelected(app)}>View <ArrowRight size={14} /></button></td></tr>)}</tbody></table>{applications.length === 0 && <div className="empty-state"><FileText size={25} /><p>No applications match your filters.</p></div>}</div><p className="admin-foot"><LockKeyhole size={13} /> Demo gate only — production should use server-side authentication.</p></div></section>
}
