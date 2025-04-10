"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import EditProfileModal from "@/app/components/User/EditProfileModal";

interface EditProfileButtonProps {
  userData: any; // Adjust this type according to the userData structure
}

export default function EditProfileButton({
  userData,
}: EditProfileButtonProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsEditModalOpen(true)}>
        <Settings className="mr-2" /> Edit
      </Button>
      <EditProfileModal
        isEditOpen={isEditModalOpen} // Pass the modal visibility state
        onClose={handleCloseModal} // Pass the close handler
        initialData={userData}
      />
    </>
  );
}
