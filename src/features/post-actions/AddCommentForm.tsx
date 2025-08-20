import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useCommentStore } from '@/entities/comment';
import { useSessionStore } from '@/features/session';
import { commentsApi } from '@/entities/comment';

interface AddCommentFormProps {
  postId: number;
}

export const AddCommentForm = ({ postId }: AddCommentFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addComment } = useCommentStore();
  const { isAuthenticated, currentUser } = useSessionStore();

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="add-comment-prompt">
        <p>Please log in to leave a comment.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;

    setIsLoading(true);
    try {
      const newComment = {
        postId,
        name: name.trim(),
        body: body.trim(),
        email: currentUser.email,
      };

      const response = await commentsApi.create(newComment);
      addComment({
        ...response.data,
        id: Date.now(),
      });

      setName('');
      setBody('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        className="add-comment-btn"
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="md"
      >
        <MessageCircle size={16} />
        Add Comment
      </Button>
    );
  }

  return (
    <div className="add-comment-form">
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment-name">Subject</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Comment subject..."
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment-body">Comment</label>
          <textarea
            id="comment-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your comment..."
            required
            rows={3}
            maxLength={300}
          />
        </div>

        <div className="form-actions">
          <Button 
            type="button" 
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            variant="secondary"
            size="md"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || !name.trim() || !body.trim()}
            variant="primary"
            size="md"
          >
            {isLoading ? 'Adding...' : 'Add Comment'}
          </Button>
        </div>
      </form>
    </div>
  );
};