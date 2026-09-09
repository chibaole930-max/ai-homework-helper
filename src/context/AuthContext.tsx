import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { getToken, setToken, authHeaders, UserInfo } from '../lib/auth';

interface AuthContextValue {
  user: UserInfo | null;
  loading: boolean;
  authOpen: boolean;
  vipOpen: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => void;
  redeem: (code: string) => Promise<string | null>;
  openAuth: () => void;
  openVip: () => void;
  closeModals: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth phải dùng trong <AuthProvider>');
  }
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [vipOpen, setVipOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetch('/api/auth/me', { headers: authHeaders() })
      .then(async (r) => {
        if (r.status === 401) {
          setToken(null);
          setUser(null);
          return;
        }
        const data = await r.json();
        if (data.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return data.error || 'Đăng nhập thất bại.';
      setToken(data.token);
      setUser(data.user);
      setAuthOpen(false);
      return null;
    } catch {
      return 'Không kết nối được máy chủ. Vui lòng thử lại.';
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) return data.error || 'Đăng ký thất bại.';
        setToken(data.token);
        setUser(data.user);
        setAuthOpen(false);
        return null;
      } catch {
        return 'Không kết nối được máy chủ. Vui lòng thử lại.';
      }
    },
    []
  );

  const logout = useCallback(() => {
    const token = getToken();
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: authHeaders(),
      }).catch(() => {});
    }
    setToken(null);
    setUser(null);
  }, []);

  const redeem = useCallback(async (code: string) => {
    try {
      const res = await fetch('/api/vip/redeem', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) return data.error || 'Không kích hoạt được mã.';
      setUser(data.user);
      return null;
    } catch {
      return 'Không kết nối được máy chủ. Vui lòng thử lại.';
    }
  }, []);

  const openAuth = useCallback(() => {
    setVipOpen(false);
    setAuthOpen(true);
  }, []);

  const openVip = useCallback(() => setVipOpen(true), []);
  const closeModals = useCallback(() => {
    setAuthOpen(false);
    setVipOpen(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authOpen,
        vipOpen,
        login,
        register,
        logout,
        redeem,
        openAuth,
        openVip,
        closeModals,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};