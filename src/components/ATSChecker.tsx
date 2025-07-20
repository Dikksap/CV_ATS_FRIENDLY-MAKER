import React, { useEffect, useState } from 'react';
import { CVData, ATSScore } from '../types/cv';
import { calculateATSScore, getATSRecommendations } from '../utils/atsUtils';
import { CheckCircle, XCircle, AlertTriangle, Target, TrendingUp } from 'lucide-react';

interface ATSCheckerProps {
  cvData: CVData;
  language: 'id' | 'en';
}

export default function ATSChecker({ cvData, language }: ATSCheckerProps) {
  const [atsScore, setATSScore] = useState<ATSScore | null>(null);

  useEffect(() => {
    const score = calculateATSScore(cvData);
    setATSScore(score);
  }, [cvData]);

  if (!atsScore) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className={`${getScoreBackground(atsScore.score)} p-6 rounded-lg border`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {language === 'id' ? 'Skor Kompatibilitas ATS' : 'ATS Compatibility Score'}
          </h2>
          <div className={`text-4xl font-bold ${getScoreColor(atsScore.score)}`}>
            {atsScore.score}/100
          </div>
        </div>
        <p className={`text-lg font-medium ${getScoreColor(atsScore.score)}`}>
          {getATSRecommendations(atsScore.score, language)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              atsScore.score >= 90 ? 'bg-green-500' :
              atsScore.score >= 80 ? 'bg-blue-500' :
              atsScore.score >= 70 ? 'bg-yellow-500' :
              atsScore.score >= 60 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${atsScore.score}%` }}
          ></div>
        </div>
      </div>

      {/* Issues */}
      {atsScore.issues.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="text-red-600" size={24} />
            <h3 className="text-lg font-semibold text-red-800">
              {language === 'id' ? 'Masalah Ditemukan' : 'Issues Found'}
            </h3>
          </div>
          <ul className="space-y-2">
            {atsScore.issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-2 text-red-700">
                <XCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {atsScore.suggestions.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-600" size={24} />
            <h3 className="text-lg font-semibold text-yellow-800">
              {language === 'id' ? 'Saran Perbaikan' : 'Improvement Suggestions'}
            </h3>
          </div>
          <ul className="space-y-2">
            {atsScore.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-yellow-700">
                <TrendingUp size={16} className="mt-0.5 flex-shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Present Keywords */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-green-800">
              {language === 'id' ? 'Kata Kunci Ditemukan' : 'Keywords Found'}
            </h3>
          </div>
          {atsScore.keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {atsScore.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-green-700">
              {language === 'id' ? 'Tidak ada kata kunci umum yang ditemukan. Pertimbangkan untuk menambahkan lebih banyak istilah industri yang relevan.' : 'No common keywords found. Consider adding more relevant industry terms.'}
            </p>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-blue-800">
              {language === 'id' ? 'Kata Kunci yang Disarankan' : 'Suggested Keywords'}
            </h3>
          </div>
          {atsScore.missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {atsScore.missingKeywords.slice(0, 10).map((keyword, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-blue-700">
              {language === 'id' ? 'Bagus! Anda menggunakan banyak kata kunci yang relevan.' : 'Great! You\'re using many relevant keywords.'}
            </p>
          )}
        </div>
      </div>

      {/* ATS Tips */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {language === 'id' ? 'Tips Optimisasi ATS' : 'ATS Optimization Tips'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {language === 'id' ? 'Praktik Terbaik Format:' : 'Formatting Best Practices:'}
            </h4>
            <ul className="space-y-1">
              <li>• {language === 'id' ? 'Gunakan judul bagian standar (Pengalaman, Pendidikan, Keahlian)' : 'Use standard section headings (Experience, Education, Skills)'}</li>
              <li>• {language === 'id' ? 'Hindari tabel, gambar, dan format yang kompleks' : 'Avoid tables, images, and complex formatting'}</li>
              <li>• {language === 'id' ? 'Gunakan bullet points untuk pencapaian' : 'Use bullet points for achievements'}</li>
              <li>• {language === 'id' ? 'Sertakan tanggal dalam format MM/YYYY' : 'Include dates in MM/YYYY format'}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {language === 'id' ? 'Praktik Terbaik Konten:' : 'Content Best Practices:'}
            </h4>
            <ul className="space-y-1">
              <li>• {language === 'id' ? 'Sertakan kata kunci yang relevan dari deskripsi pekerjaan' : 'Include relevant keywords from job descriptions'}</li>
              <li>• {language === 'id' ? 'Kuantifikasi pencapaian dengan angka' : 'Quantify achievements with numbers'}</li>
              <li>• {language === 'id' ? 'Gunakan kata kerja aksi (mengelola, mengembangkan, meningkatkan)' : 'Use action verbs (managed, developed, improved)'}</li>
              <li>• {language === 'id' ? 'Jaga deskripsi pekerjaan tetap ringkas namun detail' : 'Keep job descriptions concise but detailed'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}