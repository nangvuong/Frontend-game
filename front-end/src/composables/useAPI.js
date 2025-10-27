import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// REQUEST INTERCEPTOR (Thêm token vào header)
// ========================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// ========================================
// RESPONSE INTERCEPTOR (Xử lý lỗi global)
// ========================================

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn -> redirect login
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const authAPI = {
  login: (credentials) => apiClient.post("/auth/login", credentials),

  register: (userData) => apiClient.post("/auth/register", userData),

  logout: () => apiClient.post("/auth/logout"),
};

export const userAPI = {
  profile: () => apiClient.get("/users/profile"),
  updateProfile: (data) => apiClient.put("/users/profile", data),
  getUsers: () => apiClient.get("/users/list-users"),
};
export const challengeAPI = {
  // Gửi lời thách đấu
  sendChallenge: (challengedId, message = "") =>
    apiClient.post("/challenges/send", {
      challengedId,
      message,
    }),
 
  // Chấp nhận thách đấu
  acceptChallenge: (challengeId) =>
    apiClient.post(`/challenges/${challengeId}/accept`),

  // Từ chối thách đấu
  rejectChallenge: (challengeId) =>
    apiClient.post(`/challenges/${challengeId}/reject`),

  // Hủy thách đấu
  cancelChallenge: (challengeId) =>
    apiClient.post(`/challenges/${challengeId}/cancel`),

  // Lấy danh sách thách đấu đang chờ
  getPendingChallenges: () => apiClient.get("/challenges/pending"),
};

export const matchAPI = {
  // Ready
  readyMatch: (matchId) => apiClient.post(`/matches/${matchId}/ready`),
}