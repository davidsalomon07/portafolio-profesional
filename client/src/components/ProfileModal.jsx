import React from 'react';
import './ProfileModal.css'; // Ahora creamos este CSS

const ProfileModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <header className="modal-header">
          <h2>Sobre Mí</h2>
          <p className="modal-subtitle">{data.title}</p>
        </header>

        <div className="modal-body">
          <section className="bio-section">
            <p>{data.bio}</p>
          </section>

          <hr />

          <section className="services-section">
            <h3>Lo que hago</h3>
            <div className="services-grid">
              {data.services.map((service, index) => (
                <div key={index} className="service-card">
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tech-section">
            <h3>Stack Tecnológico</h3>
            <div className="tech-tags">
              {data.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;