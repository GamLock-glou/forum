import { useEffect, type PropsWithChildren } from "react";
import { usersApi, useUserStore } from "@/entities/user";
import { postsApi, usePostStore } from "@/entities/post";
import { Loader } from "@/shared/ui/Loader";

export const PreloadQueriesLayout = ({ children }: PropsWithChildren) => {

  const {
    setPosts,
    loading: postsLoading,
    setLoading: setPostsLoading,
    setError: setPostsError,
  } = usePostStore();

  const { setUsers, setLoading: setUserLoading, loading: userLoading, setError: setUsersError } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      setPostsLoading(true);
      setUserLoading(true)
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          postsApi.getAll(),
          usersApi.getAll(),
        ]);

        setPosts(
          postsResponse.data.map((post) => ({
            ...post,
            likes: Math.floor(Math.random() * 50),
            dislikes: Math.floor(Math.random() * 20),
            priority: Math.floor(Math.random() * 10),
          }))
        );
        setUsers(
          usersResponse.data.map((user) => ({
            ...user,
          }))
        );
      } catch (error) {
        setPostsError("Failed to fetch data");
        setUsersError("Failed to fetch data")
        console.error("Error fetching data:", error);
      } finally {
        setPostsLoading(false);
        setUserLoading(false)
      }
    };

    fetchData();
  }, [setPosts, setUsers, setPostsLoading, setUserLoading, setPostsError, setUsersError]);


  if (postsLoading || userLoading) return <Loader />
  return children;
};
