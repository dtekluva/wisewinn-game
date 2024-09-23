export interface User {
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name?: null;
  account_num?: null;
  account_name: string;
  bank_name?: null;
  bank_code?: null;
  bvn_number?: null;
  gender: string;
  channel: string;
  referalcode: string;
  referal_url: null;
  referal_wallet_balance?: null;
  phone_number_verified?: boolean;
  play_balance: number;
  user_profile_image: string;
  winning_balance: number;
  referrals_quantity: string;
  account_details?: {
    account_number: string;
    account_name: string;
    bank_name: string;
  };
}

export interface DynamicUserData {
  has_pin: boolean;
  has_profile_img: boolean;
  has_bvn: boolean;
  collect_bvn: boolean;
  has_testimonal: boolean;
}

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
};

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'STOP_LOADING' };

export type AuthDispatch = React.Dispatch<AuthAction> | null;

export type LoginDto = {
  email: string;
  password: string;
};

export type PhoneLoginDto = {
  phone: string;
  password: string;
};
export type EmailLoginDto = {
  email: string;
  password: string;
};

export type GoogleAuthDto = {
  user_id_token: string;
};

export type SignUpGoogleResponse = {
  token: string;
};

export type SignUpDto = {
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  referral_code: string;
};
export type ActivateUserDto = {
  email: string;
  code: string;
};

export type ResendActivateUserDto = {
  email: string;
};

export type createPinDto = {
  pin: string;
  confirm_pin: string;
};

export type ResetPinDto = {
  old_pin: string;
  new_pin: string;
  confirm_new_pin: string;
};
export type ConfirmResetPasswordDto = {
  token: string;
  password: string;
  new_password: string;
};

export type changePasswordDto = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

export type ResetPasswordDto = {
  email: string;
};

export type SignUpResponse = {
  email: string;
  phone: string;
  referral_code?: string;
};

export type TokenResponse = {
  auth_token: string;
};

export type NewTokenResponse = {
  token: string;
};

export type ReferralCampaignDto = {
  message: string;
  user_details: {
    first_name: string;
    phone_number: string;
  }[];
};
