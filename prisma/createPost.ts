// import { PostController } from '../src/api/controllers/post/PostController';
// import prisma from '@src/lib/prisma';
// import { SupaUser } from 'types/index';
// import { ImageData } from '@features/ImageUploader/types/image-uploader.types';
// import { getImageProperties } from '@api/handleImageUpload';
// import { randomUUID } from 'crypto';
// import { faker } from '@faker-js/faker';
// import { User } from '@supabase/supabase-js';
// const postController = new PostController(prisma);

// export const createPost = async ({
//   user,
//   croppedImage,
//   body,
// }: {
//   user: User;
//   croppedImage: any;
//   body: {
//     imageData: string;
//     caption: string;
//   };
// }) => {
//   try {
//     const imageData: ImageData = JSON.parse(body.imageData);
//     const postHash = await postController.createPostHash();

//     if (!postHash) {
//       throw new Error('Could not create post hash');
//     }

//     await prisma.postHash.create({
//       data: {
//         postHash,
//       },
//     });

//     const imageProperties = await getImageProperties({
//       image: croppedImage,
//       userId: user.id,
//       imageData,
//       altText: faker.lorem.words(4),
//       username: user.user_metadata.username,
//     });

//     const postId = randomUUID();

//     const post = await prisma.post.create({
//       data: {
//         id: postId,
//         mediaId: imageProperties.id,
//         postHash,
//         userId: user.id,
//         username: user.user_metadata.username,
//         mediaType: imageProperties.type,
//         postBody: body.caption,
//         mediaUrl: imageProperties.url,
//         filename: imageProperties.filename,
//       },
//     });

//     const media = await prisma.media.create({
//       data: {
//         userId: user.id,
//         aspectRatio: imageProperties.aspectRatio,
//         width: imageProperties.width,
//         height: imageProperties.height,
//         bucket: imageProperties.bucket,
//         filename: imageProperties.filename,
//         type: imageProperties.type,
//         source: imageProperties.source,
//         url: imageProperties.url,
//         userMetadata: {} as any,
//         size: croppedImage.buffer.byteLength,
//         kind: 'post',
//         hash: imageProperties.hash,
//         postId: postId,
//       },
//     });

//     const postLike = await prisma.postLike.create({
//       data: {
//         postId,
//         userId: user.id,
//       },
//     });

//     return { post, media, postLike };
//   } catch (error) {
//     console.error(error);
//   }
// };
export {};
