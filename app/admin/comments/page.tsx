'use client';

import { useState, useEffect } from 'react';
import { getAllComments, updateCommentStatus, deleteComment } from '@/lib/actions/comment';
import { Comment, APIResponse } from '@/types';
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  MessageSquare, 
  User, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { format } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchComments = async () => {
    setLoading(true);
    const response = await getAllComments({ page, limit: 20 });
    if (response.success && response.data) {
      setComments(response.data.comments);
      setTotal(response.data.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [page]);

  const handleStatusUpdate = async (id: string, status: 'Approved' | 'Spam' | 'Pending') => {
    const response = await updateCommentStatus(id, status);
    if (response.success) {
      toast.success(`Comment ${status.toLowerCase()} successfully.`);
      fetchComments();
    } else {
      toast.error(response.error || 'Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    const response = await deleteComment(id);
    if (response.success) {
      toast.success('Comment deleted successfully.');
      fetchComments();
    } else {
      toast.error(response.error || 'Failed to delete comment.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Comments Management</h1>
          <p className="text-muted-foreground">Moderate and manage song comments.</p>
        </div>
        <Badge variant="outline" className="text-sm">Total: {total}</Badge>
      </div>

      <div className="grid gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment._id} 
              className={`rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md ${
                comment.status === 'Pending' ? 'border-yellow-200 bg-yellow-50/30 dark:border-yellow-900/30 dark:bg-yellow-900/10' : ''
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="font-bold">{comment.userName}</span>
                    <span className="text-xs text-muted-foreground">{comment.userEmail}</span>
                    {comment.isAdmin && (
                      <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <ShieldCheck className="h-3 w-3" />
                        Admin
                      </Badge>
                    )}
                    <Badge 
                      variant={
                        comment.status === 'Approved' ? 'default' : 
                        comment.status === 'Pending' ? 'outline' : 'destructive'
                      }
                      className={comment.status === 'Pending' ? 'border-yellow-500 text-yellow-600' : ''}
                    >
                      {comment.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(comment.createdAt), 'PPpp')}
                    <span className="mx-1">•</span>
                    <span className="flex items-center gap-1">
                      On: <Link 
                        href={`/notes/${(comment.songId as any)?.slug}`} 
                        className="font-medium text-primary hover:underline flex items-center gap-0.5"
                        target="_blank"
                      >
                        {(comment.songId as any)?.title}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </span>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-3 text-sm italic text-foreground/80 whitespace-pre-wrap border">
                    "{comment.content}"
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                  {comment.status !== 'Approved' && (
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700 text-white gap-1"
                      onClick={() => handleStatusUpdate(comment._id, 'Approved')}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {comment.status !== 'Spam' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 gap-1"
                      onClick={() => handleStatusUpdate(comment._id, 'Spam')}
                    >
                      <AlertCircle className="h-4 w-4" />
                      Spam
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    className="gap-1"
                    onClick={() => handleDelete(comment._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-muted/20">
            <MessageSquare className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold">No comments found</h3>
            <p className="text-muted-foreground max-w-xs">When users comment on songs, they will appear here for moderation.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 20 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button 
            variant="outline" 
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center px-4 text-sm font-medium">
            Page {page} of {Math.ceil(total / 20)}
          </div>
          <Button 
            variant="outline" 
            disabled={page >= Math.ceil(total / 20)}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
