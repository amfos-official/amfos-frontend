import React, { useEffect, useState } from "react";

const TaxUpdate = ({ padding }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/taxupdates/wp-json/wp/v2/posts?per_page=2&_fields=id,date,slug,link,title,excerpt")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setLoading(false);
            });
    }, []);

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

            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-gray-600 italic">No content found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="flex flex-col md:flex-row gap-4 p-4 border border-gray-300 rounded-lg bg-white"
                        >
                            <div className="flex-1">
                                <h3
                                    className="mb-2 text-lg font-semibold"
                                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                />
                                <small className="text-gray-600">
                                    {new Date(post.date).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </small>
                                <p
                                    className="mt-2"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />
                                <a
                                    href={post.link}
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
            )}
        </section>
    );
};

export default TaxUpdate;
