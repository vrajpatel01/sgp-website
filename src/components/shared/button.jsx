export default function Button({ label, width, disabled, onClick }) {
    return (
        <div>
            {/* <input className={`md:w-${width !== undefined ? `[${width}]` : 'w-auto'} w-full bg-primary text-white rounded-md px-4 py-2 cursor-pointer text-subtitle-16 disabled:bg-black disabled:cursor-not-allowed`} value={label} type="submit" name={label} id={label} /> */}
            <button onClick={onClick} disabled={disabled} className={`md:w-${width !== undefined ? `[${width}]` : 'w-auto'} w-full bg-primary-text text-white rounded-md px-4 py-2 cursor-pointer text-subtitle-16 disabled:cursor-not-allowed`} value={label} type="submit" name={label} id={label} >
                {label}
            </button>
        </div>
    );
}