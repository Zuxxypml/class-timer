let alarmAudio: HTMLAudioElement | null = null;

const playAlarmMp3 = async () => {
  try {
    if (!alarmAudio) {
      alarmAudio = new Audio(
        "/sounds/sergequadrado-alarm-church-bell-18533.mp3",
      );
      alarmAudio.volume = 0.8;
    }

    alarmAudio.currentTime = 0;
    await alarmAudio.play();
  } catch (error) {
    console.error("Error playing alarm:", error);
  }
};

export const playTimerAlarm = async () => {
  await playAlarmMp3();
};

export const playCompletionSound = async () => {
  await playAlarmMp3();
};
