import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";


export default function ContactUs() {
    return (
        <div className="space-y-4">
            <h1 className="text-title-28">Contact Us</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ContactUsCard />
                <ContactUsCard />
                <ContactUsCard />
            </div>
        </div>
    )
}

function ContactUsCard() {
    return (
        <Card className="w-full overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="whitespace-nowrap">Vraj Patel</CardTitle>
                    <FaLinkedinIn />
                </div>
                <CardDescription>
                    D23DCS157
                </CardDescription>
                <CardDescription className="flex items-center space-x-2">
                    <Mail size={18} />
                    <span>
                        patelvraj.dev@gmail.com
                    </span>
                </CardDescription>
                <div className="flex justify-start items-center space-x-2 space-y-2 !mt-4 flex-wrap">
                    <Badge className='whitespace-nowrap'>frontend developer</Badge>
                    <Badge className='whitespace-nowrap'>ui/ux designer</Badge>
                </div>
                <CardDescription>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, incidunt delectus. Tenetur modi veniam totam.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}