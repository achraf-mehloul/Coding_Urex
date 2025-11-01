import { ArrowRight, BookOpen, Clock, Users, Award } from 'lucide-react';

interface LandingPageProps {
  onJoinNow: () => void;
}

export default function LandingPage({ onJoinNow }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTYtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYtMi42ODYgNi02IDZjLTMuMzE0IDAtNiAyLjY4Ni02IDZ6TTAgMTZjMC0zLjMxNCAyLjY4Ni02IDYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNi0yLjY4NiA2LTYgNmMtMy4zMTQgMC02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <img
            src="/552102244_1511459556843066_700200828006065403_n-removebg-preview.png"
            alt="Urex Club"
            className="h-16 md:h-20 filter drop-shadow-2xl"
          />
          <div className="text-right">
            <p className="text-xs md:text-sm text-gray-400">Presented by</p>
            <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Urex Club
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Urex Web Development
                </span>
                <br />
                <span className="text-white">Bootcamp</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Learn HTML, CSS, GitHub, and Render — for Free!
              </p>
              <button
                onClick={onJoinNow}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50"
              >
                Join Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-24">
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 md:p-8 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Course Goals</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Master the fundamentals of web development with hands-on projects and real-world applications.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 md:p-8 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <Clock className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Duration</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Intensive bootcamp designed to get you building websites in weeks, not months.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 md:p-8 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Organized By</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Brought to you by Urex Club, dedicated to empowering students with tech skills.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 md:p-8 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <Award className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-yellow-400">Benefits</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Completely free, certificate of participation, and student-focused curriculum.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
