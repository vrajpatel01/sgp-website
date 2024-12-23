import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react";
import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";



export default function ContactUs() {
    return (
        <div className="space-y-4">
            <h1 className="text-title-28">Contact Us</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ContactUsCard
                    name="Vraj Patel"
                    studentId="D23DCS157"
                    email="patelvraj.dev@gmail.com"
                    role={["Full Stack Developer", "Flutter Developer"]}
                    social={<div className="flex justify-center items-center space-x-2">
                        <Link target="_blank" href="https://www.linkedin.com/in/vrajsp">
                            <FaLinkedinIn size={18} />
                        </Link>
                    </div>} />
                <ContactUsCard
                    name="Dhruvgiri Goswam"
                    studentId="D23DCS145"
                    email="dhruvgiriwork@gmail.com"
                    role={["Full Stack Developer"]}
                    social={<div className="flex justify-center items-center space-x-2">
                        <Link target="_blank" href='https://dhruvgiri.in/'>
                            <IoMdGlobe size={18} />
                        </Link>
                        <Link target="_blank" href="https://www.linkedin.com/in/dhruvgiri-goswami">
                            <FaLinkedinIn size={18} />
                        </Link>
                    </div>} />
                <ContactUsCard
                    name="Shaswat Kheni"
                    studentId="D23DCS141"
                    email="skheniwork@gmail.com"
                    role={["Flutter Developer", "Frontend Developer"]}
                    social={<div className="flex justify-center items-center space-x-2">
                        <Link target="_blank" href="https://www.linkedin.com/in/shaswat-kheni-487018299">
                            <FaLinkedinIn size={18} />
                        </Link>
                    </div>} />
            </div>
        </div>
    )
}

function ContactUsCard({
    name,
    studentId,
    email,
    role,
    social
}) {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="whitespace-nowrap">{name}</CardTitle>
                    {social}
                </div>
                <CardDescription>
                    {studentId}
                </CardDescription>
                <CardDescription className="flex items-center space-x-2">
                    <Mail size={18} />
                    <span>
                        {email}
                    </span>
                </CardDescription>
                <div className="flex justify-start items-center gap-2 !mt-4 flex-wrap">
                    {role.map((e, index) => {
                        return <Badge key={index} className='whitespace-nowrap'>{e}</Badge>
                    })}
                </div>
            </CardHeader>
        </Card>
    )
}