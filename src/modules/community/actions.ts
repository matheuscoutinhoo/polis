"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { RateLimitError } from "@/lib/rate-limit";
import { requireUser } from "@/lib/session";
import { CommunityError, createComment, createForum, createTopic, deleteOwnComment, deleteOwnTopic, editComment, editTopic, reportContent, setFollow } from "./service";

export type FormState = { ok: boolean; error?: string; fieldErrors?: Record<string, string>; message?: string };

function toFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, error: "Revise os campos indicados.", fieldErrors };
  }
  if (error instanceof CommunityError || error instanceof RateLimitError) return { ok: false, error: error.message };
  throw error;
}

function optionalId(value: FormDataEntryValue | null): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function createForumAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser("/comunidade/novo");
  let slug: string;
  try {
    const forum = await createForum(user, {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      category: String(formData.get("category") ?? ""),
      rules: String(formData.get("rules") ?? ""),
      eventId: optionalId(formData.get("eventId")),
    });
    slug = forum.slug;
  } catch (error) {
    return toFormState(error);
  }
  revalidatePath("/comunidade");
  redirect(`/comunidade/${slug}`);
}

export async function followForumAction(formData: FormData) {
  const forumId = String(formData.get("forumId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  await setFollow(user.id, forumId, formData.get("follow") === "true");
  revalidatePath(path);
  revalidatePath("/comunidade");
}

export async function createTopicAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const forumId = String(formData.get("forumId") ?? "");
  const forumSlug = String(formData.get("forumSlug") ?? "");
  const user = await requireUser(`/comunidade/${forumSlug}/novo-topico`);
  let topicId: string;
  try {
    const topic = await createTopic(user, forumId, {
      title: String(formData.get("title") ?? ""),
      body: String(formData.get("body") ?? ""),
      lessonId: optionalId(formData.get("lessonId")),
      eventId: optionalId(formData.get("eventId")),
    });
    topicId = topic.id;
  } catch (error) {
    return toFormState(error);
  }
  revalidatePath(`/comunidade/${forumSlug}`);
  redirect(`/comunidade/${forumSlug}/${topicId}`);
}

export async function editTopicAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const topicId = String(formData.get("topicId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  try {
    await editTopic(user, topicId, { title: String(formData.get("title") ?? ""), body: String(formData.get("body") ?? "") });
  } catch (error) {
    return toFormState(error);
  }
  revalidatePath(path);
  return { ok: true, message: "Tópico atualizado." };
}

export async function deleteTopicAction(formData: FormData) {
  const topicId = String(formData.get("topicId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  await deleteOwnTopic(user, topicId);
  revalidatePath(path);
}

export async function createCommentAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const topicId = String(formData.get("topicId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  try {
    await createComment(user, topicId, { body: String(formData.get("body") ?? "") });
  } catch (error) {
    return toFormState(error);
  }
  revalidatePath(path);
  return { ok: true, message: "Comentário publicado." };
}

export async function editCommentAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const commentId = String(formData.get("commentId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  try {
    await editComment(user, commentId, { body: String(formData.get("body") ?? "") });
  } catch (error) {
    return toFormState(error);
  }
  revalidatePath(path);
  return { ok: true, message: "Comentário atualizado." };
}

export async function deleteCommentAction(formData: FormData) {
  const commentId = String(formData.get("commentId") ?? "");
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  await deleteOwnComment(user, commentId);
  revalidatePath(path);
}

export async function reportAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const path = String(formData.get("path") ?? "/comunidade");
  const user = await requireUser(path);
  try {
    await reportContent(user, {
      targetType: String(formData.get("targetType") ?? ""),
      targetId: String(formData.get("targetId") ?? ""),
      reason: String(formData.get("reason") ?? ""),
      details: String(formData.get("details") ?? "") || null,
    });
  } catch (error) {
    return toFormState(error);
  }
  return { ok: true, message: "Denúncia enviada. A equipe de moderação vai analisar o conteúdo." };
}
