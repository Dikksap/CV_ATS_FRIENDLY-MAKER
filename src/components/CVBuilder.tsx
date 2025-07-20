import React, { useState } from 'react';
import { CVData, PersonalInfo, Experience, Education, Skill } from '../types/cv';
import { Plus, Trash2 } from 'lucide-react';

interface CVBuilderProps {
  cvData: CVData;
  setCVData: (data: CVData) => void;
  language: 'id' | 'en';
}

export default function CVBuilder({ cvData, setCVData, language }: CVBuilderProps) {
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setCVData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setCVData({ ...cvData, experiences: [...cvData.experiences, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setCVData({
      ...cvData,
      experiences: cvData.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setCVData({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      description: ''
    };
    setCVData({ ...cvData, education: [...cvData.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setCVData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'technical'
    };
    setCVData({ ...cvData, skills: [...cvData.skills, newSkill] });
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | undefined) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    });
  };

  const removeSkill = (id: string) => {
    setCVData({
      ...cvData,
      skills: cvData.skills.filter(skill => skill.id !== id)
    });
  };

  const skillSuggestions = {
    technical: [
      ...(language === 'id' ? [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'Git',
        'Microsoft Excel', 'Microsoft Word', 'PowerPoint', 'Google Sheets', 'SAP',
        'Oracle', 'MySQL', 'Tableau', 'Power BI', 'AutoCAD', 'Photoshop'
      ] : [
        'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'SQL', 'HTML/CSS', 'Git',
        'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'TypeScript', 'Vue.js',
        'Angular', 'PHP', 'C++', 'C#', '.NET', 'Spring Boot', 'Django', 'Flask',
        'REST APIs', 'GraphQL', 'Jenkins', 'CI/CD', 'Linux', 'Bash', 'PowerShell'
      ])
    ],
    hard: [
      ...(language === 'id' ? [
        'Analisis Keuangan', 'Manajemen Proyek', 'Analisis Data', 'Manajemen Anggaran',
        'Audit Internal', 'Manajemen Risiko', 'Akuntansi', 'Perencanaan Keuangan',
        'Analisis Kredit', 'Manajemen Kas', 'Perpajakan', 'Compliance', 'Pemasaran',
        'Penjualan', 'Layanan Pelanggan', 'Negosiasi', 'Presentasi', 'Pelatihan',
        'Rekrutmen', 'Manajemen SDM', 'Operasional', 'Logistik', 'Procurement'
      ] : [
        'Project Management', 'Data Analysis', 'Financial Analysis', 'Budget Management',
        'Quality Assurance', 'Risk Assessment', 'Compliance', 'Audit', 'Accounting',
        'Sales', 'Marketing', 'SEO', 'SEM', 'Content Marketing', 'Social Media Marketing',
        'Digital Marketing', 'Email Marketing', 'CRM', 'ERP', 'Salesforce', 'HubSpot',
        'Google Analytics', 'Adobe Creative Suite', 'Microsoft Office', 'Excel Advanced',
        'PowerBI', 'Tableau', 'JIRA', 'Confluence', 'Slack'
      ])
    ],
    soft: [
      ...(language === 'id' ? [
        'Komunikasi', 'Kepemimpinan', 'Kerja Tim', 'Pemecahan Masalah', 'Berpikir Kritis',
        'Manajemen Waktu', 'Adaptabilitas', 'Kreativitas', 'Perhatian Detail',
        'Layanan Pelanggan', 'Negosiasi', 'Presentasi', 'Berbicara di Depan Umum',
        'Resolusi Konflik', 'Pengambilan Keputusan', 'Kecerdasan Emosional',
        'Kolaborasi', 'Mentoring', 'Pelatihan', 'Coaching', 'Berpikir Strategis',
        'Inovasi', 'Berpikir Analitis', 'Organisasi', 'Multitasking'
      ] : [
        'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
        'Time Management', 'Adaptability', 'Creativity', 'Attention to Detail',
        'Customer Service', 'Negotiation', 'Presentation', 'Public Speaking',
        'Conflict Resolution', 'Decision Making', 'Emotional Intelligence',
        'Collaboration', 'Mentoring', 'Training', 'Coaching', 'Strategic Thinking',
        'Innovation', 'Analytical Thinking', 'Organization', 'Multitasking'
      ])
    ]
  };

  const addSuggestedSkill = (skillName: string, category: 'technical' | 'hard' | 'soft') => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      level: 'Intermediate',
      category: category
    };
    setCVData({ ...cvData, skills: [...cvData.skills, newSkill] });
  };

  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getFilteredSuggestions = (category: 'technical' | 'hard' | 'soft') => {
    if (!skillSearchTerm) return [];
    return skillSuggestions[category].filter(skill => 
      skill.toLowerCase().includes(skillSearchTerm.toLowerCase()) &&
      !cvData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
    ).slice(0, 5);
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'id' ? 'Informasi Pribadi' : 'Personal Information'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
            </label>
            <input
              type="text"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? 'Ronald Gunawan' : 'John Doe'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={cvData.personalInfo.email}
              onChange={(e) => updatePersonalInfo('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? 'ronald_gunawan@yahoo.com' : 'john@example.com'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'id' ? 'Telepon' : 'Phone'}
            </label>
            <input
              type="tel"
              value={cvData.personalInfo.phone}
              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? '+62 812-3456-7890' : '+1 (555) 123-4567'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'id' ? 'Lokasi' : 'Location'}
            </label>
            <input
              type="text"
              value={cvData.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? 'Jakarta, Indonesia' : 'New York, NY'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="url"
              value={cvData.personalInfo.linkedin}
              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? 'linkedin.com/in/ronaldgunawan' : 'linkedin.com/in/johndoe'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
            <input
              type="url"
              value={cvData.personalInfo.instagram}
              onChange={(e) => updatePersonalInfo('instagram', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? '@ronaldgunawan' : '@johndoe'}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'id' ? 'Ringkasan Profesional' : 'Professional Summary'}
          </label>
          <textarea
            value={cvData.personalInfo.summary}
            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={language === 'id' 
              ? 'Mahasiswa Universitas Trisakti semester 7 dengan pengalaman magang sebagai analis kredit. Memiliki keahlian analisa dan komunikasi yang baik. Berdedikasi untuk mengembangkan kemampuan sebagai internal audit di PT Indofood.'
              : 'Experienced professional with strong analytical and communication skills. Dedicated to developing expertise in internal audit and financial analysis.'}
          />
        </div>
      </section>

      {/* Experience */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'}
          </h2>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {language === 'id' ? 'Tambah Pengalaman' : 'Add Experience'}
          </button>
        </div>
        <div className="space-y-6">
          {cvData.experiences.map((exp) => (
            <div key={exp.id} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-gray-800">
                  {language === 'id' ? 'Posisi' : 'Position'} {cvData.experiences.indexOf(exp) + 1}
                </h3>
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Jabatan' : 'Job Title'}
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Staff Magang Analisis Kredit' : 'Software Engineer'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Perusahaan' : 'Company'}
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Bank Central Asia (BCA)' : 'Tech Corp'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Lokasi' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Jakarta, Indonesia' : 'San Francisco, CA'}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'id' ? 'Tanggal Mulai' : 'Start Date'}
                    </label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'id' ? 'Tanggal Selesai' : 'End Date'}
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={exp.current}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="rounded"
                  />
                  {language === 'id' ? 'Saat ini bekerja di sini' : 'Currently employed here'}
                </label>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'id' ? 'Deskripsi Pekerjaan' : 'Job Description'}
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'id' 
                    ? `Mengumpulkan informasi serta melakukan wawancara kepada 30+ calon peminjam
Mengevaluasi rasio-rasio keuangan dengan menggunakan alat analis kredit
Membantu pengecekan kelengkapan serta kelayakan dokumen dari 50+ calon peminjam
Melakukan analisis kredit terperinci dengan memeriksa laporan keuangan, neraca, laporan laba rugi, dan arus kas calon peminjam

Catatan: Bullet points akan ditambahkan secara otomatis`
                    : `Developed and maintained web applications using React and Node.js
Collaborated with cross-functional teams to deliver high-quality software solutions
Implemented automated testing procedures that reduced bugs by 30%
Mentored junior developers and conducted code reviews

Note: Bullet points will be added automatically`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'id' ? 'Pendidikan' : 'Education'}
          </h2>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {language === 'id' ? 'Tambah Pendidikan' : 'Add Education'}
          </button>
        </div>
        <div className="space-y-6">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 p-4 rounded-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-gray-800">
                  {language === 'id' ? 'Pendidikan' : 'Education'} {cvData.education.indexOf(edu) + 1}
                </h3>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Gelar' : 'Degree'}
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'S1 Manajemen Keuangan' : 'Bachelor of Science in Computer Science'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Institusi' : 'Institution'}
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Universitas Trisakti' : 'University of California'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Lokasi' : 'Location'}
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Jakarta, Indonesia' : 'Berkeley, CA'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Tanggal Lulus' : 'Graduation Date'}
                  </label>
                  <input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'IPK' : 'GPA'}
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="3.8"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'id' ? 'Deskripsi (Opsional)' : 'Description (Optional)'}
                </label>
                <textarea
                  value={edu.description || ''}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={language === 'id' 
                    ? 'Penerima beasiswa Universitas Trisakti periode September 2022 - Juli 2023\nFinalist National English Speech Competition 2021'
                    : 'Dean\'s List for 3 consecutive semesters\nPresident of Student Finance Club'}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white p-6 rounded-lg shadow-sm border overflow-visible">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'id' ? 'Keahlian' : 'Skills'}
          </h2>
          <button
            onClick={addSkill}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {language === 'id' ? 'Tambah Keahlian' : 'Add Skill'}
          </button>
        </div>
        
        {/* Dynamic Skill Search */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg relative">
          <h3 className="font-medium text-gray-800 mb-3">
            {language === 'id' ? 'Cari Keahlian (Ketik untuk mencari):' : 'Search Skills (Type to search):'}
          </h3>
          <div className="relative">
            <input
              type="text"
              value={skillSearchTerm}
              onChange={(e) => {
                setSkillSearchTerm(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onFocus={() => setShowSuggestions(skillSearchTerm.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={language === 'id' ? 'Ketik nama keahlian...' : 'Type skill name...'}
            />
            
            {showSuggestions && skillSearchTerm && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {['technical', 'hard', 'soft'].map(category => {
                  const suggestions = getFilteredSuggestions(category as 'technical' | 'hard' | 'soft');
                  if (suggestions.length === 0) return null;
                  
                  return (
                    <div key={category} className="p-2">
                      <h4 className="text-xs font-medium text-gray-600 mb-1">
                        {language === 'id' 
                          ? (category === 'technical' ? 'Teknis' : category === 'hard' ? 'Hard Skills' : 'Soft Skills')
                          : (category === 'technical' ? 'Technical' : category === 'hard' ? 'Hard Skills' : 'Soft Skills')
                        }
                      </h4>
                      {suggestions.map(skill => (
                        <button
                          key={skill}
                          onClick={() => {
                            addSuggestedSkill(skill, category as 'technical' | 'hard' | 'soft');
                            setSkillSearchTerm('');
                            setShowSuggestions(false);
                          }}
                          className="block w-full text-left px-2 py-1 text-sm hover:bg-blue-50 rounded"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  );
                })}
                {getFilteredSuggestions('technical').length === 0 && 
                 getFilteredSuggestions('hard').length === 0 && 
                 getFilteredSuggestions('soft').length === 0 && (
                  <div className="p-3 text-sm text-gray-500">
                    {language === 'id' ? 'Tidak ada keahlian yang ditemukan' : 'No skills found'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Skill Suggestions */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-3">
            {language === 'id' ? 'Keahlian Populer (Klik untuk menambah):' : 'Popular Skills (Click to add):'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {language === 'id' ? 'Keahlian Teknis:' : 'Technical Skills:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.technical.slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSuggestedSkill(skill, 'technical')}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    disabled={cvData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Hard Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.hard.slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSuggestedSkill(skill, 'hard')}
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                    disabled={cvData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Soft Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.soft.slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => addSuggestedSkill(skill, 'soft')}
                    className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
                    disabled={cvData.skills.some(s => s.name.toLowerCase() === skill.toLowerCase())}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cvData.skills.map((skill) => (
            <div key={skill.id} className="border border-gray-200 p-4 rounded-md relative">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">
                  {language === 'id' ? 'Keahlian' : 'Skill'}
                </h3>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Nama Keahlian' : 'Skill Name'}
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={language === 'id' ? 'Perencanaan Keuangan' : 'Financial Planning'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Kategori' : 'Category'}
                  </label>
                  <select
                    value={skill.category || 'technical'}
                    onChange={(e) => updateSkill(skill.id, 'category', e.target.value as 'technical' | 'hard' | 'soft')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="technical">
                      {language === 'id' ? 'Keahlian Teknis' : 'Technical Skills'}
                    </option>
                    <option value="hard">Hard Skills</option>
                    <option value="soft">Soft Skills</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {language === 'id' ? 'Tingkat' : 'Level'}
                  </label>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">
                      {language === 'id' ? 'Pemula' : 'Beginner'}
                    </option>
                    <option value="Intermediate">
                      {language === 'id' ? 'Menengah' : 'Intermediate'}
                    </option>
                    <option value="Advanced">
                      {language === 'id' ? 'Lanjutan' : 'Advanced'}
                    </option>
                    <option value="Expert">
                      {language === 'id' ? 'Ahli' : 'Expert'}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'id' ? 'Sertifikasi' : 'Certifications'}
          </h2>
          <button
            onClick={() => setCVData({ ...cvData, certifications: [...cvData.certifications, ''] })}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {language === 'id' ? 'Tambah Sertifikasi' : 'Add Certification'}
          </button>
        </div>
        <div className="space-y-3">
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={cert}
                onChange={(e) => {
                  const newCerts = [...cvData.certifications];
                  newCerts[index] = e.target.value;
                  setCVData({ ...cvData, certifications: newCerts });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'id' ? 'Nama sertifikasi' : 'Certification name'}
              />
              <button
                onClick={() => {
                  const newCerts = cvData.certifications.filter((_, i) => i !== index);
                  setCVData({ ...cvData, certifications: newCerts });
                }}
                className="text-red-600 hover:text-red-700 transition-colors p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {language === 'id' ? 'Bahasa' : 'Languages'}
          </h2>
          <button
            onClick={() => setCVData({ ...cvData, languages: [...cvData.languages, ''] })}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            {language === 'id' ? 'Tambah Bahasa' : 'Add Language'}
          </button>
        </div>
        <div className="space-y-3">
          {cvData.languages.map((lang, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={lang}
                onChange={(e) => {
                  const newLangs = [...cvData.languages];
                  newLangs[index] = e.target.value;
                  setCVData({ ...cvData, languages: newLangs });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={language === 'id' ? 'Bahasa Indonesia (Native)' : 'English (Fluent)'}
              />
              <button
                onClick={() => {
                  const newLangs = cvData.languages.filter((_, i) => i !== index);
                  setCVData({ ...cvData, languages: newLangs });
                }}
                className="text-red-600 hover:text-red-700 transition-colors p-2"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}