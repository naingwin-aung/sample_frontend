import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { checkAuth } from "../api/auth";

export default function AppInitializer() {
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("No existing session found");
      }

      // setLoading(false);
    };

    initializeAuth();
  }, []);

  // if (loading) {
  //   return <div style={{ 
  //       display: 'flex', 
  //       justifyContent: 'center', 
  //       alignItems: 'center', 
  //       height: '100vh',
  //       fontSize: '1.5em'
  //   }}>
  //       ⏳ Loading session...
  //   </div>; 
  // }

  return <Outlet />;
}
