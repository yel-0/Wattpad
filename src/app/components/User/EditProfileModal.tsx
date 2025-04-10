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

interface EditProfileModalProps {
  isEditOpen: boolean;
  onClose: () => void;
  initialData: {
    username: string;
    email: string;
    profileImage: string;
    backgroundImage: string;
  };
}

interface FormData {
  username: string;
  email: string;
  profileImage: File | string;
  backgroundImage: File | string;
}

export default function EditProfileModal({
  isEditOpen,
  onClose,
  initialData,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<FormData>({
    ...initialData,
    profileImage: initialData.profileImage,
    backgroundImage: initialData.backgroundImage,
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
          profileImage: file, // Save the file to formData
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
          backgroundImage: file, // Save the file to formData
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to get URL for the image source if it's a file
  const getImageSrc = (image: File | string) => {
    if (typeof image === "string") {
      return image;
    }
    return URL.createObjectURL(image);
  };

  // Update the user and log formData
  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    console.log({
      username: formData.username,
      email: formData.email,
      profileImage: formData.profileImage,
      backgroundImage: formData.backgroundImage,
    });
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleUpdateUser} className="space-y-6">
          {/* Profile Image Section */}
          <div className="space-y-2 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage
                  src={profilePreview || getImageSrc(formData.profileImage)}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>{formData.username.charAt(0)}</AvatarFallback>
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
          {/* Background Image Section */}
          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Background Image</Label>
            <div className="relative h-[200px] w-full rounded-md overflow-hidden bg-muted">
              <img
                src={backgroundPreview || getImageSrc(formData.backgroundImage)}
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

          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={formData.username}
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
