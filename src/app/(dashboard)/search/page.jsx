'use client';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useSearchUser } from "./services/query";
import TableCell from "@/components/shared/table/tableCell";
import TableRow from "@/components/shared/table/tableRow";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const from = searchParams.get('role');
    const [role, setRole] = useState(from || 'hod');
    const [search, setSearch] = useState('');
    const searchData = useSearchUser({ role, name: search });
    const router = useRouter();

    const refetch = () => {
        searchData.refetch();
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            searchData.refetch();
        }, 1000);
        return () => clearTimeout(debounce);
    }, [search]);

    useEffect(() => {
        console.log("Role:", role);
        if (role && typeof role === 'string') {
            router.replace(`/search?role=${role}`);
        }
    }, [role]);

    const faculties = (role === 'hod') || (role === 'faculty')
    const student = role === 'student';
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-title-28">Search</h1>
                <div className="flex justify-end items-center gap-3">
                    <Select value={role} onValueChange={value => {
                        refetch();
                        setRole(value);
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hod">hod</SelectItem>
                            <SelectItem value="faculty">faculty</SelectItem>
                            <SelectItem value="student">student</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input value={search} onChange={e => setSearch(e.target.value)} className="md:min-w-[300px]" placeholder="search..." />
                </div>
            </div>
            <div className="table-container mb-6 overflow-x-auto no-scroll bg-white rounded-md w-full my-5 border-border border-[.5px]">
                <table className="w-full table-auto">
                    <thead>
                        <TableRow header>
                            <TableCell content='Name' />
                            <TableCell content='Email' />
                            <TableCell content='Role' />
                            <TableCell content='Institute' />
                            <TableCell content='Department' />
                            {student ? <TableCell content='phone number' /> : null}
                            {student ? <TableCell content='semester' /> : null}
                            {student ? <TableCell content='enrollment' /> : null}
                            {student ? <TableCell content='division' /> : null}
                            {faculties ? <TableCell content='phone number' /> : null}
                            {faculties ? <TableCell content='Employee Code' /> : null}
                            {faculties ? <TableCell content='Designation' /> : null}
                            {faculties ? <TableCell content='Subject Code' /> : null}
                            {faculties ? <TableCell content='Subject Name' /> : null}
                        </TableRow>
                    </thead>
                    <tbody>
                        {searchData.isLoading && Array(15).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                <TableCell content={<Skeleton height={30} width={300} />} />
                                {student ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {student ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {student ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {student ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {faculties ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {faculties ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {faculties ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {faculties ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                                {faculties ? <TableCell content={<Skeleton height={30} width={300} />} /> : null}
                            </TableRow>
                        ))}
                        {searchData.isSuccess && searchData.data.data.map(user => (
                            <TableRow key={user.id}>
                                <TableCell content={user.name} />
                                <TableCell content={user.email} />
                                <TableCell content={user.role} />
                                <TableCell content={user.institute.name} />
                                <TableCell content={user.department.name} />
                                {student ? <TableCell content={user?.phoneNumber} /> : null}
                                {student ? <TableCell content={user?.semester} /> : null}
                                {student ? <TableCell content={user?.rollNumber} /> : null}
                                {student ? <TableCell content={user?.division} /> : null}
                                {faculties ? <TableCell content={user?.mobileNumber} /> : null}
                                {faculties ? <TableCell content={user?.employeeCode} /> : null}
                                {faculties ? <TableCell content={user?.designation} /> : null}
                                {faculties ? <TableCell content={user?.subjectCode} /> : null}
                                {faculties ? <TableCell content={user?.subjectName} /> : null}
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}