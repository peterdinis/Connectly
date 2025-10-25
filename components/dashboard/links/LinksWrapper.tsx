'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, GripVertical, LogIn, ExternalLink } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { EmojiPicker } from '@/components/shared/EmojiPicker';
import { useToast } from '@/hooks/useToast';
import { Link, Page } from '@/types/ApplicationTypes';
import { nanoid } from 'nanoid';
import { useKindeBrowserClient, LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';

const LinksWrapper: FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState<Page | null>(null);
    const [isCreatingPage, setIsCreatingPage] = useState(false);
    const { toast } = useToast();
    
    // Kinde authentication
    const { 
        user, 
        isAuthenticated, 
        isLoading: authLoading,
        getToken 
    } = useKindeBrowserClient();

    // Načítať page a linky iba ak používateľ existuje
    useEffect(() => {
        const loadUserData = async () => {
            if (!isAuthenticated || !user) {
                return;
            }

            setIsLoading(true);

            try {
                const token = await getToken();
                
                // Načítať pages používateľa
                const pagesResponse = await fetch(`/api/pages?userId=${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    }
                });

                if (pagesResponse.ok) {
                    const pagesData = await pagesResponse.json();
                    const page = pagesData.data?.[0] || null;
                    
                    if (page) {
                        setCurrentPage(page);
                        
                        // Načítať linky pre túto stránku
                        const linksResponse = await fetch(`/api/links?pageId=${page.id}`, {
                            headers: {
                                ...(token && { 'Authorization': `Bearer ${token}` })
                            }
                        });
                        
                        if (linksResponse.ok) {
                            const linksData = await linksResponse.json();
                            setLinks(linksData.data || []);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load your data',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated && user) {
            loadUserData();
        }
    }, [isAuthenticated, user, toast, getToken]);

    const createPage = async () => {
        if (!user) return;

        setIsCreatingPage(true);

        try {
            const token = await getToken();
            const newPageData = {
                userId: user.id,
                title: `${user.given_name || user.family_name || user.email}'s Links`,
                slug: `page-${nanoid(8)}`,
                description: 'My links page',
                isPublished: true,
            };

            const response = await fetch('/api/pages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(newPageData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to create page: ${response.status} ${errorText}`);
            }

            const result = await response.json();
            setCurrentPage(result.page);
            
            toast({
                title: 'Page created',
                description: 'Your page has been created successfully.',
            });
        } catch (error) {
            console.error('Error creating page:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to create page';
            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
        } finally {
            setIsCreatingPage(false);
        }
    };

    const addLink = async () => {
        if (!currentPage || !user) return;

        const newLink: Omit<Link, 'id' | 'createdAt'> = {
            pageId: currentPage.id,
            title: 'New Link',
            url: 'https://example.com',
            isActive: true,
            order: links.length,
            icon: '🔗',
        };

        try {
            const token = await getToken();
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(newLink),
            });

            if (response.ok) {
                const result = await response.json();
                const updatedLinks = [...links, result.link];
                setLinks(updatedLinks);
                
                toast({
                    title: 'Link created',
                    description: 'Your new link has been added.',
                });
            } else {
                throw new Error(`Failed to create link: ${response.status}`);
            }
        } catch (error) {
            console.error('Error creating link:', error);
            toast({
                title: 'Error',
                description: 'Failed to create link',
                variant: 'destructive',
            });
        }
    };

    const updateLink = async (id: string, updates: Partial<Link>) => {
        try {
            const token = await getToken();
            const response = await fetch(`/api/links/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(updates),
            });

            if (response.ok) {
                const updatedLinks = links.map((link) => 
                    link.id === id ? { ...link, ...updates } : link
                );
                setLinks(updatedLinks);
            } else {
                throw new Error('Failed to update link');
            }
        } catch (error) {
            console.error('Error updating link:', error);
            toast({
                title: 'Error',
                description: 'Failed to update link',
                variant: 'destructive',
            });
        }
    };

    const deleteLink = async (id: string) => {
        try {
            const token = await getToken();
            const response = await fetch(`/api/links/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedLinks = links.filter((link) => link.id !== id);
                setLinks(updatedLinks);
                toast({
                    title: 'Link deleted',
                    description: 'The link has been removed.',
                });
            } else {
                throw new Error('Failed to delete link');
            }
        } catch (error) {
            console.error('Error deleting link:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete link',
                variant: 'destructive',
            });
        }
    };

    const handleReorder = async (newLinks: Link[]) => {
        const reorderedLinks = newLinks.map((link, idx) => ({
            ...link,
            order: idx,
        }));
        setLinks(reorderedLinks);

        // Update order in database
        try {
            const token = await getToken();
            await fetch('/api/links/reorder', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({
                    links: reorderedLinks.map(link => ({ id: link.id, order: link.order }))
                }),
            });
        } catch (error) {
            console.error('Error reordering links:', error);
            toast({
                title: 'Error',
                description: 'Failed to save link order',
                variant: 'destructive',
            });
        }
    };

    const viewLivePage = () => {
        if (currentPage) {
            window.open(`/${currentPage.slug}`, '_blank');
        }
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card className="w-full max-w-md">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <div className="rounded-full bg-muted p-4 mb-6">
                            <LogIn className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-center">Sign in to manage your links</h3>
                        <p className="text-muted-foreground mb-6 text-center">
                            Please sign in to create and manage your link page
                        </p>
                        <div className="flex gap-3">
                            <LoginLink>
                                <Button>Sign In</Button>
                            </LoginLink>
                            <RegisterLink>
                                <Button variant="outline">Sign Up</Button>
                            </RegisterLink>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your data...</p>
                </div>
            </div>
        );
    }

    // Ak používateľ nemá page
    if (!currentPage) {
        return (
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Manage Links</h1>
                        <p className="text-muted-foreground">Create your page to start adding links</p>
                    </div>
                </div>

                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No page yet</h3>
                        <p className="text-muted-foreground mb-4 text-center">
                            Create your first page to start sharing your links with the world
                        </p>
                        <Button 
                            onClick={createPage} 
                            disabled={isCreatingPage}
                            className="gap-2"
                        >
                            {isCreatingPage ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Create Page
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Ak používateľ má page
    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Manage Links</h1>
                    <p className="text-muted-foreground">Create and organize your links</p>
                    {currentPage && (
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-sm text-muted-foreground">
                                Page: {currentPage.title}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                                currentPage.isPublished 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                                {currentPage.isPublished ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {currentPage && (
                        <Button 
                            variant="outline" 
                            onClick={viewLivePage}
                            className="gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </Button>
                    )}
                    <Button onClick={addLink} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Link
                    </Button>
                </div>
            </div>

            {links.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="rounded-full bg-muted p-4 mb-4">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No links yet</h3>
                        <p className="text-muted-foreground mb-4">
                            Get started by creating your first link
                        </p>
                        <Button onClick={addLink} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create Link
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Reorder.Group
                    axis="y"
                    values={links}
                    onReorder={handleReorder}
                    className="space-y-4"
                >
                    {links.map((link) => (
                        <Reorder.Item key={link.id} value={link}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className="cursor-move hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="pt-2 cursor-grab active:cursor-grabbing">
                                                <GripVertical className="w-5 h-5 text-muted-foreground" />
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`title-${link.id}`}>
                                                            Title
                                                        </Label>
                                                        <Input
                                                            id={`title-${link.id}`}
                                                            value={link.title}
                                                            onChange={(e) =>
                                                                updateLink(link.id, {
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                            placeholder="Link title"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`icon-${link.id}`}>
                                                            Icon
                                                        </Label>
                                                        <EmojiPicker
                                                            value={link.icon}
                                                            onChange={(emoji) =>
                                                                updateLink(link.id, { icon: emoji })
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`url-${link.id}`}>URL</Label>
                                                    <Input
                                                        id={`url-${link.id}`}
                                                        value={link.url}
                                                        onChange={(e) =>
                                                            updateLink(link.id, {
                                                                url: e.target.value,
                                                            })
                                                        }
                                                        placeholder="https://example.com"
                                                        type="url"
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between pt-2">
                                                    <div className="flex items-center gap-2">
                                                        <Switch
                                                            id={`active-${link.id}`}
                                                            checked={link.isActive}
                                                            onCheckedChange={(checked) =>
                                                                updateLink(link.id, {
                                                                    isActive: checked,
                                                                })
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={`active-${link.id}`}
                                                            className="cursor-pointer"
                                                        >
                                                            {link.isActive ? 'Active' : 'Inactive'}
                                                        </Label>
                                                    </div>

                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => deleteLink(link.id)}
                                                        className="gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            )}
        </div>
    );
};

export default LinksWrapper;