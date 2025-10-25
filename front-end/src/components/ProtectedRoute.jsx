import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ isLoggedIn, children }) {
  // Nếu chưa đăng nhập, chuyển sang trang login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component
  return children;
}
