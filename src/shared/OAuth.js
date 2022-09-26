const REST_API_KEY = "3d365192ea8ab4f32c7f9c1d7c5688e1";
const REDIRECT_URI = "http://localhost:3000/kakaoloading";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
