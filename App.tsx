



import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Settings from './components/Settings';

import DashboardHero from './components/DashboardHero';
import DashboardStats from './components/HowItWorks';
import DashboardFeatures from './components/Features';
import Chat from './components/Chat';

import LandingHero from './components/LandingHero';
import LandingFeatures from './components/LandingFeatures';
import LandingHowItWorks from './components/LandingHowItWorks';
import SupportTypes from './components/SupportTypes';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import { LogoIcon, MenuIcon, XIcon } from './constants';
import { ChatSession } from './types';


const Dashboard: React.FC<{ userName: string | null }> = ({ userName }) => (
  <>
    <DashboardHero userName={userName} />
    <DashboardStats /> 
    <DashboardFeatures />
  </>
);

const LandingPage: React.FC<{onNavigateToLogin: () => void}> = ({ onNavigateToLogin }) => (
    <>
        <LandingHero onGetStartedClick={onNavigateToLogin} />
        <LandingFeatures />
        <LandingHowItWorks />
        <SupportTypes />
        <Testimonials />
        <FAQ />
        <CTA onLearnMoreClick={onNavigateToLogin} />
    </>
);


const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'chat' | 'settings'>('landing');
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&q=80');
  const [isLandingMenuOpen, setLandingMenuOpen] = useState(false);

  // Chat History State
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Persist user session across page reloads
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mindfulMeUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user && user.nome) {
          setUserName(user.nome);
          if (user.avatarUrl) {
            setAvatarUrl(user.avatarUrl);
          }
          setView('dashboard');
        }
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('mindfulMeUser'); // Clear corrupted data if parsing fails
    }
  }, []);


  useEffect(() => {
    // Load chat sessions from localStorage on initial load
    try {
        const savedSessions = localStorage.getItem('chatSessions');
        if (savedSessions) {
            setChatSessions(JSON.parse(savedSessions));
        }
    } catch (error) {
        console.error("Failed to load chat sessions from localStorage", error);
        setChatSessions([]);
    }
  }, []);

  useEffect(() => {
    // Persist chat sessions to localStorage whenever they change
    if (view !== 'landing' && view !== 'login' && view !== 'signup') {
        try {
            localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
        } catch (error) {
            console.error("Failed to save chat sessions to localStorage", error);
        }
    }
  }, [chatSessions, view]);

  const handleNewChat = () => {
      const newChatId = `chat_${Date.now()}`;
      setActiveChatId(newChatId);
      showChat();
  }

  const handleUpdateChatSession = (session: ChatSession) => {
      setChatSessions(prev => {
          const exists = prev.some(s => s.id === session.id);
          if (exists) {
              return prev.map(s => s.id === session.id ? session : s);
          }
          return [...prev, session];
      });
  };

  const handleDeleteChat = (sessionId: string) => {
    setChatSessions(prev => prev.filter(s => s.id !== sessionId));
    if(activeChatId === sessionId) {
        const remainingChats = chatSessions.filter(s => s.id !== sessionId);
        setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  const handleDeleteAllChats = () => {
      setChatSessions([]);
      setActiveChatId(null);
  };

  const handleSelectChat = (sessionId: string) => {
      setActiveChatId(sessionId);
      showChat();
  };

  const handleLogin = async (email: string, password: string): Promise<string | void> => {
    try {
        const response = await fetch('https://aea1-2804-d57-6367-5400-a06c-a56-664f-124f.ngrok-free.app/webhook/6f803f3e-ced4-4c0b-b222-ad1e94c38b06', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'login', email, password}),
        });

        const responseText = await response.text();

        // Attempt to parse response as JSON, as this is the expected success case
        try {
            const data = JSON.parse(responseText);
            let userObject = data;

            // The response might be an array of users from a query.
            if (Array.isArray(data) && data.length > 0) {
                userObject = data[0];
            } else if (Array.isArray(data) && data.length === 0) {
                return 'Email ou senha inválidos.'; // No user found
            }

            // The property for the name is 'nome'.
            if (userObject && userObject.nome) {
                const newUserName = userObject.nome;
                setUserName(newUserName);
                const userData = { nome: newUserName, avatarUrl };
                localStorage.setItem('mindfulMeUser', JSON.stringify(userData));
                setView('dashboard');
                return; // Success
            } else {
                 return 'A resposta do servidor é válida, mas não contém um nome de usuário.';
            }
        } catch (e) {
            // Not a JSON response, so handle as a plain text message.
            console.warn('Login response was not valid JSON, treating as text message:', responseText);

            // Handle 'conta_existe' as a successful login.
            if (responseText.includes('conta_existe')) {
                 // The API confirms the account exists but doesn't return user data.
                 // This is a robust workaround for inconsistent API behavior.
                 // We will create a fallback name from the email to allow the user to log in.
                 const fallbackUserName = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                 setUserName(fallbackUserName);
                 const userData = { nome: fallbackUserName, avatarUrl };
                 localStorage.setItem('mindfulMeUser', JSON.stringify(userData));
                 setView('dashboard');
                 return; // Treat as success
            }
            
            if (responseText.includes('conta_inexistente')) {
                return 'Email ou senha inválidos.';
            }
            if (responseText.includes('Webhook node not correctly configured')) {
                return 'O serviço de login está temporariamente indisponível. Tente novamente mais tarde.';
            }
            return 'Email ou senha inválidos.';
        }
    } catch (error) {
        console.error('Login fetch failed', error);
        return 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
    }
  };
  
  const handleSignUp = async (firstName: string, lastName: string, email: string, password: string): Promise<string | void> => {
    try {
        const response = await fetch('https://aea1-2804-d57-6367-5400-a06c-a56-664f-124f.ngrok-free.app/webhook/6f803f3e-ced4-4c0b-b222-ad1e94c38b06', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'signup', fullName: `${firstName} ${lastName}`, email, password }),
        });
  
        const responseText = await response.text();
  
        // Success case
        if (responseText.includes('conta_criada_com_sucesso')) {
            const newUserName = `${firstName} ${lastName}`;
            setUserName(newUserName);

            // Persist user session
            const userData = { nome: newUserName, avatarUrl };
            localStorage.setItem('mindfulMeUser', JSON.stringify(userData));
            
            setView('dashboard');
            return; 
        }
        
        // Handle known error strings
        if (responseText.trim() === '200') {
            return 'Essa conta já existe.';
        }
  
        // Handle other errors if the response was not 'ok'.
        console.error('Sign up failed with status:', response.status);
        console.error('Sign up error body:', responseText);
        
        if (responseText.includes('Webhook node not correctly configured')) {
            return 'O serviço de cadastro está temporariamente indisponível. Por favor, tente novamente mais tarde.';
        }
  
        return `Ocorreu um erro durante o cadastro. Tente novamente.`;
        
    } catch (error) {
        console.error('Sign up fetch failed', error);
        return 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
    }
  };


  const handleLogout = () => {
    // Clear all session data for security and privacy
    localStorage.removeItem('mindfulMeUser');
    localStorage.removeItem('chatSessions');
    
    // Reset state
    setUserName(null);
    setChatSessions([]);
    setActiveChatId(null);
    setView('login');
  };

  const handleSaveSettings = (newName: string, newAvatar: string) => {
    setUserName(newName);
    setAvatarUrl(newAvatar);

    // Update persisted user session
    const userData = { nome: newName, avatarUrl: newAvatar };
    localStorage.setItem('mindfulMeUser', JSON.stringify(userData));
    
    setView('dashboard');
  };

  const showLogin = () => {
    setLandingMenuOpen(false);
    setView('login');
  };
  const showSignUp = () => {
    setLandingMenuOpen(false);
    setView('signup');
  };
  const showLanding = () => {
    setLandingMenuOpen(false);
    setView('landing');
  };
  const showDashboard = () => setView('dashboard');
  const showChat = () => setView('chat');
  const showSettings = () => setView('settings');

  if (view === 'signup') {
    return (
        <div className="bg-slate-50 min-h-screen font-sans text-gray-900">
          <main>
              <SignUp onSignUp={handleSignUp} onBackToLogin={showLogin} onBackToHome={showLanding} />
          </main>
        </div>
    );
  }

  if (view === 'login') {
      return (
          <div className="bg-slate-50 min-h-screen font-sans text-gray-900">
            <main>
                <Login onLogin={handleLogin} onShowSignUp={showSignUp} onBackToHome={showLanding} />
            </main>
          </div>
      );
  }

  if (view === 'settings') {
    return (
      <div className="bg-white min-h-screen font-sans text-gray-900 flex flex-col">
        <Header 
          userName={userName}
          avatarUrl={avatarUrl}
          onLogoutClick={handleLogout} 
          onHomeClick={showDashboard}
          onChatClick={handleNewChat}
          onSettingsClick={showSettings}
          />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
          <Settings
            currentName={userName || ''}
            currentAvatar={avatarUrl}
            onSave={handleSaveSettings}
            onBack={showDashboard}
           />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === 'chat') {
    return (
      <div className="bg-white min-h-screen font-sans text-gray-900 flex flex-col">
        <Header 
          userName={userName}
          avatarUrl={avatarUrl}
          onLogoutClick={handleLogout} 
          onHomeClick={showDashboard}
          onChatClick={handleNewChat}
          onSettingsClick={showSettings}
          />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex">
          <Chat 
            userName={userName} 
            avatarUrl={avatarUrl}
            chatSessions={chatSessions}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onUpdateChat={handleUpdateChatSession}
            onDeleteChat={handleDeleteChat}
            onDeleteAllChats={handleDeleteAllChats}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="bg-white min-h-screen font-sans text-gray-900">
        <Header 
          userName={userName}
          avatarUrl={avatarUrl}
          onLogoutClick={handleLogout} 
          onHomeClick={showDashboard}
          onChatClick={handleNewChat}
          onSettingsClick={showSettings}
          />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Dashboard userName={userName} />
        </main>
        <Footer />
      </div>
    );
  }

  const landingNavLinks = [
      { name: 'Home', handler: () => {} },
      { name: 'Resources', handler: () => {} },
      { name: 'Community', handler: () => {} },
      { name: 'About Us', handler: () => {} },
  ];

  // Landing page view
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <header className="bg-white py-4 sticky top-0 z-50 border-b border-gray-200/80">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <button onClick={showLanding} className="flex items-center space-x-3 focus:outline-none" aria-label="Go to homepage">
            <LogoIcon />
            <span className="font-bold text-2xl text-gray-900">MindfulMe</span>
          </button>
          <div className="hidden md:flex items-center space-x-8">
             {landingNavLinks.map(link => (
                 <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); link.handler(); }} className="text-gray-600 hover:text-gray-900 transition-colors">{link.name}</a>
             ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={showLogin}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-2 px-5 rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setLandingMenuOpen(!isLandingMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-gray-900" aria-label="Open menu">
                {isLandingMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
        {isLandingMenuOpen && (
            <div className="md:hidden mt-4 px-4 pb-4 border-b border-gray-200/80">
                <div className="flex flex-col space-y-4">
                    {landingNavLinks.map(link => (
                        <a key={link.name} href="#" onClick={(e) => { e.preventDefault(); link.handler(); }} className="block text-gray-600 hover:text-gray-900 transition-colors py-2">{link.name}</a>
                    ))}
                    <button
                      onClick={showLogin}
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 px-5 rounded-lg transition-colors text-center"
                    >
                      Get Started
                    </button>
                </div>
            </div>
        )}
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LandingPage onNavigateToLogin={showLogin} />
      </main>
      <Footer />
    </div>
  );
};

export default App;