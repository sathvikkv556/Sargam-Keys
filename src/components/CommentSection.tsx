'use client';

import { useState, useEffect } from 'react';
import { Comment, APIResponse } from '@/types';
import { createComment, getCommentsBySongId } from '@/lib/actions/comment';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, User, Calendar, CheckCircle, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CommentSectionProps {
  songId: string;
  isAdmin: boolean;
}

export function CommentSection({ songId, isAdmin }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    content: ''
  });

  const fetchComments = async () => {
    setLoading(true);
    const response = await getCommentsBySongId(songId, isAdmin);
    if (response.success && response.data) {
      setComments(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [songId, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName || !formData.content) {
      toast.error('Please fill in your name and comment.');
      return;
    }

    setSubmitting(true);
    const response = await createComment({
      songId,
      ...formData
    });

    if (response.success) {
      toast.success(response.message || 'Comment submitted!');
      setFormData({ userName: '', userEmail: '', content: '' });
      if (isAdmin) {
        fetchComments();
      }
    } else {
      toast.error(response.error || 'Failed to submit comment.');
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-12 space-y-8" id="comments">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      <Separator />

      {/* Comment Form */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="userName" className="text-sm font-medium">Name *</label>
              <Input
                id="userName"
                placeholder="Your Name"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="userEmail" className="text-sm font-medium">Email (Optional)</label>
              <Input
                id="userEmail"
                type="email"
                placeholder="your@email.com"
                value={formData.userEmail}
                onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Comment *</label>
            <Textarea
              id="content"
              placeholder="What do you think about these notes?"
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Post Comment'}
          </Button>
          {!isAdmin && (
            <p className="text-xs text-muted-foreground mt-2">
              Note: Your comment will be visible after moderation.
            </p>
          )}
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="group relative flex gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-md">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{comment.userName}</span>
                    {comment.isAdmin && (
                      <span className="flex items-center gap-0.5 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <ShieldCheck className="h-3 w-3" />
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                  {comment.content}
                </p>
                {isAdmin && comment.status === 'Pending' && (
                  <div className="mt-2 text-[10px] font-medium text-yellow-600 dark:text-yellow-400">
                    Awaiting Moderation
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-2" />
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
