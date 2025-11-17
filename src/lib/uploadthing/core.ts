import jwt from 'jsonwebtoken';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

const auth = async (req: Request) => {
  const token = req.headers.get('authorization'); // plain token from frontend

  console.log('TOken: ', token);

  if (!token) {
    throw new UploadThingError('Unauthorized - No token provided');
  }

  try {
    // Verify using your NextAuth secret (static, from .env)
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as {
      id: string;
      role: string;
    };

    console.log('decode: ', decoded);

    return { id: decoded.id, role: decoded.role };
  } catch (err) {
    console.error('JWT verification failed:', err);
    throw new UploadThingError('Invalid or expired token');
  }
};

/**
 * 📂 File Router for UploadThing
 */
export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: '4MB', maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(' Upload complete for user:', metadata.userId);
      console.log(' File URL:', file.ufsUrl);

      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
