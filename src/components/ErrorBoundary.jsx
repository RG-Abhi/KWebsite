import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="eb-wrap">
          <div className="eb-card">
            <div className="eb-icon">⚠️</div>
            <h1 className="eb-title">Something Went Wrong</h1>
            <p className="eb-desc">
              An unexpected error occurred. Our team has been notified. Please try refreshing the
              page or return to the home page.
            </p>
            {this.state.error && (
              <pre className="eb-detail">{this.state.error.message}</pre>
            )}
            <button className="eb-btn" onClick={this.handleReset}>
              ← Return to Home
            </button>
          </div>

          <style>{`
            .eb-wrap {
              min-height: 80vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 3rem 1rem;
              background: linear-gradient(135deg, #fff0f0, #fff7f0);
            }
            .eb-card {
              background: white;
              border-radius: 20px;
              padding: 3rem 2.5rem;
              max-width: 500px;
              width: 100%;
              text-align: center;
              box-shadow: 0 20px 60px rgba(0,0,0,0.08);
              border-top: 4px solid #ef4444;
            }
            .eb-icon { font-size: 3.5rem; margin-bottom: 1rem; }
            .eb-title {
              font-size: 1.6rem;
              font-weight: 800;
              color: #0f172a;
              margin: 0 0 0.75rem;
            }
            .eb-desc {
              color: #64748b;
              font-size: 0.92rem;
              line-height: 1.7;
              margin-bottom: 1.5rem;
            }
            .eb-detail {
              background: #fef2f2;
              border: 1px solid #fecaca;
              border-radius: 8px;
              padding: 0.75rem 1rem;
              font-size: 0.78rem;
              color: #b91c1c;
              text-align: left;
              overflow-x: auto;
              margin-bottom: 1.5rem;
              white-space: pre-wrap;
            }
            .eb-btn {
              background: #0f172a;
              color: white;
              border: none;
              border-radius: 30px;
              padding: 0.65rem 1.8rem;
              font-size: 0.9rem;
              font-weight: 700;
              cursor: pointer;
              transition: all 0.2s;
            }
            .eb-btn:hover {
              background: var(--vibrant-accent, #fc7700);
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(252,119,0,0.3);
            }
          `}</style>
        </div>
      )
    }

    return this.props.children
  }
}
