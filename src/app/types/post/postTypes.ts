// 기본 게시글 타입
export interface PostProps {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

// 컴포넌트 Props 타입들
// export interface PostListProps {
//   posts: PostProps[];
//   onSelectPost: (postId: number) => void;
// }

export interface PostListProps {
  selectedCategory: string | null;
}

export interface PostListSectionProps {
  posts: PostProps[];
  onSelectPost: (postId: number) => void;
}

export interface PostCreateProps {
  onAddPost: (post: PostProps) => void;
}

export interface PostEditProps {
  post: PostProps;
  onCancel: () => void;
  onSuccess: () => void;
}

export interface PostDetailViewProps {
  post: PostProps;
  isLoggedIn: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

// Store 관련 타입들
export interface PostStore {
  posts: PostProps[];
  setPosts: (posts: PostProps[]) => void;
  addPost: (post: PostProps) => void;
  getPostById: (id: number) => PostProps | undefined;
}

export interface PostActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  isLoggedIn: boolean;
}

// 카테고리 관련 타입들
export interface Category {
  id: string;
  name: string;
}

export const CATEGORY_MAP = {
  NOTICE: "공지",
  QNA: "Q&A",
  ETC: "기타",
  FREE: "자유",
} as const;

export type CategoryMap = typeof CATEGORY_MAP;
export type CategoryKey = keyof typeof CATEGORY_MAP;
export const CATEGORIES = Object.keys(CATEGORY_MAP) as CategoryKey[];

//react infinite query 관련
export interface PostsResponse {
  content: PostProps[];
  last: boolean;
  totalElements: number;
  totalPages: number;
}
