"use client";

import { useEffect, useState } from 'react';
import type { Poll } from '@/lib/types';

export default function PollSection() {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPoll = async () => {
    try {
      const res = await fetch('/api/polls');
      const data = await res.json();
      setPoll(data.poll);
      
      // Check if user has voted on this poll
      if (data.poll) {
        const votedPollId = sessionStorage.getItem('votedPollId');
        const votedOptionId = sessionStorage.getItem('votedOptionId');
        if (votedPollId === data.poll.id && votedOptionId) {
          setHasVoted(true);
          setSelectedOption(votedOptionId);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPoll();
  }, []);

  const handleVote = async () => {
    if (!selectedOption || !poll) return;
    setLoading(true);
    try {
      // Submit vote
      await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionId: selectedOption }),
      });
      
      // Save vote to sessionStorage
      sessionStorage.setItem('votedPollId', poll.id);
      sessionStorage.setItem('votedOptionId', selectedOption);
      setHasVoted(true);
      
      // Wait a moment for Hygraph CDN to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Refetch latest poll data
      const res = await fetch('/api/polls');
      const data = await res.json();
      setPoll(data.poll);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!poll) {
    return <div className="text-center py-8">Loading poll...</div>;
  }

  // Calculate total votes once
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <section className="bg-white shadow-md rounded p-6 my-8 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{poll.question}</h2>

      {!hasVoted ? (
        <div>
          {poll.options.map((option) => (
            <label key={option.id} className="flex items-center mb-2 cursor-pointer">
              <input
                type="radio"
                name="poll"
                value={option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mr-2"
              />
              <span>{option.text}</span>
            </label>
          ))}
          <button
            onClick={handleVote}
            disabled={!selectedOption || loading}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Vote'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {poll.options.map((option) => {
            const percent = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
            const isSelected = option.id === selectedOption;
            return (
              <div key={option.id} className="flex items-center">
                <span className="w-1/3 text-sm">{option.text}</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-4 mx-2 overflow-hidden">
                  <div 
                    className={`h-4 ${isSelected ? 'bg-blue-600' : 'bg-blue-400'}`} 
                    style={{ width: `${percent}%` }} 
                  />
                </div>
                <span className="w-12 text-sm text-right">{percent}%</span>
              </div>
            );
          })}
          <p className="text-sm text-gray-500 mt-2">Total votes: {totalVotes}</p>
        </div>
      )}
    </section>
  );
}
