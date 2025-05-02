"use client";
import { useState, useEffect } from "react";
import { ProjectJson } from "@/libs/Project/getProjectList";
import Card from "@/components/common/Card";
import { motion, AnimatePresence } from "framer-motion";
import cn from "@yeahx4/cn";

export default function ProjectTagsAndList({ tags, projects }: ProjectJson) {
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const handleTagClick = (tag: string) => {
    if (selectedTag.includes(tag)) {
      setSelectedTag(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTag(prev => [...prev, tag]);
    }
  };

  useEffect(() => {
    if (selectedTag.length > 0) {
      const filteredProjects = projects.filter(project =>
        project.meta.tags.some(tag => selectedTag.includes(tag))
      );
      setFilteredProjects(filteredProjects);
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedTag, projects]);
  return (
    <>
      <h2 className="text-3xl font-bold">Tags</h2>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <button
                onClick={() => handleTagClick(tag)}
                key={index}
                className={cn(
                  selectedTag.includes(tag) ? "bg-gray-500" : "bg-gray-700",
                  "text-gray-300 px-2 py-1 rounded-full text-sm", 
                  "font-semibold cursor-pointer transition duration-200 hover:bg-gray-400",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      <h2 className="text-3xl font-bold mt-8">Projects</h2>
      <div className="mt-8 flex flex-col gap-8 md:grid md:grid-cols-2">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                type="project"
                slug={project.slug}
                thumbnail={project.meta.thumbnail}
                title={project.meta.title}
                description={project.meta.description}
                date={project.meta.date}
                tags={project.meta.tags}
                showTags={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

