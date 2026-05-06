import './Login.css'

interface LoginProps {
  onLogin?: (id: string, password: string) => void
  onSignup?: () => void
}

function Login({ onLogin, onSignup }: LoginProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const id = (form.elements.namedItem('id') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value
    onLogin?.(id, password)
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        {/* 로고 영역 */}
        <div className="login-top-section">
          <div className="login-logo">
            <span className="login-logo-text">LOGO</span>
          </div>
        </div>

        {/* 아이디 입력 */}
        <input
          className="login-input"
          type="text"
          name="id"
          placeholder="아이디"
          autoComplete="username"
        />

        {/* 비밀번호 입력 */}
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="비밀번호"
          autoComplete="current-password"
        />

        {/* 버튼 영역 */}
        <div className="login-button-row">
          <button className="login-btn login-btn--primary" type="submit">
            로그인
          </button>
          <button
            className="login-btn login-btn--secondary"
            type="button"
            onClick={onSignup}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
