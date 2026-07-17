import React, { useState, useMemo } from 'react'
import PageShell from './PageShell'
import ResearchPublicationsSection from './ResearchPublicationsSection'
import './ResearchPublicationsListPage.css'
import ScrollReveal from '../ScrollReveal'

const publications = [
  // 2024
  { year: 2024, dept: 'CSE', type: 'Journal', authors: 'Dr. Ajeet K. Jain', title: 'Cognitive Horses of Deep Learning: Regularization and Optimization Practices', venue: 'BS Publications', isbn: '9789395038744' },
  { year: 2024, dept: 'CSE', type: 'Journal', authors: 'Dr. B. Kiranmai, Dr. Jyoshna Bejjam', title: 'Network Security', venue: 'BH International Publications', isbn: '978-81-949705-8-3' },
  { year: 2024, dept: 'CSM', type: 'Conference', authors: 'Ms. Afreen Fathima Mohammed', title: 'Introduction to Computer Science using Python: A Problem Solving Focus', venue: 'Alpha International Publications / SPRINGER', isbn: '978-93-95405-80-5' },
  { year: 2024, dept: 'CSE', type: 'Journal', authors: 'Dr. Padmalaya Nayak, et al.', title: 'Unique Key Generation Approach Using Fuzzy Membership Based Chaotic Maps and Red Panda Optimization for Secure Medical Image Transmission', venue: 'Springer Conference', isbn: '' },
  // 2023
  { year: 2023, dept: 'CSE', type: 'Journal', authors: 'KMIT Faculty', title: 'A Seminar on Mastering the Art of Research Paper Publications: Strategies for Success', venue: 'CSE Department', isbn: '' },
  { year: 2023, dept: 'IT', type: 'Journal', authors: 'KMIT IT Faculty', title: 'Machine Learning and Deep Learning Approaches for Medical Image Classification', venue: 'International Journal of Advanced Computer Science and Applications (IJACSA)', isbn: '' },
  { year: 2023, dept: 'IT', type: 'Conference', authors: 'Dr. B. Kiranmai et al.', title: 'Distributed Intrusion Detection System Using Ensemble Classifier Approach', venue: 'Anveshana India AIJREAS Vol.5 Issue-12', isbn: '' },
  { year: 2023, dept: 'CSE', type: 'Journal', authors: 'Dr. R. Devika Rubi et al.', title: 'Federated Learning for Privacy-Preserving IoT Data Analytics', venue: 'IEEE Internet of Things Journal', isbn: '' },
  // 2022
  { year: 2022, dept: 'CSE', type: 'Journal', authors: 'Dr. S. Rajasekaran et al.', title: 'Hybrid Deep Learning Model for Real-Time Face Recognition in Surveillance Systems', venue: 'Springer Neural Computing and Applications', isbn: '' },
  { year: 2022, dept: 'IT', type: 'Conference', authors: 'Mr. B. Niranjan Kumar et al.', title: 'Blockchain-Based Secure Voting System for Academic Institutions', venue: 'IEEE International Conference on Electronics, Computing and Communication Technologies', isbn: '' },
  { year: 2022, dept: 'H&S', type: 'Journal', authors: 'Ms. Haleema Bushra et al.', title: 'Natural Language Inference with Siamese Networks for Textual Entailment', venue: 'Elsevier Neurocomputing', isbn: '' },
  // 2021
  { year: 2021, dept: 'CSE', type: 'Journal', authors: 'Dr. Vinay Patankar et al.', title: 'Automated Malware Detection Using Static and Dynamic Analysis Fusion', venue: 'Computers & Security, Elsevier', isbn: '' },
  { year: 2021, dept: 'CSM', type: 'Conference', authors: 'KMIT CSM Faculty', title: 'Transfer Learning for Plant Disease Detection in Low-Resource Agricultural Settings', venue: 'International Conference on Advances in Computing, Communications and Informatics (ICACCI)', isbn: '' },
  { year: 2021, dept: 'IT', type: 'Journal', authors: 'Ms. Prabhavati Devi et al.', title: 'Generative Adversarial Networks for Super-Resolution Medical Imaging', venue: 'Pattern Recognition Letters, Elsevier', isbn: '' },
  // 2020
  { year: 2020, dept: 'CSE', type: 'Journal', authors: 'Dr. R. Devika Rubi, Dr. S. Rajasekaran', title: 'Explainable AI for Intrusion Detection: Transparent Machine Learning Approaches', venue: 'Journal of Information Security and Applications, Elsevier', isbn: '' },
  { year: 2020, dept: 'H&S', type: 'Conference', authors: 'Mr. B. Niranjan Kumar', title: 'Computational Methods in Structural Bioinformatics: Applications and Challenges', venue: 'BIOINFORMATICS 2020 — Springer', isbn: '' },
]

const allYears = ['All', ...Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a)]
const allDepts = ['All', ...Array.from(new Set(publications.map(p => p.dept))).sort()]
const allTypes = ['All', 'Journal', 'Conference']

const typeColor = { Journal: 'journal', Conference: 'conference' }

export default function ResearchPublicationsListPage() {
  const [yearFilter, setYearFilter] = useState('All')
  const [deptFilter, setDeptFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return publications.filter(p => {
      if (yearFilter !== 'All' && p.year !== yearFilter) return false
      if (deptFilter !== 'All' && p.dept !== deptFilter) return false
      if (typeFilter !== 'All' && p.type !== typeFilter) return false
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.authors.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [yearFilter, deptFilter, typeFilter, search])

  return (
    <PageShell
      eyebrow="Research"
      title="List of"
      titleEm="Publications"
      description="A comprehensive registry of research papers, journal articles, and conference proceedings authored by KMIT faculty and students."
      breadcrumbs={[
        { label: 'Research', to: '/research' },
        { label: 'List of Publications' }
      ]}
    >
      {/* Stats */}
      <section className="page-section">
        <div className="container">
          <ScrollReveal animation="fade-up">
          <div className="stats-strip">
            <div className="stat-block">
              <span className="stat-value">{publications.length}<span className="accent">+</span></span>
              <span className="stat-label">Research Papers</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">5+</span></span>
              <span className="stat-label">Years Active</span>
            </div>
            <div className="stat-block">
              <span className="stat-value">4</span>
              <span className="stat-label">Departments</span>
            </div>
            <div className="stat-block">
              <span className="stat-value"><span className="accent">SCI</span></span>
              <span className="stat-label">Indexed Publications</span>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters + Table */}
      <section className="page-section-alt">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow"><i className="fa-solid fa-newspaper"></i> Registry</div>
            <h2>Publications <em>Database</em></h2>
            <div className="section-divider"></div>
          </div>

          {/* Filter Controls */}
          <ScrollReveal animation="fade-up">
          <div className="pub-list-filters">
            <div className="pub-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="pub-filter-group">
              <label>Year</label>
              <div className="pub-filter-pills">
                {allYears.map(y => (
                  <button key={y} className={`pub-pill ${yearFilter === y ? 'active' : ''}`} onClick={() => setYearFilter(y)}>{y}</button>
                ))}
              </div>
            </div>

            <div className="pub-filter-group">
              <label>Department</label>
              <div className="pub-filter-pills">
                {allDepts.map(d => (
                  <button key={d} className={`pub-pill ${deptFilter === d ? 'active' : ''}`} onClick={() => setDeptFilter(d)}>{d}</button>
                ))}
              </div>
            </div>

            <div className="pub-filter-group">
              <label>Type</label>
              <div className="pub-filter-pills">
                {allTypes.map(t => (
                  <button key={t} className={`pub-pill ${typeFilter === t ? 'active' : ''}`} onClick={() => setTypeFilter(t)}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          </ScrollReveal>

          <div className="pub-result-count">
            Showing <strong>{filtered.length}</strong> publication{filtered.length !== 1 ? 's' : ''}
          </div>

          {/* Publications List */}
          <div className="pub-list-cards">
            {filtered.map((p, idx) => (
              <div key={idx} className="pub-list-card">
                <div className="plc-meta-row">
                  <span className={`plc-type-badge ${typeColor[p.type]}`}>{p.type}</span>
                  <span className="plc-year">{p.year}</span>
                  <span className="plc-dept">{p.dept}</span>
                </div>
                <h4>{p.title}</h4>
                <p className="plc-authors"><i className="fa-solid fa-user-pen"></i> {p.authors}</p>
                <p className="plc-venue"><i className="fa-solid fa-book"></i> {p.venue}</p>
                {p.isbn && <p className="plc-isbn"><i className="fa-solid fa-barcode"></i> ISBN/DOI: {p.isbn}</p>}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="pub-empty">
                <i className="fa-solid fa-file-circle-question"></i>
                <p>No publications match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ResearchPublicationsSection />
    </PageShell>
  )
}
