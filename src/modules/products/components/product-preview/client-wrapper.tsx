"use client"
import dynamic from "next/dynamic"

const ProductPreview = dynamic(() => import("./index"), { ssr: false })

export default function ProductPreviewClient(props: any) {
  return <ProductPreview {...props} />
}