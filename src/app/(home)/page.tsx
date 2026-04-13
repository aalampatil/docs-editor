"use client"
import { useQuery } from "convex/react";
import { Navbar } from "./navbar"
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments)

  if (!documents) {
    return (<p>Loading</p>)
  }
  console.log({ documents })
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed border top-0 left-0 right-0 z-10 p-4 h-16 bg-white">
        <Navbar />
      </div>

      <div className="mt-16">

      </div>
      <TemplatesGallery />
      {documents?.map((document, i) => (
        <span key={i}>{document.title}</span>
      ))}
    </div>
  );
}
