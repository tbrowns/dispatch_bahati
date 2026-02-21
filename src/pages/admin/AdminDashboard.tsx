import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import {
  LayoutDashboard,
  Home,
  Briefcase,
  Users,
  MessageSquare,
  Phone,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Globe,
  Loader2,
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { content, isLoading, updateContent, updateNestedContent, addItem, removeItem, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [saveMessage, setSaveMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  

  useEffect(() => {
    const isAuth = sessionStorage.getItem('bahati-admin-auth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      setSaveMessage('Changes saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all content to default? This cannot be undone.')) {
      await resetContent();
      setSaveMessage('Content reset to default!');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'trustBar', label: 'Trust Bar', icon: Check },
    { id: 'howItWorks', label: 'How It Works', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'whyChooseUs', label: 'Why Choose Us', icon: Users },
    { id: 'whoWeServe', label: 'Who We Serve', icon: Users },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'faq', label: 'FAQ', icon: MessageSquare },
    { id: 'cta', label: 'CTA Section', icon: Globe },
    { id: 'contact', label: 'Contact Info', icon: Phone },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#edb88b] animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading content from Firebase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-[#2a2a2a] fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#edb88b] rounded-lg flex items-center justify-center">
              <span className="font-display font-bold text-black">B</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-white">BAHATI</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#edb88b] text-black'
                  : 'text-gray-400 hover:bg-[#1c1c1c] hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[#2a2a2a] bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5" />
            <span className="text-sm">View Website</span>
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-[#141414] border-b border-[#2a2a2a] px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-5 h-5 text-[#edb88b]" />
            <h2 className="font-display font-bold text-white text-lg">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className="text-green-400 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                {saveMessage}
              </span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Reset</span>
            </button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="btn-primary py-2 px-4 text-sm disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="font-display font-bold text-white text-lg mb-4">Hero Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Tagline</label>
                    <input
                      type="text"
                      value={content.hero.tagline}
                      onChange={(e) => updateContent('hero', { tagline: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <textarea
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero', { title: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero', { description: e.target.value })}
                      className="admin-textarea h-32"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">CTA Button Text</label>
                    <input
                      type="text"
                      value={content.hero.ctaText}
                      onChange={(e) => updateContent('hero', { ctaText: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Trust Bar */}
          {activeTab === 'trustBar' && (
            <div className="space-y-6">
              {content.trustBar.items.map((item: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white">Trust Item {index + 1}</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const items = [...content.trustBar.items];
                          items[index] = { ...item, title: e.target.value };
                          updateContent('trustBar', { items });
                        }}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Description</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const items = [...content.trustBar.items];
                          items[index] = { ...item, description: e.target.value };
                          updateContent('trustBar', { items });
                        }}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* How It Works */}
          {activeTab === 'howItWorks' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <label className="block text-gray-400 text-sm mb-2">Section Title</label>
                <input
                  type="text"
                  value={content.howItWorks.title}
                  onChange={(e) => updateContent('howItWorks', { title: e.target.value })}
                  className="admin-input"
                />
              </div>
              {content.howItWorks.steps.map((step: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <h3 className="font-display font-bold text-white mb-4">Step {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const steps = [...content.howItWorks.steps];
                          steps[index] = { ...step, title: e.target.value };
                          updateContent('howItWorks', { steps });
                        }}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Description</label>
                      <textarea
                        value={step.description}
                        onChange={(e) => {
                          const steps = [...content.howItWorks.steps];
                          steps[index] = { ...step, description: e.target.value };
                          updateContent('howItWorks', { steps });
                        }}
                        className="admin-textarea h-20"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Services */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Section Title</label>
                    <input
                      type="text"
                      value={content.services.title}
                      onChange={(e) => updateContent('services', { title: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.services.subtitle}
                      onChange={(e) => updateContent('services', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={content.services.description}
                      onChange={(e) => updateContent('services', { description: e.target.value })}
                      className="admin-textarea h-20"
                    />
                  </div>
                </div>
              </div>

              {content.services.items.map((service: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white">Service {index + 1}</h3>
                    <button
                      onClick={() => removeItem('services', index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateNestedContent('services', index, { title: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Features (one per line)</label>
                      <textarea
                        value={service.features.join('\n')}
                        onChange={(e) => updateNestedContent('services', index, { features: e.target.value.split('\n').filter(f => f.trim()) })}
                        className="admin-textarea h-32"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  addItem('services', {
                    title: 'New Service',
                    features: ['Feature 1', 'Feature 2', 'Feature 3'],
                  })
                }
                className="w-full py-4 border-2 border-dashed border-[#2a2a2a] rounded-lg text-gray-500 hover:text-[#edb88b] hover:border-[#edb88b] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Service
              </button>
            </div>
          )}

          {/* Why Choose Us */}
          {activeTab === 'whyChooseUs' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.whyChooseUs.subtitle}
                      onChange={(e) => updateContent('whyChooseUs', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <textarea
                      value={content.whyChooseUs.title}
                      onChange={(e) => updateContent('whyChooseUs', { title: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={content.whyChooseUs.description}
                      onChange={(e) => updateContent('whyChooseUs', { description: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                </div>
              </div>

              {content.whyChooseUs.features.map((feature: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <h3 className="font-display font-bold text-white mb-4">Feature {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => {
                          const features = [...content.whyChooseUs.features];
                          features[index] = { ...feature, title: e.target.value };
                          updateContent('whyChooseUs', { features });
                        }}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Description</label>
                      <input
                        type="text"
                        value={feature.description}
                        onChange={(e) => {
                          const features = [...content.whyChooseUs.features];
                          features[index] = { ...feature, description: e.target.value };
                          updateContent('whyChooseUs', { features });
                        }}
                        className="admin-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Who We Serve */}
          {activeTab === 'whoWeServe' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.whoWeServe.subtitle}
                      onChange={(e) => updateContent('whoWeServe', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={content.whoWeServe.title}
                      onChange={(e) => updateContent('whoWeServe', { title: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={content.whoWeServe.description}
                      onChange={(e) => updateContent('whoWeServe', { description: e.target.value })}
                      className="admin-textarea h-20"
                    />
                  </div>
                </div>
              </div>

              {content.whoWeServe.clients.map((client: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <h3 className="font-display font-bold text-white mb-4">Client Type {index + 1}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Title</label>
                      <input
                        type="text"
                        value={client.title}
                        onChange={(e) => {
                          const clients = [...content.whoWeServe.clients];
                          clients[index] = { ...client, title: e.target.value };
                          updateContent('whoWeServe', { clients });
                        }}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Description</label>
                      <textarea
                        value={client.description}
                        onChange={(e) => {
                          const clients = [...content.whoWeServe.clients];
                          clients[index] = { ...client, description: e.target.value };
                          updateContent('whoWeServe', { clients });
                        }}
                        className="admin-textarea h-20"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Benefits (one per line)</label>
                      <textarea
                        value={client.benefits.join('\n')}
                        onChange={(e) => {
                          const clients = [...content.whoWeServe.clients];
                          clients[index] = { ...client, benefits: e.target.value.split('\n').filter(b => b.trim()) };
                          updateContent('whoWeServe', { clients });
                        }}
                        className="admin-textarea h-24"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.reviews.subtitle}
                      onChange={(e) => updateContent('reviews', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={content.reviews.title}
                      onChange={(e) => updateContent('reviews', { title: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              {content.reviews.items.map((review: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white">Review {index + 1}</h3>
                    <button
                      onClick={() => removeItem('reviews', index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Review Text</label>
                      <textarea
                        value={review.text}
                        onChange={(e) => updateNestedContent('reviews', index, { text: e.target.value })}
                        className="admin-textarea h-24"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Author Name</label>
                        <input
                          type="text"
                          value={review.author}
                          onChange={(e) => updateNestedContent('reviews', index, { author: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Role</label>
                        <input
                          type="text"
                          value={review.role}
                          onChange={(e) => updateNestedContent('reviews', index, { role: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  addItem('reviews', {
                    text: 'Great service! Highly recommend.',
                    author: 'New Client',
                    role: 'Owner-Operator',
                    rating: 5,
                  })
                }
                className="w-full py-4 border-2 border-dashed border-[#2a2a2a] rounded-lg text-gray-500 hover:text-[#edb88b] hover:border-[#edb88b] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Review
              </button>
            </div>
          )}

          {/* FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.faq.subtitle}
                      onChange={(e) => updateContent('faq', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={content.faq.title}
                      onChange={(e) => updateContent('faq', { title: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              {content.faq.items.map((item: any, index: number) => (
                <div key={index} className="card-dark p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold text-white">FAQ {index + 1}</h3>
                    <button
                      onClick={() => removeItem('faq', index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Question</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateNestedContent('faq', index, { question: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Answer</label>
                      <textarea
                        value={item.answer}
                        onChange={(e) => updateNestedContent('faq', index, { answer: e.target.value })}
                        className="admin-textarea h-24"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  addItem('faq', {
                    question: 'New Question?',
                    answer: 'Answer to the new question.',
                  })
                }
                className="w-full py-4 border-2 border-dashed border-[#2a2a2a] rounded-lg text-gray-500 hover:text-[#edb88b] hover:border-[#edb88b] transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New FAQ
              </button>
            </div>
          )}

          {/* CTA */}
          {activeTab === 'cta' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={content.cta.subtitle}
                      onChange={(e) => updateContent('cta', { subtitle: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title</label>
                    <textarea
                      value={content.cta.title}
                      onChange={(e) => updateContent('cta', { title: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      value={content.cta.description}
                      onChange={(e) => updateContent('cta', { description: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Primary CTA Text</label>
                    <input
                      type="text"
                      value={content.cta.primaryCta}
                      onChange={(e) => updateContent('cta', { primaryCta: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Secondary CTA Text</label>
                    <input
                      type="text"
                      value={content.cta.secondaryCta}
                      onChange={(e) => updateContent('cta', { secondaryCta: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="font-display font-bold text-white text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                    <input
                      type="text"
                      value={content.contact.phone}
                      onChange={(e) => updateContent('contact', { phone: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                    <input
                      type="text"
                      value={content.contact.email}
                      onChange={(e) => updateContent('contact', { email: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Physical Address</label>
                    <textarea
                      value={content.contact.address}
                      onChange={(e) => updateContent('contact', { address: e.target.value })}
                      className="admin-textarea h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Support Hours</label>
                    <input
                      type="text"
                      value={content.contact.hours}
                      onChange={(e) => updateContent('contact', { hours: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
