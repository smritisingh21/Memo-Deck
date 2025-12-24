import React from "react";

export default function NoteCard({ note }) {
  return (
    <div className="bg-accent/15 rounded-lg p-3 hover:shadow-md transition">
      <h3 className="font-medium text-base-content">
        {note.title}
      </h3>
      <p className="text-sm text-base-content/70 line-clamp-3">
        {note.content}
      </p>
    </div>
  );
}
