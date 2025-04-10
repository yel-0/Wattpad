"use client";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera, X } from "lucide-react";
import { updateUserProfile } from "@/app/(acttion)/User/User";

interface EditProfileModalProps {
  isEditOpen: boolean;
  onClose: () => void;
  initialData: {
    userName: string;
    email: string;
    profileImage: string;
    bgImage: string;
  };
}

interface FormData {
  username: string;
  email: string;
  profileImage: File | string;
  backgroundImage: File | string;
}

const DEFAULT_PROFILE_IMAGE =
  "https://plus.unsplash.com/premium_photo-1671934974148-82228b911598?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVucGx1Z2dlZHxlbnwwfHwwfHx8MA%3D%3D";
const DEFAULT_BACKGROUND_IMAGE =
  "https://images.unsplash.com/reserve/NFuTknHQTsOc0uHAA4E4_4968226460_33fb941a16_o.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVucGx1Z2dlZHxlbnwwfHwwfHx8MA%3D%3D";

export default function EditProfileModal({
  isEditOpen,
  onClose,
  initialData,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<FormData>({
    username: initialData.userName || "",
    email: initialData.email || "",
    profileImage: initialData.profileImage || DEFAULT_PROFILE_IMAGE,
    backgroundImage: initialData.bgImage || DEFAULT_BACKGROUND_IMAGE,
  });
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(
    null
  );

  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePreview(result);
        setFormData((prev) => ({
          ...prev,
          profileImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBackgroundPreview(result);
        setFormData((prev) => ({
          ...prev,
          backgroundImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getImageSrc = (
    image: File | string | null,
    fallback: string
  ): string => {
    if (!image) return fallback;
    if (typeof image === "string") return image || fallback;
    if (image instanceof File) return URL.createObjectURL(image);
    return fallback;
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const realFormData = new FormData();

    // Append username from formData state
    realFormData.append("userName", formData.username);

    // Append profile image if it's changed (added or updated)
    if (formData.profileImage instanceof File) {
      realFormData.append("profileImage", formData.profileImage);
    }

    // Append background image if it's changed (added or updated)
    if (formData.backgroundImage instanceof File) {
      realFormData.append("backgroundImage", formData.backgroundImage);
    }

    // Send the FormData to the backend API
    const result = await updateUserProfile(realFormData);
    const data = JSON.parse(JSON.stringify(result));

    alert(data.message);
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateUser} className="space-y-6">
          {/* Profile Image */}
          <div className="space-y-2 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage
                  src={
                    profilePreview ||
                    getImageSrc(formData.profileImage, DEFAULT_PROFILE_IMAGE)
                  }
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>{formData.username}</AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => profileInputRef.current?.click()}
              >
                <Camera size={16} />
              </Button>
              <input
                ref={profileInputRef}
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Background Image</Label>
            <div className="relative h-[200px] w-full rounded-md overflow-hidden bg-muted">
              <img
                src={
                  backgroundPreview ||
                  getImageSrc(
                    formData.backgroundImage,
                    DEFAULT_BACKGROUND_IMAGE
                  )
                }
                alt="Background"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => backgroundInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Camera size={16} />
                  Change Cover
                </Button>
                {backgroundPreview && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setBackgroundPreview(null)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
              <input
                ref={backgroundInputRef}
                type="file"
                id="backgroundImage"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundImageChange}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username} // Controlled input
              onChange={handleChange}
              placeholder="Your username"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
