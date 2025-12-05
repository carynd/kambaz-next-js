"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import "./tiptap.css";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ value, onChange, placeholder }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editable: true,
    autofocus: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[100px] p-3 border rounded",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor border rounded">
      {/* Toolbar */}
      <div className="border-bottom p-2 d-flex gap-1 flex-wrap bg-light">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("bold") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("italic") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("strike") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <div className="border-start mx-1"></div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("heading", { level: 1 }) ? "btn-primary" : "btn-outline-secondary"}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("heading", { level: 2 }) ? "btn-primary" : "btn-outline-secondary"}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("heading", { level: 3 }) ? "btn-primary" : "btn-outline-secondary"}`}
          title="Heading 3"
        >
          H3
        </button>
        <div className="border-start mx-1"></div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("bulletList") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("orderedList") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Numbered List"
        >
          1. List
        </button>
        <div className="border-start mx-1"></div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("blockquote") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Quote"
        >
          " Quote
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          onMouseDown={(e) => e.preventDefault()}
          className={`btn btn-sm ${editor.isActive("codeBlock") ? "btn-primary" : "btn-outline-secondary"}`}
          title="Code Block"
        >
          &lt;/&gt; Code
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
