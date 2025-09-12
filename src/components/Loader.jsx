import React, { useState, useEffect } from "react";

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [loadingDuration, setLoadingDuration] = useState(2000); // default 2s
    const [isFinished, setIsFinished] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        // Finance-related rotating messages
        const messages = [
            "Welcome to AMFOS",
        ];
        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            setMessage(messages[msgIndex]);
            msgIndex = (msgIndex + 1) % messages.length;
        }, 800);

        // Disable scrolling while loader is active
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";

        // Set shorter random duration (1.5s - 2.5s)
        const duration = 1500 + Math.random() * 1000;
        setLoadingDuration(duration);

        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const percentage = Math.min((elapsed / duration) * 100, 100);
            setProgress(percentage);

            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                setIsFinished(true);
                // After vanish animation, hide loader
                setTimeout(() => {
                    setIsHidden(true);
                    // Re-enable scrolling
                    document.body.style.overflow = "";
                    document.body.style.position = "";
                    document.body.style.width = "";
                }, 800);
            }
        };

        requestAnimationFrame(step);

        return () => {
            clearInterval(msgInterval);
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, []);

    if (isHidden) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#F3F4F6",
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "'Montserrat', sans-serif",
                color: "#1E3A8A",
                transition: "transform 0.8s ease, opacity 0.8s ease",
                transform: isFinished ? "translateY(-100vh)" : "translateY(0)",
                opacity: isFinished ? 0 : 1,
            }}
        >
            <h1
                style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                }}
            >
                AFMOS
            </h1>
            <div style={{ fontSize: "1.1rem", marginBottom: "0.8rem" }}>
                {message} {Math.floor(progress)}%
            </div>
            <div
                style={{
                    width: "220px",
                    height: "10px",
                    backgroundColor: "#d1d5db",
                    borderRadius: "5px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #1E3A8A, #3B82F6)",
                        borderRadius: "5px 0 0 5px",
                        transition: "width 0.1s linear",
                    }}
                />
            </div>
        </div>
    );
};

export default Loader;
