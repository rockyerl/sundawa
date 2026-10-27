'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import {
    Bold,
    Italic,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Link as LinkIcon,
    Image as ImageIcon,
    Minus,
} from 'lucide-react'

interface TipTapEditorProps {
    value: string
    onChange: (value: string) => void
}

const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/blog/upload', {
        method: 'POST',
        body: formData,
    })

    if (res.ok) {
        const data = await res.json()
        return data.url
    }

    throw new Error('Failed to upload image')
}

const ToolbarButton = ({ active, onClick, children, title }: { active?: boolean; onClick: () => void; children: React.ReactNode; title: string }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded transition-colors ${
            active
                ? 'bg-[#DBC977]/20 text-[#DBC977]'
                : 'text-[#F8F8F8]/50 hover:text-[#F8F8F8] hover:bg-[#F8F8F8]/10'
        }`}
    >
        {children}
    </button>
)

const Separator = () => (
    <div className="w-px h-5 bg-[#F8F8F8]/10 mx-1" />
)

export default function TipTapEditor({ value, onChange }: TipTapEditorProps) {
    const editor = useEditor({
        immediatelyRender: true,
        extensions: [
            StarterKit.configure({
                link: false,
            }),
            TiptapImage.configure({
                inline: true,
                allowBase64: false,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-[#DBC977] underline',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write your blog content here... Use the toolbar above to format text, add images, and insert links.',
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) return null

    const addImage = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (!file) return

            try {
                const url = await uploadImage(file)
                editor.chain().focus().setImage({ src: url }).run()
            } catch (err) {
                console.error('Failed to upload image:', err)
            }
        }
        input.click()
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:')
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className="rounded-lg overflow-hidden border border-[#DBC977]/20">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 p-2 bg-[#0A192F] border-b border-[#DBC977]/10">
                <ToolbarButton
                    active={editor.isActive('heading', { level: 1 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    title="Heading 1"
                >
                    <Heading1 size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('heading', { level: 2 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    title="Heading 2"
                >
                    <Heading2 size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('heading', { level: 3 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    title="Heading 3"
                >
                    <Heading3 size={16} />
                </ToolbarButton>

                <Separator />

                <ToolbarButton
                    active={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    title="Strikethrough"
                >
                    <Strikethrough size={16} />
                </ToolbarButton>

                <Separator />

                <ToolbarButton
                    active={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <List size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Ordered List"
                >
                    <ListOrdered size={16} />
                </ToolbarButton>

                <Separator />

                <ToolbarButton
                    active={editor.isActive('blockquote')}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <Quote size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('codeBlock')}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    title="Code Block"
                >
                    <Code size={16} />
                </ToolbarButton>
                <ToolbarButton
                    active={editor.isActive('horizontalRule')}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <Minus size={16} />
                </ToolbarButton>

                <Separator />

                <ToolbarButton
                    active={editor.isActive('link')}
                    onClick={addLink}
                    title="Insert Link"
                >
                    <LinkIcon size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={addImage}
                    title="Insert Image"
                >
                    <ImageIcon size={16} />
                </ToolbarButton>
            </div>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                className="min-h-[400px] max-h-[600px] overflow-y-auto"
            />
        </div>
    )
}
