'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/lib/validation/contact';
import { useState } from 'react';
import { z } from 'zod';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      console.log('送信データ:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 w-[80vw] md:w-[70vw]"
      >
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
          {errors.email && (
            <p className="text-red-600 text-xs">{errors.email.message}</p>
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white w-full p-2 rounded-sm"
        >
          {isSubmitting ? 'send' : 'confirm'}
        </button>
      </form>
    </>
  );
}
