import { useNavigate } from 'react-router-dom'

const QUICK_LINKS = [
  { label: '🏠 Home', path: '/' },
  { label: '🎓 Admissions', path: '/admissions/coursesoffered' },
  { label: '💼 Placements', path: '/placements' },
  { label: '📚 Academics', path: '/academics' },
  { label: '📞 Contact', path: '/contact' },
]

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="nfp-wrap">
      <div className="nfp-card">
        <div className="nfp-code">404</div>
        <div className="nfp-icon">🔭</div>
        <h1 className="nfp-title">Page Not Found</h1>
        <p className="nfp-desc">
          Oops! The page you're looking for seems to have taken a detour. It may have been moved,
          deleted, or perhaps never existed.
        </p>

        <div className="nfp-links">
          {QUICK_LINKS.map(({ label, path }) => (
            <button key={path} className="nfp-link-btn" onClick={() => navigate(path)}>
              {label}
            </button>
          ))}
        </div>

        <button className="nfp-back-btn" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>

      <style>{`
        .nfp-wrap {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 1rem;
          background: linear-gradient(135deg, #f0f4ff 0%, #fff7f0 100%);
        }
        .nfp-card {
          background: white;
          border-radius: 24px;
          padding: 3.5rem 3rem;
          max-width: 560px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
          animation: nfpSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes nfpSlideIn {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .nfp-code {
          font-size: clamp(5rem, 15vw, 9rem);
          font-weight: 900;
          background: linear-gradient(135deg, var(--vibrant-accent,#fc7700), #ff4d4d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          letter-spacing: -4px;
          margin-bottom: 0.5rem;
        }
        .nfp-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-10px); }
        }
        .nfp-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--navy,#0f172a);
          margin: 0 0 1rem;
        }
        .nfp-desc {
          color: #64748b;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .nfp-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .nfp-link-btn {
          background: #f1f5f9;
          border: none;
          border-radius: 30px;
          padding: 0.5rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--navy,#0f172a);
          cursor: pointer;
          transition: all 0.2s;
        }
        .nfp-link-btn:hover {
          background: var(--vibrant-accent,#fc7700);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(252,119,0,0.25);
        }
        .nfp-back-btn {
          background: var(--navy,#0f172a);
          color: white;
          border: none;
          border-radius: 30px;
          padding: 0.65rem 1.8rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nfp-back-btn:hover {
          background: var(--vibrant-accent,#fc7700);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(252,119,0,0.3);
        }
      `}</style>
    </div>
  )
}
