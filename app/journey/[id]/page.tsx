"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { useRef } from "react";
import { api } from "@/services/api";
import { iconMap } from "@/lib/utils";
import { ErrorPage } from "@/components/ErrorPage";
import { TimelineNotFound } from "@/components/TimelineNotFound";
import { Loader } from "@/components/Loader";
import { formatDate } from "@/lib/formatString";

interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  photo: {
    data: number[];
    type: string;
  };
  photoMimeType: string;
}

interface Journey {
  id: string;
  title: string;
  partner1: string;
  partner2: string;
  memories: Memory[];
}

function JourneyPage() {
  const params = useParams();
  const { id } = params;
  const containerRef = useRef(null);

  const {
    data: journey,
    isLoading,
    isError,
  } = useQuery<Journey>({
    queryKey: ["journey", id],
    queryFn: () => api.get(`/journey/${id}`).then((res) => res.data),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!journey) {
    return <TimelineNotFound />;
  }

  const renderMemoryImage = (memory: Memory) => {
    if (memory.photo && memory.photo.data) {
      const uint8Array = new Uint8Array(memory.photo.data);
      const blob = new Blob([uint8Array], { type: memory.photoMimeType });
      const imageUrl = URL.createObjectURL(blob);
      return (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={memory.title}
          className="w-full h-[500px] object-cover"
          onLoad={() => URL.revokeObjectURL(imageUrl)}
        />
      );
    }
    return null;
  };

  const sortedMemories = [...journey.memories].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div
      className="min-h-screen bg-secondary-dark text-gray-100"
      ref={containerRef}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold h-28 mb-6  bg-clip-text text-transparent bg-gradient-primary"
            >
              {journey.title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-2xl md:text-3xl mb-8 text-gray-300 font-extrabold"
            >
              {journey.partner1} e {journey.partner2}
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Heart className="w-12 h-12 mx-auto text-primary" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-20 sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-primary"
        >
          Nossa Linha do Tempo
        </motion.h2>
        <div className="max-w-6xl mx-auto relative">
          <motion.div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary" />
          {sortedMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-16 relative"
            >
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                } items-center md:items-start`}
              >
                <div className="w-4/5 md:w-5/12 mb-6 md:mb-0">
                  <motion.div className="rounded-xl overflow-hidden shadow-2xl">
                    {renderMemoryImage(memory)}
                  </motion.div>
                </div>
                <div className="w-full md:w-5/6 pl-12 md:pl-0">
                  <div className="flex items-center mb-4">
                    <motion.div className="w-8 h-8 bg-primary rounded-full border-4 border-secondary-dark z-10 absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      {React.createElement(iconMap[index % iconMap.length], {
                        className: "w-4 h-4 text-white",
                      })}
                    </motion.div>
                    <div
                      className={`hidden md:block absolute top-4 w-8 h-0.5 bg-primary ${
                        index % 2 === 0 ? "-right-8" : "-left-8"
                      }`}
                    ></div>
                  </div>
                  <motion.div
                    className={`p-2 sm:w-3/5  ${
                      index % 2 === 0 ? "sm:mr-1" : "sm:ml-60"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-primary mr-2" />
                      <span className="text-xl font-semibold text-primary-light">
                        {formatDate(memory.date)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 break-words">
                      {memory.title}
                    </h3>
                    <p className="text-gray-300 text-justify leading-relaxed break-words">
                      {memory.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function Component() {
  return (
    <QueryClientProvider client={queryClient}>
      <JourneyPage />
    </QueryClientProvider>
  );
}
