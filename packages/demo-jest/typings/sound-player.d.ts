declare interface IPlaySoundFile extends jest.MockInstance<SoundPlayer, any>{
    (fileName: string): void;
}
declare class SoundPlayer {
    static mock: jest.MockContext<SoundPlayer, any>;
    static mockClear: () => void;
    static mockImplementation: (fn: Function) => void;

    foo: string;
    playSoundFile: IPlaySoundFile;
}

declare module '@utils/sound-player' {
    export default SoundPlayer;
}

declare module '@utils/sound-player-m' {
    interface IMockPlaySoundFile extends jest.MockInstance<SoundPlayer, any>{
        (): typeof jest.fn;
    }
    export const mockPlaySoundFile: IMockPlaySoundFile;
    export default SoundPlayer;
}

declare module '@utils/music-player' {
    class MusicPlayer {
        static mock: jest.MockContext<SoundPlayer, any>;
        static mockClear: () => void;
        static mockImplementation: (fn: Function) => void;
    
        foo: string;
        playMusicFile: IPlaySoundFile;
    }
    export {
        MusicPlayer,
    }
}