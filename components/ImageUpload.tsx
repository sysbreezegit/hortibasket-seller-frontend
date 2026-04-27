"use client"
import { useFormContext, Controller } from "react-hook-form"
import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { X, Camera, Image as ImageIcon, UploadCloud, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

type ImageUploadProps = {
  name: string
  label: string
  mode?: "single" | "multi" | "avatar"
  placeholder?: string
  size?: "sm" | "md" | "lg" | "xl"
  onRemove?: (url: string) => Promise<void> | void
  onUpload?: (file: File) => Promise<string>
  disabled?: boolean
}

const avatarSizeClasses = {
  sm: "w-20 h-20",
  md: "w-28 h-28",
  lg: "w-36 h-36",
  xl: "w-44 h-44",
}

const MAX_SIZE = 3 * 1024 * 1024 // 3MB limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/svg+xml"]

export const ImageUploadInput = ({
  name,
  label,
  mode = "single",
  placeholder,
  size = "lg",
  onRemove,
  onUpload,
  disabled
}: ImageUploadProps) => {
  const { control } = useFormContext()
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  /* ---------- FILE HANDLER ---------- */
  const handleFiles = useCallback(
    (files: FileList | null, fieldValue: any, onChange: (value: any) => void) => {
      if (!files) return

      const validFiles: File[] = []

      for (const file of Array.from(files)) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          toast.error(`${file.name} is not a supported image format`)
          continue
        }

        if (file.size > MAX_SIZE) {
          toast.error(`${file.name} exceeds 3MB limit`)
          continue
        }

        validFiles.push(file)
      }

      if (!validFiles.length) return

      // cleanup old previews when replacing in single mode
      if (mode !== "multi") {
        previewUrls.forEach((url) => {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url)
        })
      }

      const newPreviews = validFiles.map((f) => URL.createObjectURL(f))

      if (mode === "multi") {
         // Multi mode handling (can be implemented if needed, focusing on single for now)
         const existingFiles = Array.isArray(fieldValue) ? fieldValue : []
         setPreviewUrls((prev) => [...prev, ...newPreviews])
         onChange([...existingFiles, ...validFiles])
      } else {
        const file = validFiles[0];
        setPreviewUrls([newPreviews[0]])

        if (onUpload) {
          setIsUploading(true)
          onUpload(file)
            .then((url) => {
              onChange(url)
              // We'll update preview url to the actual S3 url to be sure
              setPreviewUrls([url])
            })
            .catch((err) => {
              console.error(err)
              toast.error("Upload failed. Please try again.")
            })
            .finally(() => setIsUploading(false))
        } else {
          onChange(file)
        }
      }
    },
    [mode, previewUrls, onUpload],
  )

  /* ---------- REMOVE IMAGE ---------- */
  const removeImage = useCallback(
    (index: number, fieldValue: any, onChange: (value: any) => void) => {
      const files = Array.isArray(fieldValue) ? fieldValue : fieldValue ? [fieldValue] : []

      if (previewUrls[index]?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrls[index])
      } else if (onRemove && previewUrls[index]) {
         onRemove(previewUrls[index])
      }

      const updatedPreviews = previewUrls.filter((_, i) => i !== index)
      const updatedFiles = files.filter((_: any, i: number) => i !== index)

      setPreviewUrls(updatedPreviews)

      if (mode === "multi") {
        onChange(updatedFiles)
      } else {
        onChange(null)
        setPreviewUrls([])
      }
    },
    [previewUrls, mode],
  )

  /* ---------- CLEANUP ON UNMOUNT ---------- */
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url)
      })
    }
  }, []) 

  /* ---------- HELPERS ---------- */
  const getInitials = useCallback(() => {
    if (!placeholder) return "?"
    return placeholder
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }, [placeholder])

  /* ---------- AVATAR MODE ---------- */
  const renderAvatarMode = (field: any, fieldState: any) => {
    const avatarUrl = previewUrls[0] || (typeof field.value === "string" ? field.value : "")

    return (
      <FormItem className="space-y-4">
        <FormLabel className="text-base font-medium text-foreground">{label}</FormLabel>
        <FormControl>
          <div id={name} className={cn(
             "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-colors",
             disabled ? "border-slate-100 bg-slate-50 opacity-80" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
          )}>
            <div className={cn("relative transition-all duration-300", !disabled && "cursor-pointer group hover:scale-105")}>
              <label className={cn("block relative", !disabled && "cursor-pointer")}>
                <Avatar className={cn(avatarSizeClasses[size], "border-4 border-white shadow-xl ring-1 ring-slate-200/50 transition-transform")}>
                  <AvatarImage src={avatarUrl} className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-400">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                {/* Upload Overlay (Only if not disabled) */}
                {!disabled && (
                <div className={cn(
                  "absolute inset-0 rounded-full flex items-center justify-center transition-all duration-200",
                  avatarUrl ? "bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]" : "bg-slate-100/50 opacity-100"
                )}>
                  <Camera className={cn("w-8 h-8", avatarUrl ? "text-white" : "text-slate-400")} />
                </div>
                )}

                <input
                  type="file"
                  accept={ALLOWED_TYPES.join(",")}
                  className="sr-only"
                  disabled={disabled}
                  onChange={(e) => handleFiles(e.target.files, field.value, field.onChange)}
                />
              </label>

              {!disabled && avatarUrl && (
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-8 h-8 rounded-full shadow-lg border-2 border-white hover:bg-red-600 transition-colors z-10"
                  onClick={(e) => {
                    e.preventDefault()
                    removeImage(0, field.value, field.onChange)
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {!disabled && <p className="mt-4 text-sm text-muted-foreground font-medium">Click to upload avatar</p>}
          </div>
        </FormControl>
        <FormMessage>{fieldState.error?.message}</FormMessage>
      </FormItem>
    )
  }

  /* ---------- DROPZONE ---------- */
  const renderDropZone = (multiple: boolean, field: any, fieldState: any) => (
    <FormItem className="w-full">
      <div id={name} className="flex items-center justify-between">
         <FormLabel className="text-sm font-semibold text-foreground">{label}</FormLabel>
         {multiple && previewUrls.length > 0 && (
            <span className="text-xs text-muted-foreground">{previewUrls.length} file{previewUrls.length !== 1 && 's'} selected</span>
         )}
      </div>
      
      <FormControl>
        <div className="space-y-4">
          {!disabled && (
          <label
            className={cn(
              "relative flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ease-in-out group overflow-hidden",
              isDragOver 
                ? "border-primary bg-primary/5 ring-4 ring-primary/10" 
                : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/50",
              fieldState.error && "border-red-500 bg-red-50/10"
            )}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragOver(false)
              handleFiles(e.dataTransfer.files, field.value, field.onChange)
            }}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center space-y-2 z-10 p-4">
              <div className={cn(
                "p-4 rounded-full bg-[#F2F0EA] shadow-sm ring-1 ring-slate-200 mb-2 group-hover:scale-110 transition-transform duration-200",
                 (isDragOver || isUploading) && "bg-primary/10 text-primary ring-primary/20"
              )}>
                {isUploading ? (
                   <Loader2 className="w-6 h-6 text-primary animate-spin" />
                ) : (
                   <UploadCloud className={cn("w-6 h-6 text-slate-500", isDragOver && "text-primary")} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {isUploading ? "Uploading..." : <><span className="text-primary hover:underline">Click to upload</span> or drag and drop</>}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  SVG, PNG, JPG or WEBP (max. 3MB)
                </p>
              </div>
            </div>
            
            <input
              type="file"
              accept={ALLOWED_TYPES.join(",")}
              multiple={multiple}
              className="sr-only"
              disabled={disabled || isUploading}
              onChange={(e) => handleFiles(e.target.files, field.value, field.onChange)}
            />
          </label>
          )}

          {disabled && previewUrls.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full min-h-[120px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-slate-400">
               <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
               <p className="text-xs font-medium">No Image Provided</p>
            </div>
          )}

          {/* PREVIEW GRID */}
          {previewUrls.length > 0 && (
            <div className={cn(
                "grid gap-4",
                multiple ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
            )}>
              {previewUrls.map((url, i) => (
                <div key={url + i} className="group relative aspect-square bg-slate-100 rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all">
                  <img 
                    src={url} 
                    alt={`Preview ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Overlay (Only if not disabled) */}
                  {!disabled && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />}
                  
                  {/* Actions (Only if not disabled) */}
                  {!disabled && (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 scale-90 group-hover:scale-100">
                     <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8 shadow-sm"
                        onClick={() => removeImage(i, field.value, field.onChange)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                  </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage>{fieldState.error?.message}</FormMessage>
    </FormItem>
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // Sync internal state with external form value
        useEffect(() => {
          if (!field.value) {
           // Only reset if we have previews to avoid loop, or if explicit reset needed.
           if(previewUrls.length > 0) setPreviewUrls([])
           return
          }

          // Case 1: Array of mixed (Strings or Files)
          if (Array.isArray(field.value)) {
             const newUrls = field.value.map((item: any) => {
                 if (item instanceof File) {
                     return URL.createObjectURL(item)
                 } else if (typeof item === "string") {
                     return item
                 }
                 return ""
             }).filter(Boolean)
             
             setPreviewUrls(newUrls)
          } 
          // Case 2: Single File
          else if (field.value instanceof File) {
             setPreviewUrls([URL.createObjectURL(field.value)])
          } 
          // Case 3: Single String (URL)
          else if (typeof field.value === "string") {
             setPreviewUrls([field.value])
          }
        }, [field.value])

        if (mode === "avatar") return renderAvatarMode(field, fieldState)
        if (mode === "multi") return renderDropZone(true, field, fieldState)
        return renderDropZone(false, field, fieldState)
      }}
    />
  )
}