import React, { useEffect, useState } from "react";

const TaxUpdate = ({ padding }) => {
    const [posts, setPosts] = useState([]);
    const ghostHost = import.meta.env.VITE_GHOST_URL;

    useEffect(() => {
        fetch(
            `${ghostHost}/ghost/api/content/posts/?key=8b05c33cfd72c8bbd044757ad1&limit=2&fields=title,slug,feature_image,excerpt,published_at`
        )
            .then((res) => res.json())
            .then((data) => setPosts(data.posts))
            .catch((err) => console.error("Error fetching posts:", err));
    }, [ghostHost]);

    return (
        <section
            className="bg-[#F3F4F6]"
            id="taxupdate"
            style={{
                paddingLeft: padding,
                paddingRight: padding,
                paddingTop: "98px",
            }}
        >
            <h2 className="mb-4">📰 Tax Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {posts.map((post) => (
                    <article
                        key={post.slug}
                        className="flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg bg-white"
                    >
                        {post.feature_image && (
                            <img
                                src={post.feature_image}
                                alt={post.title}
                                className="w-full md:w-[120px] md:h-[90px] object-cover rounded-md"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="mb-2">{post.title}</h3>
                            <small className="text-gray-600">
                                {new Date(post.published_at).toLocaleString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </small>
                            <p className="mt-2">{post.excerpt}</p>
                            <a
                                href={`${ghostHost}/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 font-bold mt-2 inline-block"
                            >
                                Read more →
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default TaxUpdate;
