import api from "../axios";
import useAuthStore from "../stores/useAuthStore";

export const loginWithProvider = async (provider: string, providerToken: string) => {
  const response = await api.post(`/oauth/${provider}/callback`, {
    token: providerToken,
  });

  const user = response.data.data.user;
  const token = response.data.data.token;

  useAuthStore.getState().login(user, token);

  return user;
}

export const logout = async () => {
  try {
    await api.post("/logout");
  } catch (error) {
  } finally {
    useAuthStore.getState().logout();
  }
};

export const checkAuth = async () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    useAuthStore.getState().setUser(null);
    return null;
  }

  try {
    const response = await api.get("/user");
    const user = response.data.data.user;

    useAuthStore.getState().setUser(user);
    return user;
  } catch (error) {
    useAuthStore.getState().setUser(null);
    return null;
  }
};
