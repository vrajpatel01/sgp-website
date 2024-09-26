import TableCell from "./tableCell"
import { useState } from "react"

export default function TableRow({ children, className = '', checkBox = false, id, onChange, header, onClick }) {
    const [select, setSelect] = useState(false)
    return (
        <tr onClick={onClick} className={`cursor-pointer bg-opacity-10 text-light-text ${!header && 'hover:bg-opacity-10 hover:bg-primary/10 hover:text-primary/90'}  ${select && 'bg-primary/10 text-primary/90'} ${className} ${header && 'font-medium text-primary-text'}`}>
            {checkBox && <TableCell onClick={e => e.stopPropagation()} content={<input
                onChange={(e) => {
                    e.stopPropagation()
                    setSelect(e.target.checked)
                    onChange(id, e.target.checked)
                }}
                type="checkbox"
                className="accent-primary cursor-pointer w-5 h-5 " />} />}
            {children}
        </tr>
    )
}