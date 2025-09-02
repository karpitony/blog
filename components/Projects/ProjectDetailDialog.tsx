'use client';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProjectMeta } from '@/types/project';
import MarkdownRender from '@/components/MarkdownRender/MarkdownRender';

export default function ProjectDetailDialog({ meta, body }: { meta: ProjectMeta; body: string[] }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={open => !open && router.back()}>
      <DialogContent className="max-w-2xl">
        {meta ? (
          <>
            <DialogHeader>
              <DialogTitle>{meta.title}</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{meta.description}</p>
            <MarkdownRender
              markdownText={body.join('\n')}
              projectTitle={meta.title}
              renderType="PROJECT"
            />
          </>
        ) : (
          <div>프로젝트를 찾을 수 없습니다.</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
