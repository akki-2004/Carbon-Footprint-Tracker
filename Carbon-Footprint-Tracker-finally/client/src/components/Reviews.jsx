import React, { useState } from 'react';
import axios from 'axios';

export default function Reviews() {
  const [reviewText, setReviewText] = useState('');
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : { id: null, name: '' };

  const handleReviewSubmit = () => {
    if (!reviewText.trim()) {
      return alert('Please write a review before submitting!');
    }
    axios
      .post('http://localhost:5000/api/reviews', {
        userId: user.id,
        reviewText,
      })
      .then(() => {
        alert('Review submitted successfully!');
        setReviewText('');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to submit review.');
      });
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow">
      <h3 className="mb-4 text-xl font-semibold text-white">Write a Review</h3>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here…"
        className="
          w-full h-32
          p-3
          bg-gray-800
          text-white
          placeholder-gray-400
          border border-gray-600
          rounded-lg mb-4
          focus:outline-none focus:ring-2 focus:ring-green-400
        "
      />
      <button
        onClick={handleReviewSubmit}
        disabled={!reviewText.trim()}
        className="
          px-5 py-2
          bg-green-600 hover:bg-green-700
          text-white font-medium
          rounded-lg
          transition
          disabled:opacity-50
        "
      >
        Submit Review
      </button>
    </div>
  );
}
