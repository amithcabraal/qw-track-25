import React from 'react';
import { GameResult } from '../../types/game';

interface TrackComparisonProps {
  original: GameResult;
  player?: GameResult;
}

export const TrackComparison: React.FC<TrackComparisonProps> = ({ original, player }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <img
      src={original.albumImage}
      alt={original.trackName}
      className="w-12 h-12 rounded"
    />
    <div className="flex-1">
      <h4 className="font-semibold dark:text-white">{original.trackName}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{original.artistName}</p>
    </div>
    <div className="text-right">
      <div className="font-bold dark:text-white">
        {original.score} vs {player?.score || 0}
      </div>
      <div className="text-sm text-gray-500">
        {original.time.toFixed(1)}s vs {player?.time.toFixed(1) || '0.0'}s
      </div>
    </div>
  </div>
);