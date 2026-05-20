import { useEffect, useState } from 'react'

// 定義外傭資料的型態 (TypeScript 強型別)
interface Helper {
  name: string;
  phone: string;
}

function App() {
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 本地 Java Spring Boot 的網址
const BACKEND_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api/helpers` 
  : "http://localhost:8080/api/helpers";
  
  useEffect(() => {
    // 向後端大腦索取外傭資料
    fetch(BACKEND_URL)
      .then((res) => {
        if (!res.ok) throw new Error("後端回應失敗");
        return res.json();
      })
      .then((data: Helper[]) => {
        setHelpers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("抓取失敗:", err);
        setError("無法連線到 Java 後端，請確認後端 Boot 是否有保持執行 (port 8080)");
        setLoading(false);
      });
  }, []);

  // 點擊直接喚醒 WhatsApp / 瀏覽器新分頁
  const handleConnectWhatsApp = (phone: string) => {
    // 建立 WhatsApp Deep Link 網址
    const whatsappUrl = `https://wa.me/${phone}?text=Hello, I saw your profile on the helper platform.`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        🏠 外傭中介平台 (本地串接測試)
      </h1>
      
      {loading && <p style={{ color: '#666' }}>正在從 Java 後端下載外傭清單...</p>}
      
      {error && (
        <div style={{ backgroundColor: '#fff0f0', color: '#cc0000', padding: '15px', borderRadius: '5px', marginBottom: '20px', border: '1px solid #ffcccc' }}>
          ❌ {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {helpers.map((helper, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fafafa', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#222' }}>👩‍🌾 外傭姓名: {helper.name}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#666' }}>📞 聯絡電話: {helper.phone}</p>
              
              <button
                onClick={() => handleConnectWhatsApp(helper.phone)}
                style={{
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '5px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                💬 透過 WhatsApp 聯絡外傭
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App