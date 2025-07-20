import html2pdf from 'html2pdf.js';

export function downloadAsPDF(elementId: string, filename: string = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found');
    return;
  }

  // Configure options for better PDF generation
  const options = {
    margin: [10, 10, 10, 10], // 10mm margins
    filename: filename,
    image: { 
      type: 'jpeg', 
      quality: 0.98 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['.break-inside-avoid', '.no-break']
    }
  };

  // Generate PDF directly from the element without cloning
  html2pdf()
    .set(options)
    .from(element)
    .save()
    .catch((error) => {
      console.error('PDF generation failed:', error);
      
      // Fallback: try with simpler options
      const fallbackOptions = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf()
        .set(fallbackOptions)
        .from(element)
        .save()
        .catch((fallbackError) => {
          console.error('Fallback PDF generation also failed:', fallbackError);
          alert('PDF generation failed. Please try again or check your browser compatibility.');
        });
    });
}