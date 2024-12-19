import React, { useState, useEffect } from 'react';
import { PlaylistSelector } from '../components/PlaylistSelector';
import { GamePlayer } from '../components/GamePlayer';
import { Header } from '../components/Header';
import { ChallengeMode } from '../components/ChallengeMode';
import { SpotifyPlaylist, SpotifyTrack } from '../types/spotify';
import { getUserPlaylists, getPlaylistTracks, getTrackById } from '../services/spotifyApi';
import { GameResult } from '../types/game';
import { useSpotify } from '../hooks/useSpotify';

interface HomeProps {
  challengeData?: any;
}

export const Home: React.FC<HomeProps> = ({ challengeData }) => {
  const { isInitialized } = useSpotify();
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playedTracks, setPlayedTracks] = useState<Set<string>>(new Set());
  const [isReadyForNextTrack, setIsReadyForNextTrack] = useState(true);
  const [playerResults, setPlayerResults] = useState<GameResult[]>([]);
  const [showChallengeResults, setShowChallengeResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isInitialized) {
      setIsLoading(true);
      getUserPlaylists()
        .then(data => {
          setPlaylists(data.items);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Failed to fetch playlists:', error);
          setError('Failed to load playlists. Please try again.');
          setIsLoading(false);
        });
    }
  }, [isInitialized]);

  // Rest of the component remains the same...
  // Keep all existing functions and JSX

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header onNewGame={handleNewGame} />
      
      <main className="pt-16">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          </div>
        ) : showChallengeResults && challengeData ? (
          <ChallengeMode
            originalResults={challengeData}
            playerResults={playerResults}
            onClose={handleNewGame}
            onNewGame={handleNewGame}
          />
        ) : !currentTrack ? (
          <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              {challengeData ? 'Challenge Mode' : 'Your Playlists'}
            </h2>
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200">
                {error}
              </div>
            )}
            <PlaylistSelector 
              playlists={playlists} 
              onSelect={handlePlaylistSelect}
              challengeData={challengeData}
            />
          </div>
        ) : (
          <GamePlayer 
            track={currentTrack} 
            onGameComplete={handleGameComplete}
            onPlayAgain={handlePlayAgain}
            challengeData={challengeData}
          />
        )}
      </main>
    </div>
  );
};