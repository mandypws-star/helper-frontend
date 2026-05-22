import { UserRole, AccountStatus, NationalityType, CurrentLocationType, MatchStatus } from './enums';

// 基礎時間戳接口
interface Timestamped {
  createdAt?: string | Date; // 建議前端統一用 string (ISO 8601) 或 Date 物件
  updatedAt?: string | Date;
}

// 1. 用戶基礎表
export interface User extends Timestamped {
  id: number; // BIGINT 在 JS/TS 中通常轉為 number，超大數值則需用 string
  email: string;
  phoneNumber?: string | null;
  role: UserRole;
  status: AccountStatus;
}

// 2. 僱主個人檔案
export interface Employer extends Timestamped {
  id: number;
  userId: number;
  contactName: string;
  district?: string | null;
  housingSizeSqft?: number | null;
  familyMembersCount: number;
  hasPets: boolean;
  // 關聯擴充 (選填，方便 API 撈取一併返回)
  user?: User;
}

// 3. 技能表
export interface Skill {
  id: number;
  skillNameZh: string; // 繁體中文技能名 (e.g., 煮中菜)
  skillNameEn: string; // 英文技能名 (e.g., Cooking Chinese Food)
  category?: string | null; // e.g., "COOKING", "CARE"
}

// 4. 外傭個人檔案
export interface Helper extends Timestamped {
  id: number;
  userId: number;
  englishName: string;
  nationality: NationalityType;
  age: number;
  maritalStatus?: string | null;
  religion?: string | null;
  currentLocation: CurrentLocationType;
  yearsOfExperience: number;
  expectedSalary: number; // TS 中 decimal 用 number 表示
  videoUrl?: string | null; // 平台核心：雲端面試影片
  photoUrl?: string | null;
  aboutMe?: string | null;
  isAvailable: boolean;
  // 關聯擴充
  user?: User;
  skills?: Skill[]; // 對應 helper_skills 多對多關係，直接拉出技能陣列
}

// 5. 外傭與技能的中間表 (若前端需要單獨處理這張表時使用)
export interface HelperSkill {
  helperId: number;
  skillId: number;
}

// 6. 配對與跟單表 (平台的核心業務流轉)
export interface Match extends Timestamped {
  id: number;
  employerId: number;
  helperId: number;
  status: MatchStatus;
  interviewDate?: string | Date | null;
  agencyFeePaid: boolean; // 是否已付平台費
  visaApplicationNumber?: string | null; // 自動化跟單用的簽證號碼
  remarks?: string | null;
  // 關聯擴充：前端列表常需要同時顯示僱主與外傭名字
  employer?: Employer;
  helper?: Helper;
}

// 7. 評價表 (平台的護城河：前僱主真實評價)
export interface Review {
  id: number;
  matchId?: number | null; // 選擇性關聯，證明是經平台配對後的真實評價
  reviewerId: number;      // 評價人 (通常是 Employer 的 userId)
  helperId: number;        // 被評價的外傭
  rating: number;          // 評分 (1-5 星)
  comment?: string | null;
  createdAt?: string | Date;
  // 關聯擴充
  reviewer?: Employer; 
}
