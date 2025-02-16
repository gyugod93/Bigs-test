export type PostProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  // 상세 페이지에 필요한 경우 content를 추가
  authorId?: number;
};

export type PostItemProps = {
  post: PostProps;
  onClick: (postId: number) => void;
};

export type PostState = {
  posts: PostProps[];
  addPost: (newPost: PostProps) => void;
  setPosts: (newPosts: PostProps[]) => void;
};

export type PostCreateProps = {
  onAddPost: (post: PostProps) => void;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  authorId?: number; // 토큰에서 추출한 작성자 ID
};

export type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  getPostById: (id: number) => Post | undefined;
  isAuthor: (id: number, currentUserId: number) => boolean;
};

export type PostEditProps = {
  post: {
    id: number;
    title: string;
    content: string;
    category: string;
  };
  onCancel: () => void;
  onSuccess: () => void;
};
