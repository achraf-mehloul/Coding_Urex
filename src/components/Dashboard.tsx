import { useState, useEffect } from 'react';
import { LogOut, Users, TrendingUp, Target, Download } from 'lucide-react';
import { supabase, Registration } from '../lib/supabase';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    topMajor: '',
    beginners: 0,
  });

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setRegistrations(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Registration[]) => {
    const majorCount: { [key: string]: number } = {};
    let beginnerCount = 0;

    data.forEach((reg) => {
      majorCount[reg.major] = (majorCount[reg.major] || 0) + 1;
      if (reg.programming_knowledge.toLowerCase().includes('beginner') ||
          reg.programming_knowledge.toLowerCase().includes('none') ||
          reg.programming_knowledge.toLowerCase().includes('no')) {
        beginnerCount++;
      }
    });

    const topMajor = Object.entries(majorCount).sort((a, b) => b[1] - a[1])[0];

    setStats({
      total: data.length,
      topMajor: topMajor ? topMajor[0] : 'N/A',
      beginners: data.length > 0 ? Math.round((beginnerCount / data.length) * 100) : 0,
    });
  };

  const exportToCSV = () => {
    const headers = ['Full Name', 'Last Name', 'Date of Birth', 'Major', 'Department', 'Campus', 'Programming Knowledge', 'Goals', 'Registration Date'];
    const rows = registrations.map(reg => [
      reg.full_name,
      reg.last_name,
      reg.date_of_birth,
      reg.major,
      reg.department,
      reg.campus,
      reg.programming_knowledge,
      reg.programming_goals,
      new Date(reg.created_at).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urex-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-yellow-400 text-xl">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTYtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYtMi42ODYgNi02IDZjLTMuMzE0IDAtNiAyLjY4Ni02IDZ6TTAgMTZjMC0zLjMxNCAyLjY4Ni02IDYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNi0yLjY4NiA2LTYgNmMtMy4zMTQgMC02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="relative z-10">
        <header className="border-b border-yellow-500/20 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img
                src="/552102244_1511459556843066_700200828006065403_n-removebg-preview.png"
                alt="Urex Club"
                className="h-12 md:h-14"
              />
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors border border-yellow-500/30"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors border border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-xl">
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Registrations</p>
                  <p className="text-3xl font-bold text-yellow-400">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Most Common Major</p>
                  <p className="text-xl font-bold text-blue-400 truncate">{stats.topMajor}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <Target className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Beginners</p>
                  <p className="text-3xl font-bold text-green-400">{stats.beginners}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-yellow-500/30 rounded-2xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-yellow-500/20">
              <h2 className="text-xl md:text-2xl font-bold text-yellow-400">
                Student Registrations
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-500/10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-yellow-400">Name</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-yellow-400 hidden md:table-cell">Major</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-yellow-400 hidden lg:table-cell">Campus</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-yellow-400 hidden lg:table-cell">Knowledge</th>
                    <th className="px-4 py-3 text-left text-xs md:text-sm font-semibold text-yellow-400">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {registrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-yellow-500/5 transition-colors">
                      <td className="px-4 py-4 text-sm">
                        <div>
                          <p className="font-medium">{reg.full_name} {reg.last_name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{reg.major}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300 hidden md:table-cell">{reg.major}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 hidden lg:table-cell">{reg.campus}</td>
                      <td className="px-4 py-4 text-sm text-gray-300 hidden lg:table-cell max-w-xs truncate">
                        {reg.programming_knowledge}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {new Date(reg.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {registrations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">No registrations yet</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
