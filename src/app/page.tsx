import Image from 'next/image';
import ContactForm from '@/components/contact-form';

export default function Home() {
  return (
    <>
      <div className="grid place-content-center w-full h-screen">
        <h1 className="text-5xl mb-10">Contact</h1>
        <ContactForm />
      </div>
    </>
  );
}
