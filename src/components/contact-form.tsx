'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validation/contact';
import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState<z.infer<
    typeof contactSchema
  > | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onConfirm = (data: z.infer<typeof contactSchema>) => {
    setFormData(data);
    setIsConfirming(true);
  };

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setIsConfirming(false);
      setIsSubmitting(false);

      router.push('/contact/thanks');
    } catch (error) {
      console.error('エラー:', error);
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    if (isConfirming && formData) {
      onSubmit(formData);
    }
  };

  const handleGoBack = () => {
    setIsConfirming(false);
  };

  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold mb-10">
        {isConfirming ? 'Confirm' : 'Contact'}
      </h1>
      <form
        onSubmit={handleSubmit(onConfirm)}
        className="space-y-8 w-[80vw] md:w-[70vw]"
      >
        {!isConfirming ? (
          <>
            <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
              <label className="text-base flex items-center gap-2 mb-2 md:text-lg">
                name<small className="block text-xs">required</small>
              </label>
              <div className="border border-black rounded-sm p-1">
                <input
                  {...register('name')}
                  type="text"
                  className="block w-full bg-transparent p-1"
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
              <label className="text-base flex items-center gap-2 mb-2 md:text-lg">
                Email<small className="block text-xs">required</small>
              </label>
              <div className="border border-black rounded-sm p-1">
                <input
                  {...register('email')}
                  type="email"
                  className="block w-full p-1"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
              <label className="text-base flex items-center gap-2 mb-2 md:text-lg">
                Tell
              </label>
              <div className="border border-black rounded-sm p-1">
                <input
                  {...register('phone')}
                  type="tel"
                  className="block w-full p-1"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-xs">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
              <label className="md:text-lg text-base flex items-center gap-2 mb-2">
                Subject
              </label>
              <div className="border border-black rounded-sm p-1">
                <input
                  {...register('subject')}
                  type="text"
                  className="block w-full p-1"
                />
              </div>
              {errors.subject && (
                <p className="text-red-600 text-xs">{errors.subject.message}</p>
              )}
            </div>

            <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
              <label className="md:text-lg text-base flex items-center gap-2 mb-2">
                Message<small className="block text-xs">required</small>
              </label>
              <div className="border border-black rounded-sm p-1">
                <textarea
                  {...register('message')}
                  rows={5}
                  className=" block w-full border-none bg-transparent p-1"
                />
              </div>
              {errors.message && (
                <p className="text-red-600 text-xs">{errors.message.message}</p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="space-y-6">
              <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
                <dt className="text-base md:text-lg font-medium">name</dt>
                <dd className="mt-1 md:mt-0 p-2 bg-gray-50 rounded">
                  {formData?.name}
                </dd>
              </div>

              <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
                <dt className="text-base md:text-lg font-medium">Email</dt>
                <dd className="mt-1 md:mt-0 p-2 bg-gray-50 rounded">
                  {formData?.email}
                </dd>
              </div>

              {formData?.phone && (
                <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
                  <dt className="text-base md:text-lg font-medium">Tell</dt>
                  <dd className="mt-1 md:mt-0 p-2 bg-gray-50 rounded">
                    {formData?.phone}
                  </dd>
                </div>
              )}

              {formData?.subject && (
                <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
                  <dt className="text-base md:text-lg font-medium">Object</dt>
                  <dd className="mt-1 md:mt-0 p-2 bg-gray-50 rounded">
                    {formData?.subject}
                  </dd>
                </div>
              )}

              <div className="md:grid md:grid-cols-[25vw_1fr] md:items-center">
                <dt className="text-base md:text-lg font-medium">Message</dt>
                <dd className="mt-1 md:mt-0 p-2 bg-gray-50 rounded whitespace-pre-wrap">
                  {formData?.message}
                </dd>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <button
            type={isConfirming ? 'button' : 'submit'}
            onClick={isConfirming ? handleButtonClick : undefined}
            disabled={isSubmitting}
            className="bg-black text-white w-full p-2 rounded-sm"
          >
            {!isConfirming ? 'confirm' : isSubmitting ? 'sending...' : 'send'}
          </button>
          {isConfirming && (
            <button
              type="button"
              onClick={handleGoBack}
              className="bg-black text-white w-full p-2 rounded-sm"
            >
              Back
            </button>
          )}
        </div>
      </form>
    </>
  );
}
