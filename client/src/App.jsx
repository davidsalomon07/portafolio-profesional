import { useEffect, useState } from 'react';
import axios from 'axios';

// 1. IMPORTAMOS EL MODAL Y LA DATA
import ProfileModal from './components/ProfileModal';
import { profileData } from './data/profileInfo';

function App() {
  // --- 🌐 CONFIGURACIÓN INTELIGENTE DE URL (Paso 4.1) ---
  // Si estamos en la nube, usa la variable de entorno. Si no, usa localhost.
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // ESTADOS PARA LOS MODALES
  const [selectedProject, setSelectedProject] = useState(null); // Detalle Proyecto
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Mensaje Enviado
  
  // ESTADO PARA EL PERFIL
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- ESTADO DE CARGA ---
  const [isSending, setIsSending] = useState(false);

  // Cargar Proyectos
  useEffect(() => {
    // CAMBIO 1: Usamos la variable API_URL
    axios.get(`${API_URL}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error cargando proyectos", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Activamos modo carga
    setIsSending(true);

    try {
      // CAMBIO 2: Usamos la variable API_URL
      await axios.post(`${API_URL}/api/contact`, formData);
      setShowSuccessModal(true); 
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowSuccessModal(false), 3000);
    } catch (error) {
      alert("Error enviando mensaje (Revisa que el Backend esté encendido)");
    } finally {
      // 2. Desactivamos modo carga (pase lo que pase)
      setIsSending(false);
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 selection:bg-blue-200 relative">
      
      {/* --- NAVEGACIÓN --- */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-slate-900">
            DAVID<span className="text-blue-600"> SALOMÓN</span>
          </div>
          
          <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600">
            {/* Botón Perfil corregido para hacer scroll */}
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition">Perfil</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-600 transition">Stack</button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-600 transition">Portafolio</button>
            <button onClick={() => scrollToSection('contact')} className="px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-blue-700 transition">Contrátame</button>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        </div>
        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl flex flex-col p-4 gap-4 animate-fade-in-down">
            <button onClick={() => scrollToSection('about')} className="text-left px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition">
              Perfil
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-left px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition">
              Stack Tecnológico
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-left px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition">
              Portafolio
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
              Contrátame
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO --- */}
      <section id="about" className="pt-40 pb-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block p-1 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-xl">
            <img 
              src="/images/david.jpeg" 
              alt="Perfil" 
              className="w-36 h-36 rounded-full border-4 border-white bg-white object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900 leading-tight">
            Desarrollador <span className="text-blue-600">Full Stack</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Con base en <span className="font-semibold text-slate-800">Quito, Ecuador</span>. 
            Especializado en construir aplicaciones web modernas (React/Node) y optimización de Hardware de alto rendimiento.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition-all">
              Contactar Ahora
            </button>
            
            <button onClick={() => scrollToSection('projects')} className="px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-xl hover:bg-slate-50 transition-all">
              Ver Experiencia
            </button>

            {/* BOTÓN SOBRE MÍ (Abre el Modal) */}
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl shadow-lg hover:bg-slate-900 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Sobre Mí
            </button>
          </div>
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section id="skills" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">💻</div><h3 className="font-bold">Frontend</h3>
              <p className="text-xs text-slate-500 mt-1">React, Vite, Tailwind</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">⚙️</div><h3 className="font-bold">Backend</h3>
              <p className="text-xs text-slate-500 mt-1">Node.js, PostgreSQL</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">🎮</div><h3 className="font-bold">Hardware</h3>
              <p className="text-xs text-slate-500 mt-1">Optimización & GPUs</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="text-3xl mb-3">📊</div><h3 className="font-bold">Gestión</h3>
              <p className="text-xs text-slate-500 mt-1">Jira, Scrum, Git</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROYECTOS --- */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
            Proyectos Destacados
            <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
          </h2>
          
          <div className="grid grid-cols-1 gap-10">
            {projects.map((project) => (
              <article key={project.id} className="flex flex-col md:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="md:w-1/2 h-64 md:h-auto bg-slate-100 relative overflow-hidden group">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 text-slate-800">{project.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags && project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition"
                    >
                      Ver Detalles
                    </button>
                    {project.repo_url && project.repo_url !== '#' ? (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex-1 py-3 px-4 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50 transition text-center flex items-center justify-center">
                        GitHub ↗
                      </a>
                    ) : (
                      <button disabled className="flex-1 py-3 px-4 border border-slate-200 text-slate-300 rounded-lg font-bold cursor-not-allowed">GitHub</button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACTO --- */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">¿Hablamos?</h2>
            <p className="text-slate-500">
              Selecciona el canal que prefieras. Respuesta rápida por WhatsApp.
            </p>
          </div>

          <div className="mb-8">
            <a 
              href="https://wa.me/593998171028?text=Hola%20David,%20vi%20tu%20portafolio%20y%20me%20interesa%20conversar." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all"
            >
              <span className="text-2xl">💬</span> Escribir al WhatsApp
            </a>
            <p className="text-center text-xs text-slate-400 mt-3 uppercase tracking-widest font-bold">O envíame un correo formal 👇</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tu Nombre</label>
              <input className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Nombre Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="ejemplo@correo.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Consulta</label>
              <textarea className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none h-32 transition" placeholder="Detalles de tu consulta..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required></textarea>
            </div>
            
            {/* --- BOTÓN DE ENVIAR CON ANIMACIÓN DE CARGA --- */}
            <button 
              type="submit"
              disabled={isSending} // Desactiva clic si está enviando
              className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2
                ${isSending 
                  ? 'bg-slate-400 cursor-not-allowed text-slate-200' // Estilo cargando
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl' // Estilo normal
                }`}
            >
              {isSending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Consulta Web"
              )}
            </button>

          </form>
        </div>
      </section>

      {/* --- MODAL DETALLES PROYECTO --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-up">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-slate-100 transition shadow-sm z-10">✕</button>
            <div className="h-64 w-full relative">
               <img src={selectedProject.image_url} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
               </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">{tag}</span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Descripción del Proyecto</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{selectedProject.description}</p>
              <div className="flex gap-4 pt-6 border-t border-slate-100">
                {selectedProject.repo_url && selectedProject.repo_url !== '#' && (
                  <a href={selectedProject.repo_url} target="_blank" className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold text-center hover:bg-slate-800">Ver en GitHub</a>
                )}
                <button onClick={() => setSelectedProject(null)} className="flex-1 border border-slate-300 text-slate-700 py-3 rounded-lg font-bold text-center hover:bg-slate-50">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE ÉXITO --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-scale-up border-2 border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Mensaje Enviado!</h3>
            <p className="text-slate-500 mb-6">Tu consulta ha sido registrada correctamente en el sistema.</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* COMPONENTE MODAL DE PERFIL */}
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        data={profileData} 
      />

      <footer className="bg-white border-t border-slate-200 py-10 text-center text-sm text-slate-500">
        © 2026 David. Desarrollado con React, Node & Postgres.
      </footer>
    </div>
  );
}

export default App;