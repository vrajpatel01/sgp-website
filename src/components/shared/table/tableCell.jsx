export default function TableCell({ content, className = '', onClick }) {
    return (<td onClick={onClick} className={`p-3 whitespace-nowrap truncate max-w-44 ${className}`}>{content}</td>)
}