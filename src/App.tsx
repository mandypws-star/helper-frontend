import { useState, useEffect } from 'react';
import { api } from './api'; // 如果 api.ts 還在 types 裡，請改為 './types/api'
import { UserRole } from './types/enums';
import { AuthPage } from './pages/AuthPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';

function App() {
  const [authState, setAuthState] = useState<null | 'PENDING_ROLE' | 'FILLING_PROFILE' | 'LOGGED_IN'>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. 僱主註冊表單狀態
  const [employerForm, setEmployerForm] = useState({
    contactName: '',
    district: '',
    familyMembersCount: 2,
    hasPets: false
  });

  // 2. 外傭註冊表單狀態 (完美 1:1 對齊你的後端 HelperDetailDTO)
  const [helperForm, setHelperForm] = useState({
    englishName: '',
    nationality: 'PHILIPPINES',
    age: 25,
    maritalStatus: 'SINGLE',
    religion: 'CATHOLIC',
    currentLocation: 'HONG_KONG',
    yearsOfExperience: 2,
    expectedSalary: 4990,
    aboutMe: ''
  });

  // 監聽網址，處理 OAuth2 登入成功後跳轉回來的 Token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, "/"); // 清除網址列上的 token 保持美觀
    }

    // 若本地有安全憑證，直接向後端大腦索取用戶狀態
    if (localStorage.getItem('token')) {
      setLoading(true);
      api.checkCurrentUser()
        .then((user) => {
          if (user.status === 'PENDING') {
            setAuthState('PENDING_ROLE'); // 進入選擇身份關卡
          } else {
            setRole(user.role);
            setAuthState('LOGGED_IN');    // 老用戶直達主頁
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setAuthState(null);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setAuthState('FILLING_PROFILE'); // 跳轉至對應資料填寫表單
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createEmployerProfile(employerForm);
      setAuthState('LOGGED_IN');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHelperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createHelperProfile(helperForm);
      setAuthState('LOGGED_IN');
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.centerText}>系統處理中，請稍候...</div>;
  if (authState === null) return <AuthPage />;
  if (authState === 'PENDING_ROLE') return <RoleSelectionPage onSelectRole={handleRoleSelect} />;

  // 用戶選好身份，引導填寫資料寫入對應資料表 (核心註冊 Insert 動作)
  if (authState === 'FILLING_PROFILE') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.header}>完善您的基本資料</h2>
          <p style={styles.subheader}>請填寫以下資訊以完成開通流程</p>

          {role === UserRole.EMPLOYER ? (
            /* 僱主 Profile 填寫表單 */
            <form onSubmit={handleEmployerSubmit} style={styles.form}>
              <label style={styles.label}>聯絡人姓名</label>
              <input type="text" required value={employerForm.contactName} onChange={e => setEmployerForm({...employerForm, contactName: e.target.value})} style={styles.input}/>
              
              <label style={styles.label}>居住地區</label>
              <input type="text" placeholder="例如：中環、將軍澳" value={employerForm.district} onChange={e => setEmployerForm({...employerForm, district: e.target.value})} style={styles.input}/>
              
              <label style={styles.label}>家庭成員人數</label>
              <input type="number" min="1" value={employerForm.familyMembersCount} onChange={e => setEmployerForm({...employerForm, familyMembersCount: parseInt(e.target.value)})} style={styles.input}/>
              
              <label style={styles.checkboxLabel}>
                <input type="checkbox" checked={employerForm.hasPets} onChange={e => setEmployerForm({...employerForm, hasPets: e.target.checked})}/>
                家中有飼養寵物
              </label>
              <button type="submit" style={styles.btn}>確認開通僱主帳戶</button>
            </form>
          ) : (
            /* 外傭 Profile 填寫表單 */
            <form onSubmit={handleHelperSubmit} style={styles.form}>
              <label style={styles.label}>英文姓名 (與護照相同)</label>
              <input type="text" required value={helperForm.englishName} onChange={e => setHelperForm({...helperForm, englishName: e.target.value})} style={styles.input}/>
              
              <div style={styles.row}>
                <div>
                  <label style={styles.label}>國籍</label>
                  <select value={helperForm.nationality} onChange={e => setHelperForm({...helperForm, nationality: e.target.value})} style={styles.input}>
                    <option value="PHILIPPINES">菲律賓 (Philippines)</option>
                    <option value="INDONESIA">印尼 (Indonesia)</option>
                    <option value="THAILAND">泰國 (Thailand)</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>年齡</label>
                  <input type="number" value={helperForm.age} onChange={e => setHelperForm({...helperForm, age: parseInt(e.target.value)})} style={styles.input}/>
                </div>
              </div>

              <div style={styles.row}>
                <div>
                  <label style={styles.label}>婚姻狀況</label>
                  <select value={helperForm.maritalStatus} onChange={e => setHelperForm({...helperForm, maritalStatus: e.target.value})} style={styles.input}>
                    <option value="SINGLE">未婚 (Single)</option>
                    <option value="MARRIED">已婚 (Married)</option>
                  </select>
                </div>
                <div>
                  <label style={styles.label}>工作經驗 (年)</label>
                  <input type="number" value={helperForm.yearsOfExperience} onChange={e => setHelperForm({...helperForm, yearsOfExperience: parseInt(e.target.value)})} style={styles.input}/>
                </div>
              </div>

              <label style={styles.label}>期望薪資 (HKD / 每月)</label>
              <input type="number" value={helperForm.expectedSalary} onChange={e => setHelperForm({...helperForm, expectedSalary: parseFloat(e.target.value)})} style={styles.input}/>

              <label style={styles.label}>自我介紹</label>
              <textarea rows={3} placeholder="介紹一下您的個性和擅長的工作..." value={helperForm.aboutMe} onChange={e => setHelperForm({...helperForm, aboutMe: e.target.value})} style={styles.textarea}/>
              
              <button type="submit" style={styles.btn}>確認建立外傭履歷</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // 4. 註冊/登入完成，成功進入平台核心
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🎉 歡迎進入外傭媒合平台</h1>
      <p>目前登入權限：<strong style={{ color: '#007bff' }}>{role}</strong></p>
      <hr />
      {role === UserRole.EMPLOYER ? (
        <div><h3>🏠 僱主專區</h3><p>開始滑動尋找心儀的外傭吧！</p></div>
      ) : (
        <div><h3>💼 外傭專區</h3><p>您的履歷已公開，正在等待僱主的配對邀請。</p></div>
      )}
      <button onClick={() => { localStorage.removeItem('token'); setAuthState(null); }} style={styles.logoutBtn}>安全登出</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  centerText: { textAlign: 'center', marginTop: '100px', fontSize: '18px', fontFamily: 'sans-serif', color: '#666' },
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: 'sans-serif', padding: '20px' },
  card: { padding: '32px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', width: '100%', maxWidth: '440px' },
  header: { textAlign: 'center', margin: '0 0 6px 0', color: '#222', fontSize: '24px', fontWeight: 'bold' },
  subheader: { textAlign: 'center', margin: '0 0 24px 0', color: '#777', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#444', marginBottom: '2px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', width: '100%', boxSizing: 'border-box' },
  textarea: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', width: '100%', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer', margin: '4px 0' },
  btn: { padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', transition: 'background-color 0.2s' },
  logoutBtn: { marginTop: '30px', padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }
};

export default App;