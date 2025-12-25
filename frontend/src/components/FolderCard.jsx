import { Link } from "react-router-dom";
import { FolderCheck } from "lucide-react";



export default function FolderCard({ id, title, notes =[] }) {
  
  return (
    <Link to={`/folder/${id}`}>

    <section className="bg-base-100/30 rounded-xl p-4 shadow space-y-5 m-6 hover:shadow-md transition cursor-pointer">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-4">
            <FolderCheck size={20} />

            <h2 className="text-md text-primary-content font-semibold">
              {title}
            </h2>

        </div>

        <span className="text-sm text-base-content/80">
            {notes.length} items
       </span>
      </div>

    </section>
    </Link>
  );
}
