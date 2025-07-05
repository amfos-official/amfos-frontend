import React, { useState, useEffect } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [loadingDuration, setLoadingDuration] = useState(3000); // default 3s
    const [isFinished, setIsFinished] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        // Disable scrolling while loader is active
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        // Set random duration between 3000ms to 5000ms
        const duration = 3000 + Math.random() * 2000;
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
                // After animation upwards, hide loader
                setTimeout(() => {
                    setIsHidden(true);
                    // Re-enable scrolling after loader is hidden
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }, 1000); // 1s for upward vanish animation
            }
        };

        requestAnimationFrame(step);

        // Cleanup in case component unmounts early
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, []);

    if (isHidden) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#F3F4F6',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: "'Montserrat', sans-serif",
                color: '#111827',
                transition: 'transform 1s ease, opacity 1s ease',
                transform: isFinished ? 'translateY(-100vh)' : 'translateY(0)',
                opacity: 1,
            }}
        >
            <div style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>
                Loading {Math.floor(progress)}%
            </div>
            <div
                style={{
                    width: '200px',
                    height: '8px',
                    backgroundColor: '#d1d5db', // light gray bar background
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#111827',
                        borderRadius: '4px 0 0 4px',
                        transition: 'width 0.1s linear',
                    }}
                />
            </div>
        </div>
    );
};

export default Loader;
