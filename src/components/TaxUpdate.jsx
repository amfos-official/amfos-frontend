import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaxUpdate = ({ padding }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch("/taxupdates/wp-json/wp/v2/posts?per_page=10&_fields=id,date,slug,link,title,excerpt")
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

    const nextSlide = useCallback(() => {
        setCurrentPage(prevPage => {
            const nextPage = prevPage + 2;
            return nextPage >= posts.length ? 0 : nextPage;
        });
    }, [posts.length]);

    useEffect(() => {
        if (posts.length > 2) {
            const timer = setInterval(() => {
                nextSlide();
            }, 10000); // 10 seconds

            return () => clearInterval(timer);
        }
    }, [posts.length, nextSlide]);

    return (
        <section
            className="bg-[#F3F4F6]"
            id="taxupdate"
            style={{ padding: padding }}
        >
            <h1 className="lalezar text-5xl lg:text-7xl font-extrabold text-[#111827]" style={{ marginBottom: "25px" }}>
                Latest Tax Updates
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-gray-600 italic">No content found.</p>
            ) : (
                <div className="relative">
                    {/* AnimatePresence handles the enter and exit animations */}
                    <AnimatePresence mode="wait">
                        {/* 1. We use `motion.div` instead of a regular `div`.
                          2. We removed the `className="fade-in-slide"`.
                          3. The animation is now defined by the `initial`, `animate`, `exit`, and `transition` props.
                        */}
                        <motion.div
                            key={currentPage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {posts.slice(currentPage, currentPage + 2).map((post) => (
                                    <article
                                        key={post.id}
                                        className="flex flex-col p-4 border border-gray-300 rounded-lg bg-white h-full"
                                    >
                                        <div className="flex-1 flex flex-col">
                                            <h3
                                                className="mb-2 text-lg font-semibold"
                                                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                                            />
                                            <small className="text-gray-600">
                                                {new Date(post.date).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </small>
                                            <div
                                                className="mt-2 text-gray-700 flex-grow"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                            <a
                                                href={post.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-bold mt-4 self-start"
                                            >
                                                Read more →
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </section>
    );
};

export default TaxUpdate;