/* 用于 manual mock 测试，共用 sound-player.ts 会影响其他测试，因为 __mocks__ 优先级高 */
export default class SoundPlayer {
    foo: string = 'bar';

    playSoundFile(fileName: string) {
        console.log('Playing sound file ' + fileName);
    }

}