import { Link, useLocation } from 'react-router-dom';
import { WalletConnectButton } from './WalletConnectButton';
import { useWalletContext } from '@/contexts/WalletContext';
import { LayoutDashboard, User, FileText, Users, Activity } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const { hasCompletedOnboarding } = useWalletContext();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/governance', label: 'Governance', icon: FileText },
    { path: '/agents', label: 'Agents', icon: Users },
    { path: '/reports', label: 'Reports', icon: Activity },
  ];

  // Don't show full nav on landing page or if not opted in
  const isLandingPage = location.pathname === '/';
  const showFullNav = hasCompletedOnboarding && !isLandingPage;

  return (
    <nav className="border-b border-border glass-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-solana flex items-center justify-center glow-primary">
              <span className="text-2xl font-bold">Σ</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold bg-gradient-solana bg-clip-text text-transparent">
                Solana AI Hedge Syndicate
              </div>
              <div className="text-xs text-muted-foreground">
                Decentralized AI Trading
              </div>
            </div>
          </Link>

          {showFullNav && (
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:bg-muted ${
                      isActive ? 'bg-muted text-primary font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {showFullNav && <WalletConnectButton />}
        </div>

        {/* Mobile Navigation - Only show if opted in */}
        {showFullNav && (
          <div className="flex lg:hidden items-center gap-1 mt-4 overflow-x-auto pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                    isActive ? 'bg-muted text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};
