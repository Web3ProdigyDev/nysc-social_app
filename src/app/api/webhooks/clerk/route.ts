import prisma from '@/lib/client';
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req) as WebhookEvent; // Explicitly type evt as WebhookEvent

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      try {
        await prisma.user.create({
          data: {
            id: evt.data.id,
            username: evt.data.username || 'default-username', // Fallback if username is undefined
            avatar: evt.data.image_url || '/noAvatar.png',
            cover: '/noCover.png',
          },
        });
        return new Response('User created Successfully!✅', { status: 200 });
      } catch (err) {
        console.error(err);
        return new Response('❌ User creation failed!', { status: 500 });
      }
    }

    if (eventType === 'user.updated') { // Fixed to lowercase 'updated'
      try {
        await prisma.user.update({
          where: {
            id: evt.data.id,
          },
          data: {
            username: evt.data.username || 'default-username', // Fallback if username is undefined
            avatar: evt.data.image_url || '/noAvatar.png',
          },
        });
        return new Response('User Updated Successfully!✅', { status: 200 });
      } catch (err) {
        console.error(err);
        return new Response('❌ User Update failed!', { status: 500 });
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}