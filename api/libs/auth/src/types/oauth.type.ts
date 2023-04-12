export type GoogleApiResponseType = {
  family_name: string;
  name: string;
  picture: string;
  locale: string;
  email: string;
  given_name: string;
  id: string;
  verified_email: boolean;
};

export type KakaoApiResponseType = {
  id: number;
  connected_at: Date;
  properties: any;
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
};
