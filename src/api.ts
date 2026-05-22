const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// 1. 修改此處：明確定義回傳型態為鍵值皆為字串的物件，避免 TS 判定為 undefined 或未知型態
const getRequestHeaders = (extraHeaders: Record<string, string> = {}): Record<string, string> => {
  const headers: Record<string, string> = { ...extraHeaders };
  const token = localStorage.getItem('token');
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const api = {
  // 1. 檢查當前登入用戶狀態
  checkCurrentUser: async () => {
    const res = await fetch(`${BACKEND_URL}/api/users/me`, {
      headers: getRequestHeaders() // 👈 直接帶入標準物件
    });
    if (!res.ok) throw new Error('未登入或 Token 失效');
    return res.json();
  },

  // 2. 建立僱主基本檔案
  createEmployerProfile: async (data: {
    contactName: string;
    district: string;
    familyMembersCount: number;
    hasPets: boolean;
  }) => {
    const res = await fetch(`${BACKEND_URL}/api/profiles/employer`, {
      method: 'POST',
      headers: getRequestHeaders({ 'Content-Type': 'application/json' }), // 👈 合併 Content-Type
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('建立僱主檔案失敗');
    return res.json();
  },

  // 3. 建立外傭詳細檔案
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
      headers: getRequestHeaders({ 'Content-Type': 'application/json' }), // 👈 合併 Content-Type
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('建立外傭檔案失敗');
    return res.json();
  }
};
