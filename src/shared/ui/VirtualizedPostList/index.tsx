import { memo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import { PostCard } from '@/entities/post';
import type { TPostWithInteractions } from '@/entities/post';
import styles from './styles.module.css';

interface VirtualizedPostListProps {
  posts: TPostWithInteractions[];
  height: number;
  className?: string;
}

interface PostItemProps extends ListChildComponentProps {
  data: TPostWithInteractions[];
}

const PostItem = memo(({ index, style, data }: PostItemProps) => {
  const post = data[index];
  
  return (
    <div style={style} className={styles.postItem}>
      <div className={styles.postWrapper}>
        <PostCard post={post} />
      </div>
    </div>
  );
});

PostItem.displayName = 'PostItem';

export const VirtualizedPostList = memo(({ posts, height, className }: VirtualizedPostListProps) => {
  const renderPost = useCallback((props: ListChildComponentProps) => (
    <PostItem {...props} data={posts} />
  ), [posts]);

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <List
        height={height}
        width="100%"
        itemCount={posts.length}
        itemSize={280}
        itemData={posts}
        className={styles.virtualList}
      >
        {renderPost}
      </List>
    </div>
  );
});

VirtualizedPostList.displayName = 'VirtualizedPostList';