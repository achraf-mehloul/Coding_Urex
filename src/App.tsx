import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import { supabase } from './lib/supabase';

type View = 'landing' | 'registration' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('landing');
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setIsAuthenticated(true);
      setView('dashboard');
    }
  };

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      setClickCount(0);
    }, 500);

    setClickTimer(timer);

    if (clickCount + 1 === 2) {
      setShowLogin(true);
      setClickCount(0);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: `${username.toLowerCase()}@urex.admin`,
      password: password,
    });

    if (error) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: `${username.toLowerCase()}@urex.admin`,
        password: password,
      });

      if (signUpError) {
        console.error('Auth error:', signUpError);
        return;
      }
    }

    setIsAuthenticated(true);
    setShowLogin(false);
    setView('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <div onClick={handleLogoClick}>
          <LandingPage onJoinNow={() => setView('registration')} />
        </div>
      )}
      {view === 'registration' && (
        <RegistrationForm onBack={() => setView('landing')} />
      )}
      {view === 'dashboard' && isAuthenticated && (
        <Dashboard onLogout={handleLogout} />
      )}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

export default App;
