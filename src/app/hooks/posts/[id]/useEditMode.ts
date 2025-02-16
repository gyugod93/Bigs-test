"use client";
import { useState } from "react";

export const useEditMode = (onRefresh: () => void) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSuccess = () => {
    setIsEditing(false);
    onRefresh();
  };

  return {
    isEditing,
    setIsEditing,
    handleEditSuccess,
  };
};
