'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';
import { AddReviewForm } from '../AddReviewForm/AddReviewForm';
import styles from './AddReviewModal.module.css';

interface AddReviewModalProps {
  locationId: string;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({ locationId }) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  const handleFormSubmit = async (values: { rate: number; description: string }) => {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId,
        ...values,
      }),
    });

    if (!response.ok) {
      throw new Error('Не вдалося зберегти відгук');
    }

    handleClose();
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
