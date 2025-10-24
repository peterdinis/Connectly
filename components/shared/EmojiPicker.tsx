"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"
import type { EmojiClickData } from "emoji-picker-react"

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false })

interface EmojiPickerProps {
  value?: string
  onChange: (emoji: string) => void
}

export function EmojiPicker({ value, onChange }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onChange(emojiData.emoji)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
          {value ? (
            <span className="text-2xl mr-2">{value}</span>
          ) : (
            <Smile className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-muted-foreground">{value ? "Change emoji" : "Select emoji"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 border-0" align="start">
        <Picker onEmojiClick={handleEmojiClick} width="100%" searchPlaceHolder="Search emoji..." />
      </PopoverContent>
    </Popover>
  )
}
