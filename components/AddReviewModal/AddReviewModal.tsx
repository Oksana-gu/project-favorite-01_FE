"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import toast from "react-hot-toast";
import styles from "./AddReviewModal.module.css";
import { api } from "@/src/lib/api";
import { useAuthStore } from "@/store";

interface AddReviewModalProps {
  locationId: string;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  locationId,
}) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleFormSubmit = async (values: {
    rate: number;
    description: string;
  }) => {
    try {
      if (!user?.name) {
        toast.error("Не вдалося визначити користувача");
        return;
      }

      await api.post("/feedbacks", {
        locationId,
        userName: user.name,
        rate: values.rate,
        description: values.description,
      });

      toast.success("Відгук відправлено!");
      handleClose();
    } catch (error) {
      console.error("Помилка відправки відгуку:", error);
      toast.error("Не вдалося зберегти відгук");
      throw error;
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.reviewPopup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.popupCloseBtn}
          onClick={handleClose}
          aria-label="Закрити модальне вікно"
        >
          <IoClose size={24} />
        </button>
        <h2 className={styles.popupTitle}>Залишити відгук</h2>
        <AddReviewForm onSubmit={handleFormSubmit} onCancel={handleClose} />
      </div>
    </div>
  );
};
