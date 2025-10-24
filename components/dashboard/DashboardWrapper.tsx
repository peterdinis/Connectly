'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    LinkIcon,
    Eye,
    MousePointerClick,
    TrendingUp,
    Plus,
    ExternalLink,
    Activity,
    Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalLinks: 0,
        activeLinks: 0,
        inactiveLinks: 0,
        totalViews: 0,
        totalClicks: 0,
        clickThroughRate: 0,
        topLink: null as { title: string; clicks: number } | null,
        recentViews: [] as { date: string; views: number }[],
    });
    const [recentLinks, setRecentLinks] = useState<any[]>([]);

    const statCards = [
        {
            title: 'Total Links',
            value: stats.totalLinks,
            icon: LinkIcon,
            description: `${stats.activeLinks} active, ${stats.inactiveLinks} inactive`,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Page Views',
            value: stats.totalViews,
            icon: Eye,
            description: 'Total page visits',
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
            gradient: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Link Clicks',
            value: stats.totalClicks,
            icon: MousePointerClick,
            description: 'Total link interactions',
            color: 'text-green-500',
            bgColor: 'bg-green-50',
            gradient: 'from-green-500 to-green-600',
        },
        {
            title: 'Engagement Rate',
            value: `${stats.clickThroughRate.toFixed(1)}%`,
            icon: TrendingUp,
            description: 'Click-through rate',
            color: 'text-orange-500',
            bgColor: 'bg-orange-50',
            gradient: 'from-orange-500 to-orange-600',
        },
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Dashboard Overview
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Welcome back! Here's what's happening with your links.
                    </p>
                </motion.div>
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                                <div
                                    className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
                                />
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <div
                                        className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}
                                    >
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Activity className="w-5 h-5" />
                                            Recent Activity
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Last 3 days performance
                                        </p>
                                    </div>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href="/dashboard/analytics">
                                            View All
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>TODO</CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-500" />
                                    Top Performer
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">Most clicked link</p>
                            </CardHeader>
                            <CardContent>
                                {stats.topLink ? (
                                    <motion.div
                                        className="space-y-4"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-lg mb-1 line-clamp-2">
                                                        {stats.topLink.title}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Best performing link
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
                                                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full w-full" />
                                                </div>
                                                <span className="text-2xl font-bold text-orange-600">
                                                    {stats.topLink.clicks}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Total clicks
                                            </p>
                                        </div>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full bg-transparent"
                                        >
                                            <Link href="/dashboard/analytics">View Details</Link>
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                                        <p className="text-muted-foreground text-sm">
                                            No clicks yet
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Start sharing your links
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <LinkIcon className="w-5 h-5" />
                                        Your Links
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Quick access to your recent links
                                    </p>
                                </div>
                                <Button asChild size="sm" className="gap-2">
                                    <Link href="/dashboard/links">
                                        <Plus className="w-4 h-4" />
                                        Add Link
                                    </Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {recentLinks.length === 0 ? (
                                <div className="text-center py-12">
                                    <LinkIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                    <p className="text-muted-foreground mb-4">
                                        No links created yet
                                    </p>
                                    <Button asChild>
                                        <Link href="/dashboard/links">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Your First Link
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {recentLinks.map((link, index) => (
                                        <motion.div
                                            key={link.id}
                                            className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + index * 0.05 }}
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                    <LinkIcon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">
                                                        {link.title}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {link.url}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        link.isActive
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {link.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {recentLinks.length >= 5 && (
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="w-full mt-4 bg-transparent"
                                        >
                                            <Link href="/dashboard/links">View All Links</Link>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-blue-100">
                                    <LinkIcon className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Quick Action</p>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="h-auto p-0 text-blue-600 font-semibold"
                                    >
                                        <Link href="/dashboard/links">Manage Links</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-purple-100">
                                    <Sparkles className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Customize</p>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="h-auto p-0 text-purple-600 font-semibold"
                                    >
                                        <Link href="/dashboard/design">Design Settings</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-lg bg-green-100">
                                    <Activity className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Insights</p>
                                    <Button
                                        asChild
                                        variant="link"
                                        className="h-auto p-0 text-green-600 font-semibold"
                                    >
                                        <Link href="/dashboard/analytics">View Analytics</Link>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
