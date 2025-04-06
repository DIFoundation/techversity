'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '@/data/courses';
import Button from '@/components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function CertificatePage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const certificateRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Load course data
    const courseData = courses.find(c => c.id === parseInt(params.courseId));
    if (!courseData) {
      router.push('/dashboard/student');
      return;
    }
    setCourse(courseData);

    // Verify course completion
    if (!parsedUser.certificates?.includes(parseInt(params.courseId))) {
      router.push(`/dashboard/student/courses/${params.courseId}/learn`);
      return;
    }
  }, [params.courseId, router]);

  const downloadCertificate = async () => {
    setLoading(true);
    try {
      const canvas = await html2canvas(certificateRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${course.title}-Certificate.pdf`);
    } catch (error) {
      console.error('Error generating certificate:', error);
    }
    setLoading(false);
  };

  if (!course || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Certificate Preview */}
        <div 
          ref={certificateRef}
          className="bg-white p-8 rounded-lg shadow-lg border-8 border-blue-600"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">Certificate of Completion</h1>
            <p className="text-xl mb-4">This is to certify that</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h2>
            <p className="text-xl mb-8">has successfully completed the course</p>
            <h3 className="text-2xl font-bold text-gray-800 mb-8">{course.title}</h3>
            <div className="mb-12">
              <p className="text-lg text-gray-600">Awarded on {new Date().toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center mt-16">
              <div className="text-center">
                <div className="w-40 h-0.5 bg-gray-800 mb-2"></div>
                <p className="text-gray-600">{course.instructor}</p>
                <p className="text-gray-600">Course Instructor</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-0.5 bg-gray-800 mb-2"></div>
                <p className="text-gray-600">Dr. John Smith</p>
                <p className="text-gray-600">Platform Director</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={downloadCertificate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            {loading ? 'Generating PDF...' : 'Download Certificate'}
          </Button>
        </div>
      </div>
    </div>
  );
}
