import SoundPlayer from '@utils/sound-player';
import SoundPlayerConsumer from '@utils/sound-player-consumer';
import { MusicPlayer } from '@utils/music-player';

/* 在 jest.mock 第二个参数直接抛出 mock 函数 */

// mock 默认导出的 class
const mockPlaySoundFile = jest.fn();
mockPlaySoundFile.mockImplementation(fileName => {
    console.log('fileName: ' + fileName);
})
jest.mock('@utils/sound-player', () => {
    // 用于 new SoundPlayer，不能是箭头函数
    return jest.fn().mockImplementation(() => {
        return { 
            playSoundFile: mockPlaySoundFile,
        };
    });
});

// mock 局部导出的 class
jest.mock('@utils/music-player', () => {
    return {
        MusicPlayer: jest.fn().mockImplementation(() => {
            return { playMusicFile: (file: string) => file };
        }),
    }
});

describe('es6 class mocks of mock factory ', () => {
    beforeEach(() => {
        SoundPlayer.mockClear();
        mockPlaySoundFile.mockClear();
    });

    /* 测试是否调用了构造函数 new SoundPlayer */
    it('test whether the consumer called the class constructor', () => {
        const soundPlayerConsumer = new SoundPlayerConsumer();

        expect(SoundPlayer).toHaveBeenCalledTimes(1);
    });

    /* 测试是否调用了实例 instance 的方法 */
    it('test whether the consumer called a method on the class instance', () => {
        /* beforeEach 清空了 mock */
        expect(SoundPlayer).not.toHaveBeenCalled(); // 构造函数未被调用

        const soundPlayerConsumer = new SoundPlayerConsumer();

        expect(SoundPlayer).toHaveBeenCalledTimes(1); // 构造函数被调用
    });

    /* 测试进行对 class 方法的监控 */
    it('test spying on methods of our class', () => {

        const soundPlayerConsumer = new SoundPlayerConsumer();

        soundPlayerConsumer.playSomethingCool(); // 会触发 SoundPlayer 实例 instance 的 playSoundFile 方法

        /* bug-note: 同 manual mock，拿到的 instance 属性都是空的，丢失 playSoundFile */
        // const mockSoundPlayerInstance = SoundPlayer.mock.instances[0]; // 获得创建的实例 instance
        
        // const mockPlaySoundFile = soundPlayerConsumer.soundPlayer.playSoundFile; // ✔
        expect(mockPlaySoundFile.mock.calls[0][0]).toEqual('song.mp3'); // 被 mock 后的 playSoundFile 接收参数是否匹配

        expect(mockPlaySoundFile).toHaveBeenCalledWith('song.mp3'); // 同上
        expect(mockPlaySoundFile).toHaveBeenCalledTimes(1); // 被调用 1 次
    });

    /* 测试非默认导出的 class，即 export 导出而非 export default */
    it('test mocking non default class exports', () => {
        expect(MusicPlayer).not.toHaveBeenCalled();

        const musicPlayer = new MusicPlayer();

        expect(MusicPlayer).toHaveBeenCalledTimes(1); // 构造函数被调用

        expect(musicPlayer.playMusicFile('music')).toBe('music');
    });
});