'use client';

import { FC, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Eye,
    MousePointerClick,
    TrendingUp,
    BarChart3,
    Trash2,
    Activity,
    Clock,
    Target,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalyticsSummary } from '@/types/ApplicationTypes';
import { useToast } from '@/hooks/useToast';

const AnalyticsWrapper: FC = () => {
    const [summary, setSummary] = useState<AnalyticsSummary>({
        totalViews: 0,
        totalClicks: 0,
        clickThroughRate: 0,
        topLinks: [],
        viewsByDate: [],
        averageClicksPerSession: 0,
        bounceRate: 0,
        viewsByHour: [],
        recentActivity: [],
        linkPerformanceComparison: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const loadAnalytics = () => {
        setIsLoading(false);
    };

    useEffect(() => {
        loadAnalytics();
    }, []);

    const handleClearAnalytics = () => {
        if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            loadAnalytics();
            toast({
                title: 'Analytics cleared',
                description: 'All analytics data has been removed.',
            });
        }
    };

    const handleExportData = () => {
        const dataStr = JSON.stringify(summary, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        toast({
            title: 'Data exported',
            description: 'Analytics data has been downloaded.',
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Views',
            value: summary.totalViews,
            icon: Eye,
            description: 'Page visits',
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Total Clicks',
            value: summary.totalClicks,
            icon: MousePointerClick,
            description: 'Link clicks',
            color: 'text-green-500',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Click Rate',
            value: `${summary.clickThroughRate.toFixed(1)}%`,
            icon: TrendingUp,
            description: 'Clicks per view',
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Avg Clicks/Session',
            value: summary.averageClicksPerSession.toFixed(2),
            icon: Target,
            description: 'Engagement rate',
            color: 'text-orange-500',
            bgColor: 'bg-orange-50',
        },
        {
            title: 'Bounce Rate',
            value: `${summary.bounceRate.toFixed(1)}%`,
            icon: Activity,
            description: 'Views without clicks',
            color: 'text-red-500',
            bgColor: 'bg-red-50',
        },
    ];

    const maxViews = Math.max(...summary.viewsByDate.map((d) => d.views), 1);
    const maxHourViews = Math.max(...summary.viewsByHour.map((h) => h.views), 1);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
                    <p className="text-muted-foreground">
                        Comprehensive insights into your page performance
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleExportData}
                        className="gap-2 bg-transparent"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Export
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClearAnalytics}
                        className="gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="relative overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Views Over Time</CardTitle>
                                <CardDescription>Last 7 days activity</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {summary.viewsByDate.map((day, index) => {
                                        const percentage = (day.views / maxViews) * 100;
                                        const date = new Date(day.date);
                                        const dayName = date.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                        });

                                        return (
                                            <div key={day.date} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground font-medium">
                                                        {dayName}
                                                    </span>
                                                    <span className="font-bold text-blue-600">
                                                        {day.views} views
                                                    </span>
                                                </div>
                                                <motion.div
                                                    className="h-3 bg-muted rounded-full overflow-hidden"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ delay: 0.4 + index * 0.05 }}
                                                >
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{
                                                            delay: 0.5 + index * 0.05,
                                                            duration: 0.5,
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Hourly Breakdown
                                </CardTitle>
                                <CardDescription>Views by hour of day</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {summary.viewsByHour
                                        .filter((h) => h.views > 0)
                                        .sort((a, b) => b.views - a.views)
                                        .slice(0, 8)
                                        .map((hour, index) => {
                                            const percentage = (hour.views / maxHourViews) * 100;
                                            const timeLabel = `${hour.hour.toString().padStart(2, '0')}:00`;

                                            return (
                                                <div key={hour.hour} className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground font-medium">
                                                            {timeLabel}
                                                        </span>
                                                        <span className="font-bold text-purple-600">
                                                            {hour.views} views
                                                        </span>
                                                    </div>
                                                    <motion.div
                                                        className="h-2 bg-muted rounded-full overflow-hidden"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: '100%' }}
                                                        transition={{ delay: 0.45 + index * 0.03 }}
                                                    >
                                                        <motion.div
                                                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${percentage}%` }}
                                                            transition={{
                                                                delay: 0.5 + index * 0.03,
                                                                duration: 0.4,
                                                            }}
                                                        />
                                                    </motion.div>
                                                </div>
                                            );
                                        })}
                                    {summary.viewsByHour.every((h) => h.views === 0) && (
                                        <div className="text-center py-8">
                                            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                            <p className="text-muted-foreground">
                                                No hourly data yet
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Performing Links</CardTitle>
                            <CardDescription>
                                Most clicked links with engagement metrics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {summary.topLinks.length === 0 ? (
                                <div className="text-center py-8">
                                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground">No link clicks yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {summary.topLinks.map((link, index) => {
                                        const maxClicks = summary.topLinks[0].clicks;
                                        const percentage = (link.clicks / maxClicks) * 100;

                                        return (
                                            <div key={link.linkId} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <span className="font-bold text-muted-foreground">
                                                            #{index + 1}
                                                        </span>
                                                        <span className="font-medium truncate">
                                                            {link.linkTitle}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-green-600 ml-2">
                                                        {link.clicks} clicks
                                                    </span>
                                                </div>
                                                <motion.div
                                                    className="h-3 bg-muted rounded-full overflow-hidden"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%' }}
                                                    transition={{ delay: 0.5 + index * 0.05 }}
                                                >
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{
                                                            delay: 0.6 + index * 0.05,
                                                            duration: 0.5,
                                                        }}
                                                    />
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Link Performance Comparison</CardTitle>
                            <CardDescription>Detailed metrics for all links</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {summary.linkPerformanceComparison.length === 0 ? (
                                <div className="text-center py-8">
                                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground">No links created yet</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-3 px-2 font-semibold text-sm">
                                                    Link Title
                                                </th>
                                                <th className="text-right py-3 px-2 font-semibold text-sm">
                                                    Clicks
                                                </th>
                                                <th className="text-right py-3 px-2 font-semibold text-sm">
                                                    CTR
                                                </th>
                                                <th className="text-right py-3 px-2 font-semibold text-sm">
                                                    Performance
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {summary.linkPerformanceComparison
                                                .sort((a, b) => b.clicks - a.clicks)
                                                .map((link, index) => (
                                                    <motion.tr
                                                        key={link.linkId}
                                                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + index * 0.05 }}
                                                    >
                                                        <td className="py-3 px-2 font-medium">
                                                            {link.linkTitle}
                                                        </td>
                                                        <td className="py-3 px-2 text-right font-semibold text-green-600">
                                                            {link.clicks}
                                                        </td>
                                                        <td className="py-3 px-2 text-right font-semibold text-purple-600">
                                                            {link.ctr.toFixed(1)}%
                                                        </td>
                                                        <td className="py-3 px-2 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                                                        style={{
                                                                            width: `${Math.min(link.ctr * 10, 100)}%`,
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Recent Activity
                            </CardTitle>
                            <CardDescription>Latest interactions with your page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {summary.recentActivity.length === 0 ? (
                                <div className="text-center py-8">
                                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-muted-foreground">No activity yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {summary.recentActivity.map((event, index) => {
                                        const time = new Date(event.timestamp).toLocaleTimeString(
                                            'en-US',
                                            {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            },
                                        );
                                        const date = new Date(event.timestamp).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                            },
                                        );

                                        return (
                                            <motion.div
                                                key={event.id}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.55 + index * 0.03 }}
                                            >
                                                <div
                                                    className={`p-2 rounded-full ${
                                                        event.type === 'view'
                                                            ? 'bg-blue-100 text-blue-600'
                                                            : 'bg-green-100 text-green-600'
                                                    }`}
                                                >
                                                    {event.type === 'view' ? (
                                                        <Eye className="w-4 h-4" />
                                                    ) : (
                                                        <MousePointerClick className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        {event.type === 'view'
                                                            ? 'Page viewed'
                                                            : `Clicked: ${event.linkTitle}`}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {date} at {time}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyticsWrapper;
