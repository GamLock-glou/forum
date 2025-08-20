import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Building, 
  Globe, 
  Mail, 
  MessageCircle, 
  Clock,
  FileText,
  AlertCircle,
  Loader
} from "lucide-react";
import { usePostStore } from "@/entities/post";
import { useCommentStore } from "@/entities/comment";
import { useUserStore } from "@/entities/user";
import { commentsApi } from "@/entities/comment";
import { PostCard } from "@/entities/post";
import { CommentCard } from "@/entities/comment";
import { AddCommentForm } from "@/features/post-actions/AddCommentForm";
import { ERoutes } from "@/shared/config/routes";
import styles from './styles.module.css';

export const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = usePostStore();
  const {
    getCommentsByPostId,
    setComments,
    loading,
    error,
    setLoading,
    setError,
  } = useCommentStore();
  const { users } = useUserStore();

  const post = posts.find((p) => p.id === Number(id));
  const postComments = getCommentsByPostId(Number(id));
  const author = post ? users.find((user) => user.id === post.userId) : null;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const commentsResponse = await commentsApi.getByPostId(Number(id));
        setComments(commentsResponse.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setComments, setError, setLoading]);

  if (posts.length === 0) {
    return (
      <div className={styles.postPage}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}>
            <Loader size={48} />
          </div>
          <h2>Loading post...</h2>
          <p>Please wait while we fetch the content</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.postPage}>
        <div className={styles.notFoundContainer}>
          <div className={styles.notFoundIcon}>
            <FileText size={64} />
            <AlertCircle size={32} className={styles.warning} />
          </div>
          <h1>Post Not Found</h1>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <Link to={ERoutes.HOME} className={styles.backButton}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postPage}>
      <div className={styles.postContainer}>
        <nav className={styles.postNav}>
          <Link to={ERoutes.HOME} className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to Posts</span>
          </Link>
          <div className={styles.navInfo}>
            <span className={styles.postId}>Post #{post.id}</span>
          </div>
        </nav>

        <div className={styles.postContent}>
          <article className={styles.postArticle}>
            <div className={styles.postHeader}>
              <div className={styles.postMeta}>
                <Clock size={16} />
                <span>Recently updated</span>
              </div>
            </div>

            <div className={styles.postMain}>
              <PostCard post={post} />
            </div>

            {author && (
              <div className={styles.authorSection}>
                <div className={styles.authorHeader}>
                  <h3>About the Author</h3>
                </div>
                <div className={styles.authorCard}>
                  <div className={styles.authorAvatar}>
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorMain}>
                      <h4 className={styles.authorName}>{author.name}</h4>
                      <p className={styles.authorUsername}>@{author.username}</p>
                      {author.isAdmin && (
                        <span className={styles.authorBadge}>Administrator</span>
                      )}
                    </div>
                    
                    <div className={styles.authorDetails}>
                      <div className={styles.authorContact}>
                        <div className={styles.contactItem}>
                          <Mail size={14} />
                          <span>{author.email}</span>
                        </div>
                        {author.website && (
                          <div className={styles.contactItem}>
                            <Globe size={14} />
                            <a 
                              href={`https://${author.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.websiteLink}
                            >
                              {author.website}
                            </a>
                          </div>
                        )}
                      </div>

                      {author.address && (
                        <div className={styles.authorLocation}>
                          <MapPin size={14} />
                          <span>{author.address.city}</span>
                        </div>
                      )}

                      {author.company && (
                        <div className={styles.authorCompany}>
                          <Building size={14} />
                          <span>{author.company.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>

          <section className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
              <div className={styles.commentsTitle}>
                <MessageCircle size={24} />
                <h2>Discussion</h2>
                <span className={styles.commentsCount}>({postComments.length})</span>
              </div>
              <div className={styles.commentsActions}>
                <AddCommentForm postId={Number(id)} />
              </div>
            </div>

            <div className={styles.commentsContent}>
              {loading && (
                <div className={styles.commentsLoading}>
                  <Loader size={24} />
                  <span>Loading comments...</span>
                </div>
              )}
              
              {error && (
                <div className={styles.commentsError}>
                  <AlertCircle size={20} />
                  <span>Error: {error}</span>
                </div>
              )}

              {postComments.length === 0 && !loading ? (
                <div className={styles.noComments}>
                  <div className={styles.noCommentsIcon}>
                    <MessageCircle size={48} />
                  </div>
                  <h3>No comments yet</h3>
                  <p>Be the first to share your thoughts on this post!</p>
                </div>
              ) : (
                <div className={styles.commentsList}>
                  {postComments.map((comment) => (
                    <div key={comment.id} className={styles.commentWrapper}>
                      <CommentCard comment={comment} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
