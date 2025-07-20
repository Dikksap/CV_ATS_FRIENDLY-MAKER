import React, { useState } from 'react';
import { CVData } from './types/cv';
import CVBuilder from './components/CVBuilder';
import CVPreview from './components/CVPreview';
import ATSChecker from './components/ATSChecker';
import { downloadAsPDF } from './utils/pdfUtils';
import { FileText, CheckCircle, Download, Eye, Edit3, Globe, Zap } from 'lucide-react';

const initialCVData: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    instagram: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  languages: []
};

const dummyData: CVData = {
  personalInfo: {
    fullName: 'Ronald Gunawan',
    email: 'ronald.gunawan@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta, Indonesia',
    linkedin: 'linkedin.com/in/ronaldgunawan',
    instagram: '@ronaldgunawan',
    summary: 'Mahasiswa Universitas Trisakti semester 7 dengan pengalaman magang sebagai analis kredit di Bank Central Asia. Memiliki keahlian analisa keuangan dan komunikasi yang baik. Berdedikasi untuk mengembangkan kemampuan sebagai internal audit dan berkontribusi pada pertumbuhan perusahaan.'
  },
  experiences: [
    {
      id: '1',
      jobTitle: 'Staff Magang Analisis Kredit',
      company: 'Bank Central Asia (BCA)',
      location: 'Jakarta, Indonesia',
      startDate: '2024-06',
      endDate: '2024-08',
      current: false,
      description: 'Mengumpulkan informasi serta melakukan wawancara kepada 30+ calon peminjam\nMengevaluasi rasio-rasio keuangan dengan menggunakan alat analisis kredit\nMembantu pengecekan kelengkapan serta kelayakan dokumen dari 50+ calon peminjam\nMelakukan analisis kredit terperinci dengan memeriksa laporan keuangan, neraca, laporan laba rugi, dan arus kas calon peminjam'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'S1 Manajemen Keuangan',
      institution: 'Universitas Trisakti',
      location: 'Jakarta, Indonesia',
      graduationDate: '2025-07',
      gpa: '3.75',
      description: 'Penerima beasiswa Universitas Trisakti periode September 2022 - Juli 2023\nFinalist National English Speech Competition 2021\nAktif dalam organisasi kemahasiswaan sebagai Bendahara Himpunan Mahasiswa'
    }
  ],
  skills: [
    { id: '1', name: 'Analisis Keuangan', level: 'Advanced', category: 'hard' },
    { id: '2', name: 'Microsoft Excel', level: 'Advanced', category: 'technical' },
    { id: '3', name: 'Komunikasi', level: 'Advanced', category: 'soft' },
    { id: '4', name: 'Manajemen Waktu', level: 'Advanced', category: 'soft' },
    { id: '5', name: 'Analisis Data', level: 'Intermediate', category: 'hard' },
    { id: '6', name: 'PowerPoint', level: 'Advanced', category: 'technical' },
    { id: '7', name: 'Kerja Tim', level: 'Advanced', category: 'soft' },
    { id: '8', name: 'Pemecahan Masalah', level: 'Advanced', category: 'soft' }
  ],
  certifications: [
    'Sertifikat Analisis Kredit - Bank Indonesia',
    'Microsoft Office Specialist - Excel Expert',
    'Sertifikat Manajemen Risiko Keuangan'
  ],
  languages: [
    'Bahasa Indonesia (Native)',
    'English (Fluent)',
    'Mandarin (Basic)'
  ]
};
const translations = {
  id: {
    title: 'Pembuat CV ATS',
    subtitle: 'Buat dan optimalkan resume Anda untuk sistem ATS',
    buildCV: 'Buat CV',
    preview: 'Pratinjau',
    atsCheck: 'Cek ATS',
    downloadPDF: 'Unduh PDF'
  },
  en: {
    title: 'CV ATS Maker',
    subtitle: 'Build and optimize your resume for ATS systems',
    buildCV: 'Build CV',
    preview: 'Preview',
    atsCheck: 'ATS Check',
    downloadPDF: 'Download PDF'
  }
};

function App() {
  const [cvData, setCVData] = useState<CVData>(initialCVData);
  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'ats'>('builder');
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  const t = translations[language];

  const handleDownloadPDF = () => {
    downloadAsPDF('cv-preview', `${cvData.personalInfo.fullName || 'resume'}.pdf`);
  };

  const fillDummyData = () => {
    setCVData(dummyData);
  };
  const tabs = [
    { id: 'builder', label: t.buildCV, icon: Edit3 },
    { id: 'preview', label: t.preview, icon: Eye },
    { id: 'ats', label: t.atsCheck, icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Globe size={18} />
                {language === 'id' ? 'EN' : 'ID'}
              </button>
            <button
              onClick={fillDummyData}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Zap size={18} />
              {language === 'id' ? 'Isi Data Contoh' : 'Fill Sample Data'}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Download size={20} />
              {t.downloadPDF}
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={activeTab === 'builder' ? '' : 'hidden'}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'id' ? 'Buat CV Anda' : 'Build Your CV'}
            </h2>
            <p className="text-gray-600">
              {language === 'id' 
                ? 'Isi informasi Anda untuk membuat resume profesional yang dioptimalkan untuk ATS.' 
                : 'Fill in your information to create a professional, ATS-optimized resume.'}
            </p>
          </div>
          <CVBuilder cvData={cvData} setCVData={setCVData} language={language} />
        </div>

        <div className={activeTab === 'preview' ? '' : 'hidden'}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'id' ? 'Pratinjau CV' : 'CV Preview'}
            </h2>
            <p className="text-gray-600">
              {language === 'id' 
                ? 'Pratinjau bagaimana CV Anda akan terlihat saat diunduh sebagai PDF.' 
                : 'Preview how your CV will look when downloaded as PDF.'}
            </p>
          </div>
          <CVPreview cvData={cvData} language={language} />
        </div>

        <div className={activeTab === 'ats' ? '' : 'hidden'}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {language === 'id' ? 'Cek Kompatibilitas ATS' : 'ATS Compatibility Check'}
            </h2>
            <p className="text-gray-600">
              {language === 'id' 
                ? 'Analisis CV Anda untuk kompatibilitas ATS dan dapatkan saran optimisasi.' 
                : 'Analyze your CV for ATS compatibility and get optimization suggestions.'}
            </p>
          </div>
          <ATSChecker cvData={cvData} language={language} />
        </div>
      </main>

      {/* Footer */}
    <footer className="bg-white border-t mt-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center text-gray-600">
      <p className="mb-2">
        {language === 'id' 
          ? 'CV ATS Checker - Buat resume profesional yang dioptimalkan untuk ATS' 
          : 'CV ATS Checker - Build professional, ATS-optimized resumes'}
      </p>
      <p className="text-sm">
        {language === 'id' 
          ? 'Optimalkan resume Anda untuk Sistem Pelacakan Pelamar dan tingkatkan peluang Anda mendapatkan wawancara.' 
          : 'Optimize your resume for Applicant Tracking Systems and increase your chances of landing interviews.'}
      </p>

      {/* ===== BAGIAN BARU DENGAN IKON ===== */}
      <div className="mt-6 border-t pt-6">
        <div className="flex justify-center items-center space-x-6">
          
          {/* Info Pembuat dengan Ikon User */}
          <div className="flex items-center space-x-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>
              {language === 'id' ? 'Dibuat oleh Dika Hidayat Saputra' : 'Created by Dika Hidayat Saputra'}
            </span>
          </div>

          {/* Info Instagram dengan Ikon Instagram */}
          <a href="https://www.instagram.com/dikksap" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.153 0-3.51.012-4.739.068-2.695.123-3.993 1.42-4.116 4.116-.056 1.229-.068 1.586-.068 4.739s.012 3.51.068 4.739c.123 2.695 1.42 3.993 4.116 4.116 1.229.056 1.586.068 4.739.068s3.51-.012 4.739-.068c2.695-.123 3.993-1.42 4.116-4.116.056-1.229.068-1.586.068-4.739s-.012-3.51-.068-4.739c-.123-2.695-1.42-3.993-4.116-4.116-1.229-.056-1.586-.068-4.739-.068zm0 4.486c-2.42 0-4.379 1.96-4.379 4.379s1.96 4.379 4.379 4.379 4.379-1.96 4.379-4.379-1.96-4.379-4.379-4.379zm0 7.161c-1.533 0-2.782-1.249-2.782-2.782s1.249-2.782 2.782-2.782 2.782 1.249 2.782 2.782-1.249 2.782-2.782 2.782zm4.965-7.727c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25z"/>
            </svg>
            <span>@dikksap</span>
          </a>

        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;