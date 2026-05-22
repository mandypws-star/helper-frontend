// 用戶角色
export const UserRole = {
  EMPLOYER: 'EMPLOYER',
  HELPER: 'HELPER',
  ADMIN: 'ADMIN',
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

// 帳戶狀態
export const AccountStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;
export type AccountStatus = typeof AccountStatus[keyof typeof AccountStatus];

// 外傭國籍
export const NationalityType = {
  PHILIPPINES: 'PHILIPPINES',
  INDONESIA: 'INDONESIA',
  THAILAND: 'THAILAND',
  OTHER: 'OTHER',
} as const;
export type NationalityType = typeof NationalityType[keyof typeof NationalityType];

// 外傭目前所在地
export const CurrentLocationType = {
  HONG_KONG: 'HONG_KONG',
  LOCAL_FINISHED: 'LOCAL_FINISHED',
  OVERSEAS: 'OVERSEAS',
} as const;
export type CurrentLocationType = typeof CurrentLocationType[keyof typeof CurrentLocationType];

// 配對/申請進度狀態
export const MatchStatus = {
  APPLIED: 'APPLIED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEWED: 'INTERVIEWED',
  CONTRACT_SIGNED: 'CONTRACT_SIGNED',
  VISA_PROCESSING: 'VISA_PROCESSING',
  SUCCESS: 'SUCCESS',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
} as const;
export type MatchStatus = typeof MatchStatus[keyof typeof MatchStatus];


