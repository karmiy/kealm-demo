import SoundPlayer from '@utils/sound-player';
import SoundPlayerM from '@utils/sound-player-m';

export default class SoundPlayerConsumer {
    // soundPlayer: SoundPlayer = new SoundPlayer();
    // soundPlayerM: SoundPlayerM = new SoundPlayerM();
    soundPlayer: SoundPlayer;
    soundPlayerM: SoundPlayerM;

    constructor() {
        this.soundPlayer = new SoundPlayer();
        this.soundPlayerM = new SoundPlayerM();
    }

    playSomethingCool() {
        this.soundPlayer.playSoundFile('song.mp3');
    }

    playSomethingCoolM() {
        this.soundPlayerM.playSoundFile('song.mp3');
    }
}