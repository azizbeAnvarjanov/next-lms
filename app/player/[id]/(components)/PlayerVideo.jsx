import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

const PlayerVideo = ({ watchVideo }) => {
  const [videoId, setVideoId] = useState("");

  // Обновляем videoId при изменении watchVideo
  useEffect(() => {
    if (watchVideo?.chapterVideo) {
      setVideoId(getVideoIdFromUrl(watchVideo.chapterVideo));
    }
  }, [watchVideo]);

  // Функция для извлечения videoId из URL YouTube
  const getVideoIdFromUrl = (url) => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Опции для YouTube
  const opts = {
    width: "100%", // Установка ширины
    height: `${window.innerHeight}px`, // Установка высоты
    playerVars: {
      autoplay: 1, // Установка автовоспроизведения
    },
  };

  return (
    <div className=" overflow-y-scroll">
      <div className="w-full h-[100vh] bg-red-300 relative">
        {videoId && <YouTube videoId={videoId} opts={opts} />}
      </div>
      <div className="p-5 space-y-6 w-[80%] mx-auto">
        <Card className="border-[1px] px-5 border-[--border] shadow-none">
          <div className="flex p-5 items-center justify-between">
            <h1 className="text-2xl font-medium">Courses Page</h1>
            <Button
              variant="complete"
              className="gap-2 items-center hover:bg-[#37ab87] transition-all"
            >
              Complete and continue <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PlayerVideo;
