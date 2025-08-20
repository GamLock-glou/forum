import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { usePostStore } from '@/entities/post';
import { useSessionStore } from '@/features/session';
import { postsApi } from '@/entities/post';

export const CreatePostForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addPost } = usePostStore();
  const { isAuthenticated, currentUser } = useSessionStore();

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsLoading(true);
    try {
      const newPost = {
        title: title.trim(),
        body: body.trim(),
        userId: currentUser.id,
      };

      const response = await postsApi.create(newPost);
      addPost({
        ...response.data,
        likes: 0,
        dislikes: 0,
        priority: 0,
        createdAt: new Date().toISOString(),
      });

      setTitle('');
      setBody('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button 
        className="create-post-btn"
        onClick={() => setIsOpen(true)}
        variant="primary"
        size="md"
      >
        <Plus size={20} />
        Create New Post
      </Button>
    );
  }

  return (
    <div className="create-post-form">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body">Content</label>
          <textarea
            id="post-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            required
            rows={4}
            maxLength={500}
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
            disabled={isLoading || !title.trim() || !body.trim()}
            variant="primary"
            size="md"
          >
            {isLoading ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};