'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Palette, Image as ImageIcon, Paintbrush, Bookmark, Shapes, Sparkles, Square, FileStack, DollarSign, Package } from "lucide-react"

export function ArtProductDetailsComponent() {
  // Mock product data
  const product = {
    image: "/placeholder.svg?height=600&width=800",
    title: "Ethereal Dreamscape",
    description: "A mesmerizing abstract piece that transports viewers to a world of vibrant colors and fluid forms. This artwork invites contemplation and sparks imagination, making it a captivating centerpiece for any space.",
    artist: "Alexandra Rivers",
    category: "Painting",
    subject: "Abstract",
    medium: "Acrylic on Canvas",
    style: "Contemporary",
    palette: "Vibrant",
    theme: "Dreams and Imagination",
    defaultSize: "24x36 inches",
    defaultPaper: "Premium Stretched Canvas",
    basePrice: 450,
    stock: 5
  }

  const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </div>
  )

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-muted-foreground">by {product.artist}</p>
        </div>
        <Button size="lg">Add to Cart</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Product Image */}
        <Card className="md:col-span-2 lg:col-span-2 row-span-2">
          <CardContent className="p-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DetailItem icon={<Bookmark className="w-4 h-4" />} label="Category" value={product.category} />
            <DetailItem icon={<Shapes className="w-4 h-4" />} label="Subject" value={product.subject} />
            <DetailItem icon={<Paintbrush className="w-4 h-4" />} label="Medium" value={product.medium} />
            <DetailItem icon={<ImageIcon className="w-4 h-4" />} label="Style" value={product.style} />
            <DetailItem icon={<Palette className="w-4 h-4" />} label="Palette" value={product.palette} />
            <DetailItem icon={<Sparkles className="w-4 h-4" />} label="Theme" value={product.theme} />
          </CardContent>
        </Card>

        {/* Size and Material */}
        <Card>
          <CardHeader>
            <CardTitle>Size & Material</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DetailItem icon={<Square className="w-4 h-4" />} label="Default Size" value={product.defaultSize} />
            <DetailItem icon={<FileStack className="w-4 h-4" />} label="Material" value={product.defaultPaper} />
          </CardContent>
        </Card>

        {/* Pricing and Stock */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold">${product.basePrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="w-4 h-4" />
              <span>In Stock: {product.stock}</span>
            </div>
            <Badge variant="outline" className="text-sm">Limited Edition</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}