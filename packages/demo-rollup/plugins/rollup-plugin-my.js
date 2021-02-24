export default function myExample() {
    return {
        name: 'my-example', // this name will show up in warnings and errors
        resolveId(source) {
            console.log('source', source);
            /* if (source === './a') {
                return 'A'; // this signals that rollup should not ask other plugins or check the file system to find this id
            } */
            return null; // other ids should be handled as usually
        },
        load(id) {
            console.log('id', id);
            /* if (id === 'A') {
                return 'export function a() { console.log("A") }'; // the source code for "virtual-module"
            } */
            return null; // other ids should be handled as usually
        }
    };
}