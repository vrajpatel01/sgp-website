import TableCell from "./tableCell"
import { useState } from "react"

export default function TableRow({ children, className, checkBox = false, id, onChange, header }) {
    const [select, setSelect] = useState(false)
    return (
        <tr className={`cursor-pointer bg-opacity-10 text-light-text ${select && 'bg-primary text-primary'} ${className} ${header && 'font-medium text-primary-text'}`}>
            {checkBox && <TableCell content={<input
                onChange={(e) => {
                    setSelect(e.target.checked)
                    onChange(id, e.target.checked)
                }}
                type="checkbox"
                className="accent-primary cursor-pointer w-5 h-5 " />} />}
            {children}
        </tr>
    )
}