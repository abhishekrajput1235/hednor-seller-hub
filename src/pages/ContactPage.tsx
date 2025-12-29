import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  HeadphonesIcon,
  FileText,
  Users
} from 'lucide-react';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone is required'),
    subject: yup.string().required('Subject is required'),
    category: yup.string().required('Category is required'),
    message: yup.string().min(10).required('Message is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="pt-24 min-h-screen bg-[rgb(var(--c-neutral-50))]">
      <div className="container-max">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-[rgb(var(--c-neutral-600))] max-w-2xl mx-auto">
              We’re here to help you succeed. Reach out anytime.
            </p>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[Phone, Mail, MapPin, Clock].map((Icon, i) => (
            <div
              key={i}
              className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[rgb(var(--c-primary-500))]/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-[rgb(var(--c-primary-500))]" />
              </div>
              <h3 className="font-semibold text-[rgb(var(--c-neutral-900))] mb-1">
                Support Info
              </h3>
              <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                Reliable seller assistance
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-xl p-8">
            <h2 className="text-2xl font-bold text-[rgb(var(--c-neutral-900))] mb-6">
              Send Us a Message
            </h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-green-700 font-medium">
                  Message sent successfully
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <input {...register('name')} placeholder="Full Name" className="w-full input-field bg-white" />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <input {...register('email')} placeholder="Email" className="w-full input-field bg-white" />
              <input {...register('phone')} placeholder="Phone" className="w-full input-field bg-white" />
              <input {...register('subject')} placeholder="Subject" className="w-full input-field bg-white" />

              <textarea
                {...register('message')}
                rows={5}
                placeholder="Your message..."
                className="w-full input-field bg-white"
              />

              <button className="btn-primary w-full flex items-center justify-center">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Support Panel */}
          <div className="space-y-6">
            <div className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-xl p-8">
              <h3 className="text-xl font-bold text-[rgb(var(--c-neutral-900))] mb-4">
                Support Categories
              </h3>
              {[HeadphonesIcon, FileText, Users, MessageCircle].map((Icon, i) => (
                <div key={i} className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[rgb(var(--c-primary-500))]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[rgb(var(--c-primary-500))]" />
                  </div>
                  <p className="text-sm text-[rgb(var(--c-neutral-600))]">
                    Professional seller support
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[rgb(var(--c-neutral-200))] rounded-xl p-8">
              <button
                onClick={() => setShowLiveChat(!showLiveChat)}
                className="btn-secondary w-full"
              >
                Start Live Chat
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
