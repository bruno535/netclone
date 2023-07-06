import React, { useEffect, useState } from 'react';

function MovieTrailer({ movie }) {
    const [trailerId, setTrailerId] = useState(null);

    useEffect(() => {
        async function fetchTrailer() {
            const apiKey = process.env.REACT_APP_API_KEY_YT;
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
                movie.title ? `${movie.title} trailer` : `${movie.name} trailer`
            )}&key=${apiKey}`;
            try {
                const response = await fetch(searchUrl);
                const data = await response.json();

                if (data.items.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    setTrailerId(videoId);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (movie) {
            fetchTrailer();
        }
    }, [movie]);

    return (
        <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
            title="Trailer"
            allowFullScreen
        ></iframe>
    );
}

export default MovieTrailer;
