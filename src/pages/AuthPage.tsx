import React from 'react';

export const AuthPage: React.FC = () => {
  
  const handleGoogleLogin = () => {
    // 實際開發時，這裡會導向後端 Spring Boot 的 OAuth 端點
    // 例如：window.location.href = `${process.env.VITE_BACKEND_URL}/oauth2/authorization/google`;
    console.log('Redirecting to Google OAuth...');
  };

  const handleFacebookLogin = () => {
    // window.location.href = `${process.env.VITE_BACKEND_URL}/oauth2/authorization/facebook`;
    console.log('Redirecting to Facebook OAuth...');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to HelperPlatform</h2>
        <p style={styles.subtitle}>搵外傭 / 搵好工，一鍵快捷登入</p>
        
        <div style={styles.buttonContainer}>
          {/* Google 登入按鈕 */}
          <button onClick={handleGoogleLogin} style={{ ...styles.btn, ...styles.btnGoogle }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
              alt="Google" 
              style={styles.icon} 
            />
            Continue with Google
          </button>

          {/* Facebook 登入按鈕 */}
          <button onClick={handleFacebookLogin} style={{ ...styles.btn, ...styles.btnFacebook }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" 
              alt="Facebook" 
              style={styles.icon} 
            />
            Continue with Facebook
          </button>
        </div>

        <p style={styles.footerText}>
          登入即代表您同意我們的服務條款與隱私權政策。
        </p>
      </div>
    </div>
  );
};

// 簡單優雅的 Inline Styles，你之後可以換成 Tailwind 或 CSS Modules
const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f7fb', fontFamily: 'sans-serif' },
  card: { padding: '40px', borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '100%', maxWidth: '400px', textAlign: 'center' },
  title: { margin: '0 0 8px 0', fontSize: '24px', color: '#1a1a1a', fontWeight: 'bold' },
  subtitle: { margin: '0 0 32px 0', fontSize: '14px', color: '#666' },
  buttonContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  btn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' },
  btnGoogle: { backgroundColor: '#ffffff', color: '#3c4043' },
  btnFacebook: { backgroundColor: '#1877F2', color: '#ffffff', border: 'none' },
  icon: { width: '20px', height: '20px' },
  footerText: { marginTop: '32px', fontSize: '12px', color: '#999', lineHeight: '1.5' }
};
