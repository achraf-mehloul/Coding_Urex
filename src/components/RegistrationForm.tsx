import { useState, FormEvent } from 'react';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegistrationFormProps {
  onBack: () => void;
}

export default function RegistrationForm({ onBack }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    last_name: '',
    date_of_birth: '',
    major: '',
    department: '',
    campus: '',
    programming_knowledge: '',
    programming_goals: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([formData]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          full_name: '',
          last_name: '',
          date_of_birth: '',
          major: '',
          department: '',
          campus: '',
          programming_knowledge: '',
          programming_goals: '',
        });
        onBack();
      }, 3000);
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="relative">
            <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-yellow-500 mx-auto animate-scaleIn" />
            <div className="absolute inset-0 bg-yellow-500/20 blur-3xl animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Registration Successful!
          </h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Welcome to the Urex Bootcamp 🚀
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-12 px-4">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGFmMzciIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTYtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYtMi42ODYgNi02IDZjLTMuMzE0IDAtNiAyLjY4Ni02IDZ6TTAgMTZjMC0zLjMxNCAyLjY4Ni02IDYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNi0yLjY4NiA2LTYgNmMtMy4zMTQgMC02IDIuNjg2LTYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-6 md:p-10 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Join the Bootcamp
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-yellow-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="أكتب إسمك"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="أكتب لقبك"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label className="block text-sm font-semibold text-yellow-400 mb-2">
                  Major
                </label>
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="أكتب تخصصك الجامعي"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-400 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="أكتب إسم القسم"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-2">
                Campus
              </label>
              <input
                type="text"
                required
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="أكتب إسم الكلية"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-2">
                What do you know about programming?
              </label>
              <textarea
                required
                value={formData.programming_knowledge}
                onChange={(e) => setFormData({ ...formData, programming_knowledge: e.target.value })}
                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors h-24 md:h-32 resize-none"
                placeholder="مادا تعرف عن البرمجة"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-yellow-400 mb-2">
                What are your goals in programming?
              </label>
              <textarea
                required
                value={formData.programming_goals}
                onChange={(e) => setFormData({ ...formData, programming_goals: e.target.value })}
                className="w-full bg-black/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors h-24 md:h-32 resize-none"
                placeholder="ماهو هدفك من تعلم البرمجة"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
