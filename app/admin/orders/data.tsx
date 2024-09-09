import {
  ArrowDownIcon,
} from "@radix-ui/react-icons"
import { BadgeCheck, Timer } from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "confirmed",
    label: "Confirmed",
    icon: BadgeCheck,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Timer,
  },
]

export const type = [
  {
    label: "direct",
    value: "direct",
    icon: ArrowDownIcon,
  },
]
