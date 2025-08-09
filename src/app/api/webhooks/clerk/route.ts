import prisma from '@/lib/client';
import { Webhook } from 'svix';
import { NextRequest } from 'next/server';

interface WebhookEvent {
  type: string;
  data: {
    id: string;
    username?: string;
    image_url?: string;
    [key: string]: any;
  };
}

const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET || '';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  console.log('Webhook: Received request at', new Date().toISOString());
  try {
    const rawBody = await req.text();
    const headers = Object.fromEntries(req.headers);
    const svixId = headers['svix-id'];
    const svixTimestamp = headers['svix-timestamp'];
    const svixSignature = headers['svix-signature'];

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Webhook: Missing Svix headers', { headers });
      return new Response('Missing Svix headers', { status: 400 });
    }

    const webhook = new Webhook(clerkWebhookSecret);
    const evt = webhook.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;

    console.log('Webhook: Verified event', { type: evt.type, data: evt.data });

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created') {
      console.log('Webhook: Processing user.created event for ID', id);
      try {
        await prisma.user.create({
          data: {
            id: evt.data.id,
            username: evt.data.username || 'default-username',
            avatar: evt.data.image_url || '/noAvatar.png',
            cover: '/noCover.png',
          },
        });
        console.log('Webhook: User created in database', id);
        return new Response('User created Successfully!✅', { status: 200 });
      } catch (err) {
        console.error('Webhook: Error creating user', err);
        return new Response('❌ User creation failed!', { status: 500 });
      }
    }

    if (eventType === 'user.updated') {
      console.log('Webhook: Processing user.updated event for ID', id);
      try {
        await prisma.user.update({
          where: { id: evt.data.id },
          data: {
            username: evt.data.username || 'default-username',
            avatar: evt.data.image_url || '/noAvatar.png',
          },
        });
        console.log('Webhook: User updated in database', id);
        return new Response('User Updated Successfully!✅', { status: 200 });
      } catch (err) {
        console.error('Webhook: Error updating user', err);
        return new Response('❌ User Update failed!', { status: 500 });
      }
    }

    console.log('Webhook: Unhandled event type', eventType);
    return new Response(`Webhook received for unhandled event: ${eventType}`, { status: 200 });
  } catch (err) {
    console.error('Webhook: Error verifying webhook', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}