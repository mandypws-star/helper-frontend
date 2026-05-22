const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// 自動從本地儲存取得 OAuth 成功後的 Token 帶入 Header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const api = {
  // 1. 檢查當前登入用戶的狀態與角色
  checkCurrentUser: async () => {
    const res = await fetch(`${BACKEND_URL}/api/users/me`, {
      headers: { ...getAuthHeader() }
    });
    if (!res.ok) throw new Error('未登入或 Token 失效');
    return res.json(); // 預期後端回傳：{ id, email, role, status }
  },

  // 2. 建立僱主基本檔案 (對應後端 createEmployerProfile)
  createEmployerProfile: async (data: {
    contactName: string;
    district: string;
    familyMembersCount: number;
    hasPets: boolean;
  }) => {
    const res = await fetch(`${BACKEND_URL}/api/profiles/employer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader() // Java 後端會透過這個 Token 解析出 Principal
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('建立僱主檔案失敗');
    return res.json();
  },

  // 3. 建立外傭詳細檔案 (對應後端 createHelperProfile)
  createHelperProfile: async (data: {
    englishName: string;
    nationality: string;
    age: number;
    maritalStatus: string;
    religion: string;
    currentLocation: string;
    yearsOfExperience: number;
    expectedSalary: number;
    aboutMe: string;
  }) => {
    const res = await fetch(`${BACKEND_URL}/api/profiles/helper`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('建立外傭檔案失敗');
    return res.json();
  }
};
