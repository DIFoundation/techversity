'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '@/data/courses';
import Button from '@/components/ui/button';
import { useCurrency } from '@/contexts/currency-context';
import { FaCreditCard, FaPaypal, FaStripe } from 'react-icons/fa';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const { formatPrice } = useCurrency();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Load course data
    const courseData = courses.find(c => c.id === parseInt(params.courseId));
    if (!courseData) {
      router.push('/courses');
      return;
    }
    setCourse(courseData);
  }, [params.courseId, router]);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user's enrolled courses in localStorage
      const updatedUser = {
        ...user,
        enrolledCourses: [...(user.enrolledCourses || []), parseInt(params.courseId)]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // After successful payment, redirect to the learning page
      router.push(`/dashboard/student/courses/${params.courseId}/learn`);
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  if (!course || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
            
            {/* Course Summary */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-gray-600">{course.instructor}</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">{formatPrice(course.price)}</p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg flex items-center space-x-3
                    ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                >
                  <FaCreditCard className="w-6 h-6 text-gray-600" />
                  <span>Credit Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-4 border rounded-lg flex items-center space-x-3
                    ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                >
                  <FaPaypal className="w-6 h-6 text-gray-600" />
                  <span>PayPal</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-4 border rounded-lg flex items-center space-x-3
                    ${paymentMethod === 'stripe' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                >
                  <FaStripe className="w-6 h-6 text-gray-600" />
                  <span>Stripe</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePayment}>
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(course.price)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  By completing your purchase you agree to our Terms of Service and Privacy Policy
                </p>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  {loading ? 'Processing...' : `Pay ${formatPrice(course.price)}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
