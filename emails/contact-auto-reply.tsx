// emails/contact-auto-reply.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Section,
  Hr,
  Tailwind,
} from '@react-email/components';

interface ContactAutoReplyProps {
  name: string;
  subject?: string;
  message: string;
}

export default function ContactAutoReply({
  name,
  subject,
  message,
}: ContactAutoReplyProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="bg-white mx-auto py-5 px-5 mb-16 max-w-2xl">
            <Text className="text-2xl font-bold text-center mb-8 text-gray-900">
              お問い合わせありがとうございます
            </Text>

            <Section className="mb-6">
              <Text className="text-base text-gray-900 mb-4">{name}様</Text>

              <Text className="text-base text-gray-900 mb-4 leading-6">
                この度は、お問い合わせいただきありがとうございます。
                以下の内容でお問い合わせを受け付けいたしました。
              </Text>

              {subject && (
                <>
                  <Text className="text-sm font-bold text-gray-700 mb-1">
                    件名:
                  </Text>
                  <Text className="text-base text-gray-900 mb-4 p-3 bg-gray-50 rounded">
                    {subject}
                  </Text>
                </>
              )}

              <Section className="mb-6">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  メッセージ:
                </Text>
                <Text className="text-base text-gray-900 leading-6 p-3 bg-gray-50 rounded whitespace-pre-wrap">
                  {message}
                </Text>
              </Section>

              <Hr className="border-gray-200 my-5" />

              <Text className="text-base text-gray-900 leading-6">
                内容を確認させていただき、2-3営業日以内にご連絡いたします。
                しばらくお待ちください。
              </Text>

              <Text className="text-base text-gray-900 mt-6">
                何かご不明な点がございましたら、お気軽にお問い合わせください。
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
