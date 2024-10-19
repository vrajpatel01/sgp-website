"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export function TotalSubmissions({ data }) {
    let chartData = [];

    const chartConfig = {
        groups: {
            label: "groups",
            color: "hsl(var(--primary))",
        }
    }

    data?.data?.data?.map((item) => {
        chartData.push({
            week: item.week,
            groups: item.totalSubmissions
        })
    })

    if (data?.error?.response?.data?.success == false) {
        console.log(data?.error?.response?.data?.success);
        chartData = [];
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Submissions</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="!max-h-[200px] w-full">
                    <AreaChart accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dashed" />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area dataKey="groups" fill="var(--color-desktop)" radius={4} />
                        {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}

export function PendingAndSuccessfulSubmissions({ data }) {
    let chartData = [];

    const chartConfig = {
        pending: {
            label: "pending",
            color: "hsl(var(--primary))",
        },
        successful: {
            label: "successful",
            color: "hsl(var(--secondary))",
        },
        approved: {
            label: "approved",
            color: "hsl(var(--success))",
        }
    }

    data?.data?.data?.map((item) => {
        chartData.push({
            week: item.week,
            pending: item.pendingSubmissions,
            successful: item.submittedSubmissions,
            approved: item.approvedSubmissions
        })
    })

    if (data?.error?.response?.data?.success == false) {
        console.log(data?.error?.response?.data?.success);
        chartData = [];
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pending & Successful</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="!max-h-[200px] w-full">
                    <AreaChart accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dashed" />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area dataKey="pending" fill="var(--color-desktop)" radius={4} />
                        <Area dataKey="successful" fill="var(--color-desktop)" radius={4} />
                        <Area dataKey="approved" fill="var(--color-desktop)" radius={4} />
                        {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            {/* <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter> */}
        </Card>
    )
}
