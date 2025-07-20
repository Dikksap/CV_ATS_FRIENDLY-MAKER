import React from 'react';
import { CVData } from '../types/cv';
import { Mail, Phone, Linkedin, Instagram, MapPin } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
  language: 'id' | 'en';
}

export default function CVPreview({ cvData, language }: CVPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (language === 'id') {
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                     'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
      return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const formatJobDescription = (description: string) => {
    if (!description) return [];
    
    // Split by lines and filter out empty lines
    const lines = description.split('\n').filter(line => line.trim());
    
    return lines.map(line => {
      const trimmed = line.trim();
      // If line doesn't start with bullet point, add one
      if (!trimmed.startsWith('•') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
        return `• ${trimmed}`;
      }
      // If it starts with - or *, convert to •
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return `• ${trimmed.substring(1).trim()}`;
      }
      return trimmed;
    });
  };

  return (
    <div className="w-full max-w-none mx-auto bg-white">
      <div 
        id="cv-preview" 
        className="bg-white shadow-lg mx-auto p-8 print:p-6 print:shadow-none break-inside-avoid" 
        style={{ 
          fontFamily: 'Times, serif',
          fontSize: '11pt',
          lineHeight: '1.3',
          width: '210mm',
          minHeight: '297mm',
          maxWidth: '210mm',
          margin: '0 auto',
          boxSizing: 'border-box',
          color: '#000000',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Header */}
        <div className="text-center mb-6 print:mb-4 break-inside-avoid">
          <h1 className="text-3xl print:text-2xl font-bold mb-3 print:mb-2 text-black" style={{ fontSize: '18pt', lineHeight: '1.2' }}>
            {cvData.personalInfo.fullName || 'Your Name'}
          </h1>
          
          {/* Contact Information with Icons */}
          <div className="text-gray-600 text-sm mb-4 print:mb-3" style={{ fontSize: '10pt' }}>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
              {cvData.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-gray-500" />
                  <span>{cvData.personalInfo.location}</span>
                </div>
              )}
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail size={12} className="text-gray-500" />
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone size={12} className="text-gray-500" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {cvData.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin size={12} className="text-gray-500" />
                  <span>{cvData.personalInfo.linkedin}</span>
                </div>
              )}
              {cvData.personalInfo.instagram && (
                <div className="flex items-center gap-1">
                  <Instagram size={12} className="text-gray-500" />
                  <span>{cvData.personalInfo.instagram}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        {cvData.personalInfo.summary && (
          <div className="mb-5 print:mb-4 break-inside-avoid">
            <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
              {language === 'id' ? 'RINGKASAN' : 'SUMMARY'}
            </h2>
            <p className="text-black leading-relaxed text-justify" style={{ fontSize: '10pt', lineHeight: '1.4' }}>
              {cvData.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {cvData.experiences.length > 0 && (
          <section className="mb-5 print:mb-4 break-inside-avoid">
            <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
              {language === 'id' ? 'PENGALAMAN' : 'EXPERIENCE'}
            </h2>
            <div className="space-y-4 print:space-y-3">
              {cvData.experiences.map((exp) => (
                <div key={exp.id} className="break-inside-avoid">
                  <div className="mb-2 print:mb-1">
                    <h3 className="font-bold text-black" style={{ fontSize: '11pt' }}>
                      {exp.jobTitle} • <span className="font-normal text-gray-600">{exp.company}</span>
                    </h3>
                    <div className="text-gray-600 text-sm mb-2 print:mb-1" style={{ fontSize: '9pt' }}>
                      {formatDate(exp.startDate)} - {exp.current ? (language === 'id' ? 'sekarang' : 'present') : formatDate(exp.endDate)}
                      {exp.location && ` | ${exp.location}`}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-black ml-0" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                      {formatJobDescription(exp.description).map((line, index) => (
                        <p key={index} className="mb-1 print:mb-0.5">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <section className="mb-5 print:mb-4 break-inside-avoid">
            <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
              {language === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}
            </h2>
            <div className="space-y-3 print:space-y-2">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="break-inside-avoid">
                  <h3 className="font-bold text-black" style={{ fontSize: '11pt' }}>{edu.institution}</h3>
                  <div className="text-black mb-2 print:mb-1" style={{ fontSize: '10pt' }}>
                    {edu.degree} • <span className="text-gray-600">{formatDate(edu.graduationDate)}</span>
                    {edu.gpa && (
                      <span className="ml-2">
                        • {language === 'id' ? 'IPK: ' : 'GPA: '}{edu.gpa}
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <div className="text-black" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                      <div className="font-medium mb-1" style={{ fontSize: '9pt' }}>
                        {language === 'id' ? 'Penghargaan:' : 'Awards:'}
                      </div>
                      {formatJobDescription(edu.description).map((line, index) => (
                        <p key={index} className="mb-1 print:mb-0.5">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Three Column Layout */}
        {cvData.skills.length > 0 && (
          <section className="mb-4 print:mb-3 break-inside-avoid">
            <div className="grid grid-cols-3 gap-6 print:gap-4">
              {/* Soft Skills */}
              {cvData.skills.filter(s => s.category === 'soft').length > 0 && (
                <div className="break-inside-avoid">
                  <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
                    {language === 'id' ? 'SOFT SKILLS' : 'SOFT SKILLS'}
                  </h2>
                  <ul className="space-y-0.5 print:space-y-0" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                    {cvData.skills.filter(s => s.category === 'soft').map((skill) => (
                      <li key={skill.id} className="text-black">• {skill.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Hard Skills */}
              {cvData.skills.filter(s => s.category === 'hard').length > 0 && (
                <div className="break-inside-avoid">
                  <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
                    {language === 'id' ? 'HARD SKILLS' : 'HARD SKILLS'}
                  </h2>
                  <ul className="space-y-0.5 print:space-y-0" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                    {cvData.skills.filter(s => s.category === 'hard').map((skill) => (
                      <li key={skill.id} className="text-black">• {skill.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Technical Skills / Languages */}
              {(cvData.skills.filter(s => s.category === 'technical').length > 0 || cvData.languages.length > 0) && (
                <div className="break-inside-avoid">
                  <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
                    {cvData.languages.length > 0 ? (language === 'id' ? 'BAHASA' : 'LANGUAGES') : (language === 'id' ? 'KEAHLIAN TEKNIS' : 'TECHNICAL SKILLS')}
                  </h2>
                  <ul className="space-y-0.5 print:space-y-0" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
                    {cvData.languages.length > 0 ? (
                      cvData.languages.map((lang, index) => (
                        <li key={index} className="text-black">• {lang}</li>
                      ))
                    ) : (
                      cvData.skills.filter(s => s.category === 'technical').map((skill) => (
                        <li key={skill.id} className="text-black">• {skill.name}</li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications */}
        {cvData.certifications.length > 0 && cvData.certifications.some(cert => cert.trim()) && (
          <section className="mb-4 print:mb-3 break-inside-avoid">
            <h2 className="text-lg print:text-base font-bold text-black mb-3 print:mb-2 border-b border-black pb-1" style={{ fontSize: '12pt' }}>
              {language === 'id' ? 'SERTIFIKASI' : 'CERTIFICATIONS'}
            </h2>
            <ul className="space-y-0.5 print:space-y-0" style={{ fontSize: '10pt', lineHeight: '1.3' }}>
              {cvData.certifications.filter(cert => cert.trim()).map((cert, index) => (
                <li key={index} className="text-black">• {cert}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}