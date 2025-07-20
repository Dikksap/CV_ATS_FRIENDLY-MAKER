import { CVData, ATSScore } from '../types/cv';

const commonATSKeywords = [
  'leadership', 'management', 'communication', 'teamwork', 'problem-solving',
  'analytical', 'strategic', 'innovative', 'results-driven', 'collaboration',
  'project management', 'data analysis', 'customer service', 'sales',
  'marketing', 'research', 'development', 'software', 'technical',
  'certification', 'training', 'optimization', 'implementation'
];

const industryKeywords = {
  technology: ['programming', 'software development', 'coding', 'algorithms', 'debugging', 'api', 'database', 'cloud', 'agile', 'scrum'],
  marketing: ['seo', 'sem', 'social media', 'content marketing', 'brand management', 'campaign', 'analytics', 'conversion', 'roi'],
  finance: ['financial analysis', 'budgeting', 'forecasting', 'risk management', 'compliance', 'audit', 'accounting', 'investment'],
  healthcare: ['patient care', 'medical', 'clinical', 'healthcare', 'treatment', 'diagnosis', 'therapy', 'medical records'],
  education: ['curriculum', 'teaching', 'training', 'assessment', 'educational', 'learning', 'instruction', 'classroom management']
};

export function calculateATSScore(cvData: CVData): ATSScore {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const keywords: string[] = [];
  const missingKeywords: string[] = [];
  
  let score = 100;
  
  // Check personal info completeness
  if (!cvData.personalInfo.fullName) {
    issues.push('Missing full name');
    score -= 10;
  }
  if (!cvData.personalInfo.email) {
    issues.push('Missing email address');
    score -= 10;
  }
  if (!cvData.personalInfo.phone) {
    issues.push('Missing phone number');
    score -= 5;
  }
  
  // Check summary
  if (!cvData.personalInfo.summary) {
    issues.push('Missing professional summary');
    suggestions.push('Add a professional summary to highlight your key qualifications');
    score -= 15;
  } else if (cvData.personalInfo.summary.length < 50) {
    issues.push('Professional summary too short');
    suggestions.push('Expand your professional summary to 2-3 sentences');
    score -= 10;
  }
  
  // Check experience section
  if (cvData.experiences.length === 0) {
    issues.push('No work experience listed');
    score -= 25;
  } else {
    cvData.experiences.forEach(exp => {
      if (!exp.description || exp.description.length < 50) {
        issues.push(`Job description too short for ${exp.jobTitle}`);
        suggestions.push('Add detailed bullet points describing your achievements and responsibilities');
        score -= 5;
      }
    });
  }
  
  // Check education
  if (cvData.education.length === 0) {
    suggestions.push('Consider adding your educational background');
    score -= 5;
  }
  
  // Check skills
  if (cvData.skills.length < 5) {
    suggestions.push('Add more relevant skills to improve keyword matching');
    score -= 10;
  }
  
  // Extract keywords from CV
  const allText = `
    ${cvData.personalInfo.summary}
    ${cvData.experiences.map(exp => `${exp.jobTitle} ${exp.description}`).join(' ')}
    ${cvData.skills.map(skill => skill.name).join(' ')}
    ${cvData.certifications.join(' ')}
  `.toLowerCase();
  
  // Find present keywords
  commonATSKeywords.forEach(keyword => {
    if (allText.includes(keyword.toLowerCase())) {
      keywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });
  
  // Keyword density scoring
  if (keywords.length < 5) {
    suggestions.push('Include more industry-relevant keywords in your experience descriptions');
    score -= 15;
  }
  
  // Format checks
  if (cvData.experiences.some(exp => !exp.startDate || !exp.endDate)) {
    issues.push('Missing employment dates');
    suggestions.push('Include start and end dates for all positions');
    score -= 10;
  }
  
  // Length check
  const totalLength = allText.length;
  if (totalLength < 500) {
    issues.push('CV content too brief');
    suggestions.push('Expand your CV with more detailed descriptions');
    score -= 10;
  }
  
  return {
    score: Math.max(0, score),
    issues,
    suggestions,
    keywords,
    missingKeywords: missingKeywords.slice(0, 10) // Limit to top 10
  };
}

export function getATSRecommendations(score: number, language: 'id' | 'en' = 'en'): string {
  if (language === 'id') {
    if (score >= 90) return 'Kompatibilitas ATS sangat baik!';
    if (score >= 80) return 'Kompatibilitas ATS baik dengan sedikit perbaikan diperlukan';
    if (score >= 70) return 'Kompatibilitas ATS cukup - beberapa perbaikan disarankan';
    if (score >= 60) return 'Kompatibilitas ATS buruk - perbaikan signifikan diperlukan';
    return 'Kompatibilitas ATS sangat buruk - revisi besar diperlukan';
  }
  
  if (score >= 90) return 'Excellent ATS compatibility!';
  if (score >= 80) return 'Good ATS compatibility with minor improvements needed';
  if (score >= 70) return 'Fair ATS compatibility - several improvements recommended';
  if (score >= 60) return 'Poor ATS compatibility - significant improvements needed';
  return 'Very poor ATS compatibility - major revisions required';
}