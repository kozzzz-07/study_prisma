"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../util/db";
import { Prisma } from "@prisma/client";

export async function createPost(formData: FormData) {
  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string)
          .replace(/\s+/g, "-")
          .toLocaleLowerCase(),
        content: formData.get("content") as string,
        // 関連づけられたユーザのPOST
        author: {
          connect: {
            email: "test@test.com",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // https://www.prisma.io/docs/orm/reference/error-reference
      if (error.code === "P2002") {
        console.log(error.message);
      }
    }
  }

  revalidatePath("/posts");
}

export async function editPost(formData: FormData, id: string) {
  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLocaleLowerCase(),
      content: formData.get("content") as string,
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
}
