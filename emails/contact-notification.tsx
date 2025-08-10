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

interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export default function ContactNotification({
  name,
  email,
  phone,
  subject,
  message,
}: ContactNotificationProps) {
  return (
    <>
      <Html>
        <Head />
        <Tailwind>
          <Body className="bg-gray-50 font-sans">
            <Container className="bg-white mx-auto py-5 px-5 mb-16 max-w-2xl">
              <Text className="text-2xl font-bold text-center mb-8 text-gray-900">
                新しいお問い合わせ
              </Text>

              <Section className="mb-6">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  お名前:
                </Text>
                <Text className="text-base text-gray-900 mb-4 p-3 bg-gray-50 rounded">
                  {name}
                </Text>
              </Section>

              <Hr className="border-gray-200 my-5" />

              <Section className="mb-6">
                <Text className="text-sm font-bold text-gray-700 mb-1">
                  メールアドレス:
                </Text>
                <Text className="text-base text-gray-900 mb-4 p-3 bg-gray-50 rounded">
                  {email}
                </Text>
              </Section>

              <Hr className="border-gray-200 my-5" />

              {phone && (
                <>
                  <Section className="mb-6">
                    <Text className="text-sm font-bold text-gray-700 mb-1">
                      電話番号:
                    </Text>
                    <Text className="text-base text-gray-900 mb-4 p-3 bg-gray-50 rounded">
                      {phone}
                    </Text>
                  </Section>
                  <Hr className="border-gray-200 my-5" />
                </>
              )}

              {subject && (
                <>
                  <Section className="mb-6">
                    <Text className="text-sm font-bold text-gray-700 mb-1">
                      件名:
                    </Text>
                    <Text className="text-base text-gray-900 mb-4 p-3 bg-gray-50 rounded">
                      {subject}
                    </Text>
                  </Section>
                  <Hr className="border-gray-200 my-5" />
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
            </Container>
          </Body>
        </Tailwind>
      </Html>
    </>
  );
}
