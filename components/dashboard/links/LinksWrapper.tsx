"use client"

import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { motion, Reorder } from "framer-motion"
import { EmojiPicker } from "@/components/shared/EmojiPicker"

const LinksWrapper: FC = () => {
  const [links, setLinks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: "New Link",
      url: "https://example.com",
      isActive: true,
      order: links.length,
    }
    const updatedLinks = [...links, newLink]
    setLinks(updatedLinks)
  }

  const updateLink = (id: string, updates: any) => {
    const updatedLinks = links.map((link) => (link.id === id ? { ...link, ...updates } : link))
    setLinks(updatedLinks)
  }

  const deleteLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id)
    setLinks(updatedLinks)
  }

  const handleReorder = (newLinks: any[]) => {
    const reorderedLinks = newLinks.map((link, idx) => ({
      ...link,
      order: idx,
    }))
    setLinks(reorderedLinks)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Links</h1>
          <p className="text-muted-foreground">Create and organize your links</p>
        </div>
        <Button onClick={addLink} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>

      {links.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No links yet</h3>
            <p className="text-muted-foreground mb-4">Get started by creating your first link</p>
            <Button onClick={addLink} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Link
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Reorder.Group axis="y" values={links} onReorder={handleReorder} className="space-y-4">
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
                            <Label htmlFor={`title-${link.id}`}>Title</Label>
                            <Input
                              id={`title-${link.id}`}
                              value={link.title}
                              onChange={(e) => updateLink(link.id, { title: e.target.value })}
                              placeholder="Link title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`icon-${link.id}`}>Icon</Label>
                            <EmojiPicker value={link.icon} onChange={(emoji) => updateLink(link.id, { icon: emoji })} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`url-${link.id}`}>URL</Label>
                          <Input
                            id={`url-${link.id}`}
                            value={link.url}
                            onChange={(e) => updateLink(link.id, { url: e.target.value })}
                            placeholder="https://example.com"
                            type="url"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-2">
                            <Switch
                              id={`active-${link.id}`}
                              checked={link.isActive}
                              onCheckedChange={(checked) => updateLink(link.id, { isActive: checked })}
                            />
                            <Label htmlFor={`active-${link.id}`} className="cursor-pointer">
                              {link.isActive ? "Active" : "Inactive"}
                            </Label>
                          </div>

                          <Button variant="destructive" size="sm" onClick={() => deleteLink(link.id)} className="gap-2">
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
  )
}


export default LinksWrapper