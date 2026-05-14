import { Bold, Heading2, Italic, List, Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const tools = [
  ["bold", Bold],
  ["italic", Italic],
  ["formatBlock", Heading2, "h2"],
  ["insertUnorderedList", List],
  ["formatBlock", Quote, "blockquote"]
];

export default function RichTextEditor({ value, onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value || "";
  }, [value]);

  const run = (command, arg) => {
    document.execCommand(command, false, arg);
    onChange(ref.current.innerHTML);
  };

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-slate-300/40 bg-white/50 dark:bg-slate-950/40">
      <div className="flex flex-wrap gap-2 border-b border-slate-300/30 p-3">
        {tools.map(([command, Icon, arg]) => (
          <button type="button" key={`${command}-${arg || ""}`} className="btn-ghost !h-10 !w-10 !p-0" onClick={() => run(command, arg)} aria-label={command}>
            <Icon size={17} />
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        className="min-h-72 px-5 py-4 text-base leading-8 outline-none"
        onInput={() => onChange(ref.current.innerHTML)}
        data-placeholder="Write your story..."
      />
    </div>
  );
}
