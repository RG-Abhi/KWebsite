import { useState, useRef, useEffect } from 'react'

const FAQ_RULES = [
  {
    keywords: ['admission', 'apply', 'join', 'enroll', 'b.tech', 'btech', 'how to get'],
    answer:
      'You can apply for B.Tech admissions through TS EAMCET / ECET scores. Visit our <a href="/admissions/admission-procedure" style="color:var(--vibrant-accent);font-weight:700">Admissions page</a> for detailed procedure, rank cut-offs, and important dates.',
  },
  {
    keywords: ['fee', 'fees', 'tuition', 'cost', 'payment', 'scholarship'],
    answer:
      'Fee structure varies by branch. Scholarships are available for merit & EBC students. Check our <a href="/admissions/fees" style="color:var(--vibrant-accent);font-weight:700">Fees page</a> and <a href="/admissions/scholarships" style="color:var(--vibrant-accent);font-weight:700">Scholarships page</a> for details.',
  },
  {
    keywords: ['placement', 'recruit', 'job', 'package', 'ctc', 'lpa', 'company', 'companies'],
    answer:
      'KMIT has an outstanding placement record with 100%+ offers in top batches. Top recruiters include Google, Microsoft, Amazon, Deloitte & more. Highest package: <strong>45 LPA</strong>. See the full <a href="/placements" style="color:var(--vibrant-accent);font-weight:700">Placements page</a>.',
  },
  {
    keywords: ['syllabus', 'curriculum', 'subjects', 'course', 'download'],
    answer:
      'Download the latest syllabus from our <a href="/academics/syllabus" style="color:var(--vibrant-accent);font-weight:700">Academics → Syllabus page</a>. Syllabi are provided per branch & regulation.',
  },
  {
    keywords: ['hostel', 'accommodation', 'stay', 'room', 'pg'],
    answer:
      'KMIT provides guidance for nearby PG accommodations. For official hostel details, please contact the college office at <strong>+91-40-23301445</strong>.',
  },
  {
    keywords: ['library', 'books', 'e-library', 'digital library', 'resources'],
    answer:
      'KMIT has a well-stocked library with 50,000+ books, IEEE/ACM journals, and a 24×7 digital library portal. Learn more on our <a href="/campus/library" style="color:var(--vibrant-accent);font-weight:700">Library page</a>.',
  },
  {
    keywords: ['contact', 'phone', 'email', 'address', 'location', 'reach', 'map'],
    answer:
      'KMIT is located in Narayanguda, Hyderabad. Phone: <strong>+91-40-23301445</strong>. Email: <strong>principal@kmit.in</strong>. Visit the <a href="/contact" style="color:var(--vibrant-accent);font-weight:700">Contact page</a> for a full map and directions.',
  },
  {
    keywords: ['rank', 'nirf', 'naac', 'accreditation', 'ranking', 'nba'],
    answer:
      'KMIT is NAAC A+ accredited and NBA-accredited for multiple programs. View full rankings & accreditations on our <a href="/about/accreditations" style="color:var(--vibrant-accent);font-weight:700">Accreditations page</a>.',
  },
  {
    keywords: ['research', 'publication', 'patent', 'project', 'innovation'],
    answer:
      'KMIT has 500+ research publications and 40+ patents. Explore research initiatives, CoEs, and funded projects at <a href="/research" style="color:var(--vibrant-accent);font-weight:700">Research page</a>.',
  },
  {
    keywords: ['club', 'sports', 'nss', 'cultural', 'co-curricular', 'activities', 'event'],
    answer:
      'KMIT offers 30+ student clubs, NSS, cultural fests, sports facilities and more. Explore <a href="/student-life/clubs" style="color:var(--vibrant-accent);font-weight:700">Clubs</a> and <a href="/student-life/co-curricular" style="color:var(--vibrant-accent);font-weight:700">Co-curriculars</a>.',
  },
  {
    keywords: ['eamcet', 'ecet', 'cutoff', 'cut-off', 'last rank', 'qualifying'],
    answer:
      'EAMCET & ECET rank cut-offs are updated after each academic year. Check <a href="/admissions/eapcet-ranks" style="color:var(--vibrant-accent);font-weight:700">EAPCET Ranks</a> and <a href="/admissions/ecet-ranks" style="color:var(--vibrant-accent);font-weight:700">ECET Ranks</a> pages.',
  },
  {
    keywords: ['cse', 'it', 'csm', 'csd', 'department', 'branch', 'computer science'],
    answer:
      'KMIT offers B.Tech in CSE, IT, CSM (AI & ML), and CSD (Data Science). Each department has dedicated labs, faculty, and placement drives. Explore <a href="/academics" style="color:var(--vibrant-accent);font-weight:700">Academics</a> for details.',
  },
  {
    keywords: ['principal', 'director', 'hod', 'faculty', 'professor', 'staff'],
    answer:
      'Meet our leadership and faculty on the <a href="/administration/principal" style="color:var(--vibrant-accent);font-weight:700">Principal</a> and <a href="/administration/hod" style="color:var(--vibrant-accent);font-weight:700">HoD pages</a>.',
  },
  {
    keywords: ['wifi', 'internet', 'infrastructure', 'lab', 'computer lab', 'facility'],
    answer:
      'KMIT has 1 Gbps campus-wide Wi-Fi, state-of-the-art computer labs, smart classrooms, and an auditorium. Visit the <a href="/campus/classrooms" style="color:var(--vibrant-accent);font-weight:700">Infrastructure pages</a> to learn more.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greet'],
    answer:
      'Hello! 👋 I\'m KMIT\'s AI Assistant. Ask me about admissions, placements, syllabus, fees, departments, or anything about KMIT!',
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye', 'great', 'awesome'],
    answer: 'You\'re welcome! 😊 Feel free to ask me anything else about KMIT. Have a great day!',
  },
]

const CHIP_QUESTIONS = [
  'B.Tech Admissions',
  'Placement Records',
  'Download Syllabus',
  'Fee Structure',
  'Contact KMIT',
]

function getBotReply(input) {
  const lower = input.toLowerCase()
  for (const rule of FAQ_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.answer
    }
  }
  return "I'm not sure about that, but I can help with admissions, fees, placements, syllabus, departments, and more. Try one of the quick buttons below, or <a href='/contact' style='color:var(--vibrant-accent);font-weight:700'>contact us</a> for personalised support."
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', html: "Hello! I'm KMIT's AI Assistant. I can help you find info about admissions, placements, syllabus, fees, and more. How can I help you today?" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed) return
    setInput('')
    setMessages((prev) => [...prev, { from: 'user', html: trimmed }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: 'bot', html: getBotReply(trimmed) }])
    }, 800 + Math.random() * 400)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'}`}></i>
      </button>

      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        <div className="chatbot-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="chatbot-avatar">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#fff' }}>KMIT AI Assistant</h4>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                <span className="chatbot-online-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        <div className="chatbot-body" ref={bodyRef}>
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.from}`}>
              <span dangerouslySetInnerHTML={{ __html: msg.html }} />
            </div>
          ))}

          {typing && (
            <div className="chat-message bot chat-typing">
              <span></span><span></span><span></span>
            </div>
          )}

          {messages.length <= 2 && !typing && (
            <div className="chat-chips">
              {CHIP_QUESTIONS.map((q) => (
                <button key={q} onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}
        </div>

        <div className="chatbot-footer">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={() => sendMessage()} aria-label="Send">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <style>{`
        .chatbot-fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--vibrant-accent, #fc7700);
          color: white;
          border: none;
          box-shadow: 0 4px 20px rgba(252, 119, 0, 0.4);
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chatbot-fab:hover {
          transform: scale(1.1) translateY(-5px);
        }
        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 30px;
          width: 360px;
          height: 520px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 48px rgba(0,0,0,0.18);
          display: flex;
          flex-direction: column;
          z-index: 9998;
          transform: translateY(20px) scale(0.9);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .chatbot-window.active {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        .chatbot-header {
          background: var(--navy, #0f172a);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chatbot-online-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 4px;
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        .chatbot-avatar {
          width: 35px;
          height: 35px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: var(--lime, #84cc16);
          font-size: 1.1rem;
        }
        .chatbot-close {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 1.2rem;
          transition: color 0.2s;
        }
        .chatbot-close:hover { color: white; }
        .chatbot-body {
          flex: 1;
          padding: 1.25rem;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scroll-behavior: smooth;
        }
        .chat-message {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 14px;
          font-size: 0.88rem;
          line-height: 1.55;
          animation: msgIn 0.25s ease;
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chat-message.bot {
          background: white;
          color: #334155;
          border: 1px solid #e2e8f0;
          border-bottom-left-radius: 2px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.03);
          align-self: flex-start;
        }
        .chat-message.user {
          background: var(--vibrant-accent, #fc7700);
          color: white;
          border-bottom-right-radius: 2px;
          align-self: flex-end;
        }
        .chat-typing span {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #94a3b8;
          margin: 0 2px;
          animation: typingBounce 1.2s ease-in-out infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.15s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingBounce {
          0%,100% { transform: translateY(0); }
          40%     { transform: translateY(-6px); }
        }
        .chat-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 4px;
        }
        .chat-chips button {
          background: transparent;
          border: 1.5px solid var(--vibrant-accent, #fc7700);
          color: var(--vibrant-accent, #fc7700);
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .chat-chips button:hover {
          background: var(--vibrant-accent, #fc7700);
          color: white;
        }
        .chatbot-footer {
          padding: 0.85rem 1rem;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 10px;
          background: white;
        }
        .chatbot-footer input {
          flex: 1;
          border: 1.5px solid #cbd5e1;
          border-radius: 20px;
          padding: 0.5rem 1rem;
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .chatbot-footer input:focus {
          border-color: var(--vibrant-accent, #fc7700);
        }
        .chatbot-footer button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--vibrant-accent, #fc7700);
          color: white;
          border: none;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: transform 0.2s, opacity 0.2s;
          font-size: 0.9rem;
        }
        .chatbot-footer button:hover { transform: scale(1.08); }
        @media (max-width: 1024px) {
          .chatbot-fab { bottom: 80px; right: 20px; }
          .chatbot-window { bottom: 155px; right: 20px; width: calc(100% - 40px); max-width: 360px; }
        }
        @media (max-width: 480px) {
          .chatbot-window { width: calc(100% - 40px); height: 420px; }
        }
      `}</style>
    </>
  )
}
