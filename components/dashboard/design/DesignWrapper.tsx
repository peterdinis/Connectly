"use client"

import { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { Save, Palette } from "lucide-react"

const DesignWrapper: FC = () => {
  const [design, setDesign] = useState<any>({
    theme: "default",
    buttonStyle: "rounded",
    backgroundStyle: "gradient",
    fontStyle: "sans",
    cardAnimation: "slide",
    layout: "centered",
    cardShadow: "md",
    spacing: "normal",
    borderStyle: "subtle",
    profileImageShape: "circle",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Palette className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Design Settings</h1>
        </div>
        <p className="text-muted-foreground">Customize every aspect of your public page appearance</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Layout Style</CardTitle>
            <CardDescription>Choose how your links are arranged</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={design.layout}
              onValueChange={(value) => setDesign({ ...design, layout: value as any["layout"] })}
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="centered" id="layout-centered" />
                  <Label htmlFor="layout-centered" className="cursor-pointer">
                    Centered
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="left" id="layout-left" />
                  <Label htmlFor="layout-left" className="cursor-pointer">
                    Left Aligned
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="grid" id="layout-grid" />
                  <Label htmlFor="layout-grid" className="cursor-pointer">
                    Grid
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Theme</CardTitle>
            <CardDescription>Choose a color scheme for your page</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={design.theme}
              onValueChange={(value) => setDesign({ ...design, theme: value as any["theme"] })}
            >
              <div className="grid grid-cols-2 gap-4">
                TODO
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Style</CardTitle>
              <CardDescription>Shape of your link buttons</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.buttonStyle}
                onValueChange={(value) => setDesign({ ...design, buttonStyle: value as any["buttonStyle"] })}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rounded" id="button-rounded" />
                    <Label htmlFor="button-rounded" className="cursor-pointer">
                      Rounded
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="square" id="button-square" />
                    <Label htmlFor="button-square" className="cursor-pointer">
                      Square
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pill" id="button-pill" />
                    <Label htmlFor="button-pill" className="cursor-pointer">
                      Pill
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card Shadow</CardTitle>
              <CardDescription>Depth of link card shadows</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.cardShadow}
                onValueChange={(value) => setDesign({ ...design, cardShadow: value as any["cardShadow"] })}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="shadow-none" />
                    <Label htmlFor="shadow-none" className="cursor-pointer">
                      None
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sm" id="shadow-sm" />
                    <Label htmlFor="shadow-sm" className="cursor-pointer">
                      Small
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="md" id="shadow-md" />
                    <Label htmlFor="shadow-md" className="cursor-pointer">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lg" id="shadow-lg" />
                    <Label htmlFor="shadow-lg" className="cursor-pointer">
                      Large
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Background Style</CardTitle>
            <CardDescription>Choose how the background is displayed</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={design.backgroundStyle}
              onValueChange={(value) =>
                setDesign({ ...design, backgroundStyle: value as any["backgroundStyle"] })
              }
            >
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solid" id="bg-solid" />
                  <Label htmlFor="bg-solid" className="cursor-pointer">
                    Solid
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gradient" id="bg-gradient" />
                  <Label htmlFor="bg-gradient" className="cursor-pointer">
                    Gradient
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mesh" id="bg-mesh" />
                  <Label htmlFor="bg-mesh" className="cursor-pointer">
                    Mesh
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
              <CardDescription>Gap between elements</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.spacing}
                onValueChange={(value) => setDesign({ ...design, spacing: value as any["spacing"] })}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="spacing-compact" />
                    <Label htmlFor="spacing-compact" className="cursor-pointer">
                      Compact
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="spacing-normal" />
                    <Label htmlFor="spacing-normal" className="cursor-pointer">
                      Normal
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="relaxed" id="spacing-relaxed" />
                    <Label htmlFor="spacing-relaxed" className="cursor-pointer">
                      Relaxed
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Border Style</CardTitle>
              <CardDescription>Card border appearance</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.borderStyle}
                onValueChange={(value) => setDesign({ ...design, borderStyle: value as any["borderStyle"] })}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="border-none" />
                    <Label htmlFor="border-none" className="cursor-pointer">
                      None
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subtle" id="border-subtle" />
                    <Label htmlFor="border-subtle" className="cursor-pointer">
                      Subtle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bold" id="border-bold" />
                    <Label htmlFor="border-bold" className="cursor-pointer">
                      Bold
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Font Style</CardTitle>
              <CardDescription>Typography for your page</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.fontStyle}
                onValueChange={(value) => setDesign({ ...design, fontStyle: value as any["fontStyle"] })}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sans" id="font-sans" />
                    <Label htmlFor="font-sans" className="cursor-pointer font-sans">
                      Sans Serif
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="serif" id="font-serif" />
                    <Label htmlFor="font-serif" className="cursor-pointer font-serif">
                      Serif
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mono" id="font-mono" />
                    <Label htmlFor="font-mono" className="cursor-pointer font-mono">
                      Monospace
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile Image Shape</CardTitle>
              <CardDescription>Shape of your avatar</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={design.profileImageShape}
                onValueChange={(value) =>
                  setDesign({ ...design, profileImageShape: value as any["profileImageShape"] })
                }
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="circle" id="avatar-circle" />
                    <Label htmlFor="avatar-circle" className="cursor-pointer">
                      Circle
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rounded" id="avatar-rounded" />
                    <Label htmlFor="avatar-rounded" className="cursor-pointer">
                      Rounded
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="square" id="avatar-square" />
                    <Label htmlFor="avatar-square" className="cursor-pointer">
                      Square
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Card Animation</CardTitle>
            <CardDescription>Choose how links animate when appearing</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={design.cardAnimation}
              onValueChange={(value) =>
                setDesign({ ...design, cardAnimation: value as any["cardAnimation"] })
              }
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="anim-none" />
                  <Label htmlFor="anim-none" className="cursor-pointer">
                    None
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slide" id="anim-slide" />
                  <Label htmlFor="anim-slide" className="cursor-pointer">
                    Slide
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="scale" id="anim-scale" />
                  <Label htmlFor="anim-scale" className="cursor-pointer">
                    Scale
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bounce" id="anim-bounce" />
                  <Label htmlFor="anim-bounce" className="cursor-pointer">
                    Bounce
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Button className="w-full gap-2" size="lg">
          <Save className="w-4 h-4" />
          Save Design Settings
        </Button>
      </motion.div>
    </div>
  )
}


export default DesignWrapper;