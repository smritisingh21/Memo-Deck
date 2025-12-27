import { Link } from "react-router-dom";
import { FolderCheck } from "lucide-react";



export default function FolderCard({ id, title, notes =[] }) {
  
  return (
    <Link to={`/folder/${id}`}>

    <section className="bg-primary/10 rounded-md p-4 shadow-md  
    space-y-5 m-6 hover:shadow-md hover:shadow-neutral-content/50 
    transition:bg-secondary/30 cursor-pointer">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-4">

            <FolderCheck size={20} />
            <h2 className="text-sm text-accent/40 font-semibold">
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
