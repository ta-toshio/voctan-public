
export const UserType = {
  GUEST: 'guest',
  USER: 'user',
} as const
export type UserType = typeof UserType[keyof typeof UserType]

export interface SessionData {
  uuid: string;
  type: UserType;
  isLoggedIn: boolean;
  flushMessages?: string[];
}

export const defaultSession: SessionData = {
  uuid: "",
  type: UserType.GUEST,
  isLoggedIn: false,
  flushMessages: [],
};
