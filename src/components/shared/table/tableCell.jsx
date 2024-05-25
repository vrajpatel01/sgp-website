export default function TableCell({ content, className }) {
    return (<td className={`p-3 whitespace-nowrap truncate max-w-44 ${className}`}>{content}</td>)
}