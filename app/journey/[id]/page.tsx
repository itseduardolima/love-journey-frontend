"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useRef } from "react";
import { api } from "@/services/api";
import { Journey } from "@/types/Journey";
import { iconMap } from "@/lib/utils";
import { ErrorPage } from "@/components/ErrorPage";
import { TimelineNotFound } from "@/components/TimelineNotFound";
import { Loader } from "@/components/Loader";

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100" ref={containerRef}>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-pink-500/20 to-gray-900/80"
        ></motion.div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
            >
              {journey.title}
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300"
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
              <Heart className="w-12 h-12 mx-auto text-pink-500" />
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
          className="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
        >
          Nossa Linha do Tempo
        </motion.h2>
        <div className="max-w-6xl mx-auto relative">
          <motion.div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 to-purple-600" />
          {journey.memories.map((memory, index) => (
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
                  <motion.div
                    className={`rounded-xl overflow-hidden shadow-2xl ${
                      index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_URL}${memory.photo}`}
                      alt={memory.title}
                      className="w-full h-[500px] object-cover"
                    />
                  </motion.div>
                </div>
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div className="flex items-center mb-4">
                    <motion.div className="w-8 h-8 bg-pink-500 rounded-full border-4 border-gray-900 z-10 absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
                      {React.createElement(iconMap[index % iconMap.length], {
                        className: "w-4 h-4 text-white",
                      })}
                    </motion.div>
                    <div
                      className={`hidden md:block absolute top-4 w-8 h-0.5 bg-pink-500 ${
                        index % 2 === 0 ? "-right-8" : "-left-8"
                      }`}
                    ></div>
                  </div>
                  <motion.div
                    className={`  p-2   ${
                      index % 2 === 0 ? "md:mr-32" : "md:ml-32"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 text-pink-500 mr-2" />
                      <span className="text-xl font-semibold text-pink-400">
                        {format(
                          new Date(memory.date),
                          "d 'de' MMMM 'de' yyyy",
                          { locale: ptBR }
                        )}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 break-words">
                      {memory.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed break-words">
                      {memory.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Love You Section */}
      <div className="text-center py-20 sm:py-32 bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Heart className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-pink-500 fill-current" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
        >
          Te amo!
        </motion.p>
      </div>
    </div>
  );
}

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <JourneyPage />
    </QueryClientProvider>
  );
}
