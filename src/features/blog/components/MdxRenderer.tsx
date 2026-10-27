export default function HtmlRenderer({ source }: { source: string }) {
    return (
        <div
            className="html-content"
            dangerouslySetInnerHTML={{ __html: source }}
        />
    )
}
