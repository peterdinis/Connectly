export interface Link {
  id: string
  title: string
  url: string
  icon?: string
  isActive: boolean
  order: number
}

export interface Profile {
  name: string
  bio: string
  avatar?: string
  email?: string
  location?: string
  website?: string
  socialLinks?: {
    twitter?: string
    instagram?: string
    github?: string
    linkedin?: string
  }
}

export interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export interface DesignSettings {
  theme: "default" | "ocean" | "sunset" | "forest" | "midnight" | "rose"
  buttonStyle: "rounded" | "square" | "pill"
  backgroundStyle: "solid" | "gradient" | "mesh"
  fontStyle: "sans" | "serif" | "mono"
  cardAnimation: "none" | "slide" | "scale" | "bounce"
  layout: "centered" | "left" | "grid"
  cardShadow: "none" | "sm" | "md" | "lg"
  spacing: "compact" | "normal" | "relaxed"
  borderStyle: "none" | "subtle" | "bold"
  profileImageShape: "circle" | "square" | "rounded"
  customColors?: {
    primary?: string
    accent?: string
  }
}

export interface AnalyticsEvent {
  id: string
  type: "view" | "click"
  linkId?: string
  linkTitle?: string
  timestamp: string
  date: string
}

export interface LinkAnalytics {
  linkId: string
  linkTitle: string
  clicks: number
}

export interface AnalyticsSummary {
  totalViews: number
  totalClicks: number
  clickThroughRate: number
  topLinks: LinkAnalytics[]
  viewsByDate: { date: string; views: number }[]
  averageClicksPerSession: number
  bounceRate: number
  viewsByHour: { hour: number; views: number }[]
  recentActivity: AnalyticsEvent[]
  linkPerformanceComparison: { linkId: string; linkTitle: string; clicks: number; views: number; ctr: number }[]
}
