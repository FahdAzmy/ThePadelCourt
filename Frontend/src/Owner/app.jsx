/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";

const Appp = ({ product, setEtit, openRemove }) => {
  const handleEdit = () => {
    setEtit(product);
  };

  return (
    <div className="grid grid-cols-4 gap-sm p-md items-center glass-row transition-colors border-b border-white/5 group">
      {/* Court Name & Location */}
      <div className="flex flex-col gap-1">
        <div className="font-body-md text-body-md text-primary font-semibold">{product.name}</div>
        <div className="font-label-sm text-label-sm text-on-surface-variant truncate">{product.location}</div>
      </div>

      {/* Status (Mocked as Available for UI) */}
      <div>
        <span className="inline-flex items-center gap-xs px-sm py-xs rounded-full bg-surface-variant border border-white/15 text-on-surface-variant font-label-sm text-label-sm">
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          Active
        </span>
      </div>

      {/* Price */}
      <div className="hidden md:flex flex-col">
        <span className="font-body-md text-body-md text-primary-container font-bold">${product.pricePerHour}</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">per hr</span>
      </div>

      {/* Action */}
      <div className="text-right flex items-center justify-end gap-2 md:gap-4">
        <button
          className="p-2 text-on-surface-variant hover:text-primary-container bg-white/5 hover:bg-white/10 rounded-md transition-all"
          onClick={handleEdit}
          title="Edit"
        >
          <Edit className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button
          className="p-2 text-on-surface-variant hover:text-error bg-white/5 hover:bg-white/10 rounded-md transition-all"
          onClick={openRemove}
          title="Delete"
        >
          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default Appp;
