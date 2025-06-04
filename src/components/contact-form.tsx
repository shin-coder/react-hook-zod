'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validation/contact';
import { useState } from 'react';
import { z } from 'zod';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      console.log('送信データ:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('エラー:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register('name')} type="text" />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register('email')} type="email" />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input {...register('subject')} type="text" />
          {errors.subject && (
            <p className="text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <textarea {...register('message')} rows={5} />
          {errors.message && (
            <p className="text-red-600">{errors.message.message}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'sending...' : 'send'}
        </button>
      </form>
    </>
  );
}
