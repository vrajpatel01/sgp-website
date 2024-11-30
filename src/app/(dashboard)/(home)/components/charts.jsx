"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { LabelList, Pie, PieChart } from "recharts"
const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
]

export function ProjectSubmissionChart({ data }) {
    let chartData = [];

    const chartConfig = {
        pending: {
            label: "pending",
            color: colors[0],
        },
        approved: {
            label: "approved",
            color: colors[1],
        },
        rejected: {
            label: "rejected",
            color: colors[2],
        },
        total: {
            label: "total",
            color: colors[3]
        }
    }

    data?.data?.data.map((item) => {
        chartData.push({
            week: item.week,
            pending: item.pendingSubmissions,
            approved: item.approvedSubmissions,
            rejected: item.rejectedSubmissions,
            total: item.totalSubmissions
        })
    })

    const maxSubmissions = data?.data?.data.reduce((max, item) => item.totalSubmissions > max ? item.totalSubmissions : max, 0) + 2;

    const isValueAvailable = data?.error?.response?.data?.success;
    if (isValueAvailable == false) {
        chartData = [];
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly reports submission data</CardTitle>
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
                        <YAxis tickLine={true} axisLine={false} domain={[0, maxSubmissions]} />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false} />
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
                        <Area
                            dataKey="total"
                            type="natural"
                            fill={colors[0]}
                            fillOpacity={0.4}
                            stroke={colors[0]} />
                        <Area
                            dataKey="approved"
                            type="natural"
                            fill={colors[1]}
                            fillOpacity={0.4}
                            stroke={colors[1]} />
                        <Area
                            dataKey="pending"
                            type="natural"
                            fill={colors[2]}
                            fillOpacity={0.4}
                            stroke={colors[2]} />
                        <Area
                            dataKey="rejected"
                            type="natural"
                            fill={colors[3]}
                            fillOpacity={0.4}
                            stroke={colors[3]} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {isValueAvailable == false && "No data available for this selected values"}
                </div>
            </CardFooter>
        </Card>
    )
}

export function TechnologyChart({ data }) {
    const actualData = data?.data?.data;
    const chartConfig = {
        technology: {
            label: "technology",
        },
    }
    let chartData = []
    // if (data.isPending) {
    //     return <div>Loading...</div>
    // }

    const randomNumber = () => {
        return Math.floor(Math.random() * 5);
    }

    data.isSuccess && actualData.forEach(element => {
        chartConfig[element.technology.toLowerCase()] = {
            label: element.technology,
            color: colors[randomNumber()]
        }
        chartData.push({
            technology: element.technology.toLowerCase(),
            count: element.count,
            fill: colors[randomNumber()]
        })
    });

    const isValueAvailable = data?.error?.response?.data?.success;
    if (isValueAvailable == false) {
        chartData = [];
    }
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Technology Data</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="technology" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="count">
                            <LabelList
                                dataKey="technology"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {isValueAvailable == false && "No data available for this selected values"}
                </div>
            </CardFooter>
        </Card>
    )
}

export function CategoryChart({ data }) {
    const actualData = data?.data?.data;
    const chartConfig = {
        category: {
            label: "category",
        },
    }
    let chartData = []
    // if (data.isPending) {
    //     return null
    // }

    const randomNumber = () => {
        return Math.floor(Math.random() * 5);
    }

    data.isSuccess && actualData.forEach(element => {
        chartConfig[element.category.toLowerCase()] = {
            label: element.category,
            color: colors[randomNumber()]
        }
        chartData.push({
            category: element.category.toLowerCase(),
            count: element.count,
            fill: colors[randomNumber()]
        })
    });

    const isValueAvailable = data?.error?.response?.data?.success;
    if (isValueAvailable == false) {
        chartData = [];
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Category Data</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="category" hideLabel />}
                        />
                        <Pie data={chartData} dataKey="count">
                            <LabelList
                                dataKey="category"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value) =>
                                    chartConfig[value]?.label
                                }
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {isValueAvailable == false && "No data available for this selected values"}
                </div>
            </CardFooter>
        </Card>
    )
}