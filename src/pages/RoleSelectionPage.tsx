import React from 'react';
import { UserRole } from '../types/enums'; // 引入我們剛才寫好的強型別

interface RoleSelectionPageProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelectRole }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>請選擇您的身份</h2>
        <p style={styles.subtitle}>這將決定您後續看到的平台介面與功能</p>

        <div style={styles.grid}>
          {/* 僱主選項 */}
          <div style={styles.optionCard} onClick={() => onSelectRole(UserRole.EMPLOYER)}>
            <div style={{ ...styles.avatarCircle, backgroundColor: '#e3f2fd' }}>🏠</div>
            <h3 style={styles.optionTitle}>我是僱主</h3>
            <p style={styles.optionDesc}>我想尋找合適、細心、有經驗的外籍家庭傭工。</p>
          </div>

          {/* 外傭選項 */}
          <div style={styles.optionCard} onClick={() => onSelectRole(UserRole.HELPER)}>
            <div style={{ ...styles.avatarCircle, backgroundColor: '#e8f5e9' }}>💼</div>
            <h3 style={styles.optionTitle}>我是外傭 / Helper</h3>
            <p style={styles.optionDesc}>我想尋找優質的香港家庭，提供我的家政與護理專業。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f7fb', padding: '20px', fontFamily: 'sans-serif' },
  card: { width: '100%', maxWidth: '700px', textAlign: 'center' },
  title: { fontSize: '28px', color: '#1a1a1a', marginBottom: '8px', fontWeight: 'bold' },
  subtitle: { fontSize: '15px', color: '#666', marginBottom: '40px' },
  grid: { display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' },
  optionCard: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', width: '280px', boxShadow: '0 4px 16px rgba(0,0,0,0.05)', cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.2s ease', textAlign: 'center' },
  avatarCircle: { width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px auto' },
  optionTitle: { fontSize: '18px', color: '#222', margin: '0 0 12px 0', fontWeight: 'bold' },
  optionDesc: { fontSize: '13px', color: '#777', margin: '0', lineHeight: '1.6' }
};


