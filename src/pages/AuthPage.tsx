import React from 'react'; // 👈 1. 確保開頭有引入 React，這樣第 45 行的 React.CSSProperties 才不會報錯

export const AuthPage: React.FC = () => {
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const handleLogin = (provider: 'google' | 'facebook') => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>Welcome to HelperPlatform</h2>
        <p style={styles.subheader}>搵外傭 / 搵好工，一鍵快捷登入</p>

        {/* Google 登入按鈕 */}
        <button 
          onClick={() => handleLogin('google')} 
          style={{ ...styles.btn, backgroundColor: '#ffffff', color: '#757575', border: '1px solid #ddd' }}
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logomark.svg" 
            alt="Google" 
            style={{ width: '18px', marginRight: '10px' }} // 👈 2. 確保 marginRight 拼寫正確且外層有包好雙大括號
          />
          Continue with Google
        </button>

        {/* Facebook 登入按鈕 */}
        <button 
          onClick={() => handleLogin('facebook')} 
          style={{ ...styles.btn, backgroundColor: '#1877f2', color: '#ffffff', border: 'none' }}
        >
          Continue with Facebook
        </button>

        <p style={styles.footer}>登入即代表您同意我們的服務條款與隱私政策</p>
      </div>
    </div>
  );
};

// 💡 這裡因為有了 import React，型態定義就不會再報紅線了
const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'sans-serif' },
  card: { padding: '40px 30px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', width: '100%', maxWidth: '380px', textAlign: 'center' },
  header: { margin: '0 0 8px 0', color: '#222', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' },
  subheader: { margin: '0 0 32px 0', color: '#777', fontSize: '14px' },
  btn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '14px', transition: 'opacity 0.2s' },
  footer: { fontSize: '12px', color: '#aaa', marginTop: '20px' }
};
