// src/ContactForm.tsx
import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

function ContactForm() {
  // Маягтын төлөвийн хувьсагчууд
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Маягт илгээх функц
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('Зурвас илгээж байна...');

    try {
      // Энд таны Firebase Cloud Function-ийн URL-ийг оруулна
      // Deploy хийсний дараа энэ URL-ийг солих хэрэгтэй
      const functionUrl = 'https://us-central1-bolt-test-1df74.cloudfunctions.net/sendContactEmail';
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage('Зурвас амжилттай илгээгдлээ! Удахгүй хариулах болно.');
        // Маягтыг цэвэрлэх
        setName('');
        setEmail('');
        setMessage('');
        
        // 5 секундын дараа статусыг арилгах
        setTimeout(() => {
          setStatus('idle');
          setStatusMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Зурвас илгээхэд алдаа гарлаа.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
      console.error('Fetch алдаа:', error);
    }
  };

  // Статусын өнгө тодорхойлох функц
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'loading': return 'text-blue-600';
      default: return '';
    }
  };

  // Статусын икон тодорхойлох функц
  const getStatusIcon = () => {
    switch (status) {
      case 'success': return <CheckCircle size={20} className="text-green-600" />;
      case 'error': return <AlertCircle size={20} className="text-red-600" />;
      case 'loading': return <Loader2 size={20} className="text-blue-600 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      {/* Гарчиг */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Холбоо барих</h2>
        <p className="text-gray-600">Танай санал хүсэлтийг сонсохдоо таатай байна</p>
      </div>

      {/* Маягт */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Нэрний талбар */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Нэр <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Таны нэрийг оруулна уу"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>

        {/* И-мэйлний талбар */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            И-мэйл хаяг <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>

        {/* Зурвасны талбар */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Зурвас <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
            placeholder="Танай зурвасыг энд бичнэ үү..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>

        {/* Илгээх товч */}
        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            status === 'loading'
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
          {status === 'loading' ? 'Илгээж байна...' : 'Зурвас илгээх'}
        </button>
      </form>

      {/* Статусын мессеж */}
      {statusMessage && (
        <div className={`mt-6 p-4 rounded-lg border ${
          status === 'success' 
            ? 'bg-green-50 border-green-200' 
            : status === 'error'
            ? 'bg-red-50 border-red-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {statusMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactForm;