import { useState } from 'react';
import { challengeAPI } from '../../../composables/useAPI';

export const useChallengeActions = () => {
  const [selectedPlayerForChallenge, setSelectedPlayerForChallenge] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [sentChallengeId, setSentChallengeId] = useState(null);

  // Send challenge
  const sendChallenge = async (player, onSuccess, onError) => {
    try {
      setIsWaitingForResponse(true);

      const response = await challengeAPI.sendChallenge(
        player.id,
        'Chào bạn! Mình muốn thách đấu với bạn!'
      );

      if (response.success && response.data?.id) {
        setSentChallengeId(response.data.id);
      }

      onSuccess?.(`Đã gửi lời thách đấu đến ${player.name}`);
    } catch (err) {
      console.error('❌ Error sending challenge:', err);
      setIsWaitingForResponse(false);
      onError?.(err.message || 'Gửi thách đấu thất bại');
    }
  };

  // Cancel challenge
  const cancelChallenge = async (onSuccess, onError) => {
    try {
      if (isWaitingForResponse && sentChallengeId) {
        await challengeAPI.cancelChallenge(sentChallengeId);
        onSuccess?.('Đã hủy thách đấu');
      }
    } catch (err) {
      console.error('❌ Error cancelling challenge:', err);
      onError?.(err.message || 'Không thể hủy thách đấu');
    } finally {
      setSelectedPlayerForChallenge(null);
      setIsWaitingForResponse(false);
      setSentChallengeId(null);
    }
  };

  // Accept challenge
  const acceptChallenge = async (challengeId, onSuccess, onError) => {
    try {
      await challengeAPI.acceptChallenge(challengeId);
      onSuccess?.();
    } catch (err) {
      console.error('Error accepting challenge:', err);
      onError?.('Lỗi khi chấp nhận thách đấu');
    }
  };

  // Reject challenge
  const rejectChallenge = async (challengeId, onSuccess, onError) => {
    try {
      await challengeAPI.rejectChallenge(challengeId);
      onSuccess?.('Đã từ chối thách đấu');
    } catch (err) {
      console.error('Error rejecting challenge:', err);
      onError?.();
    }
  };

  return {
    selectedPlayerForChallenge,
    setSelectedPlayerForChallenge,
    isWaitingForResponse,
    sentChallengeId,
    sendChallenge,
    cancelChallenge,
    acceptChallenge,
    rejectChallenge,
  };
};