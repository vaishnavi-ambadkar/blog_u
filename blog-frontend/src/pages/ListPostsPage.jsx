// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const ListPostsPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/posts');
//         setPosts(response.data); // Update posts with the fetched data
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="list-posts-page">
//       <h2>All Blog Posts</h2>
//       <ul>
//         {posts.map((post) => (
//           <li key={post._id}>
//             <h3>{post.title}</h3>
//             {/* Use imageUrl for the image field */}
//             {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
//             <p>{post.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListPostsPage;
// import { useEffect, useState } from "react";
// import axios from "axios";

// const ListPostsPage = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/posts");
//         setPosts(response.data); // Update posts with the fetched data
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleDelete = async (postId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/posts/${postId}`);
//       setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from the state
//       alert("Post deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       alert("Failed to delete the post.");
//     }
//   };

//   const handleEdit = (postId) => {
//     // Placeholder for edit functionality
//     alert(`Edit functionality for post ID: ${postId}`);
//   };

//   return (
//     <div className="list-posts-page">
//       <h2>All Blog Posts</h2>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {posts.map((post) => (
//           <li
//             key={post._id}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               border: "1px solid #ddd",
//               padding: "10px",
//               marginBottom: "10px",
//               borderRadius: "5px",
//               boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//             }}
//           >
//             <div>
//               <h3 style={{ margin: "0 0 5px 0" }}>{post.title}</h3>
//               {post.imageUrl && (
//                 <img
//                   src={post.imageUrl}
//                   alt={post.title}
//                   style={{
//                     width: "100px",
//                     height: "100px",
//                     objectFit: "cover",
//                     borderRadius: "5px",
//                     marginBottom: "5px",
//                   }}
//                 />
//               )}
//               <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>{post.description}</p>
//             </div>
//             <div style={{ display: "flex", gap: "10px" }}>
//               <button
//                 onClick={() => handleEdit(post._id)}
//                 style={{
//                   padding: "5px 10px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(post._id)}
//                 style={{
//                   padding: "5px 10px",
//                   backgroundColor: "#dc3545",
//                   color: "white",
//                   border: "none",
//                   cursor: "pointer",
//                   borderRadius: "5px",
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ListPostsPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      // Send DELETE request to server to delete the post
      const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      if (response.status === 200) {
        // Remove the post from the local state (frontend) after successful deletion
        setPosts(posts.filter((post) => post._id !== postId));
        alert("Post deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post.");
    }
  };

  const handleEdit = (post) => {
    // Redirect to AddPostPage and pass the post data as state
    navigate("/add-post", { state: { post } });
  };

  return (
    <div className="list-posts-page">
      <h2>All Blog Posts</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {posts.map((post) => (
          <li
            key={post._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>{post.title}</h3>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}
                />
              )}
              <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>{post.description}</p>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEdit(post)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPostsPage;
