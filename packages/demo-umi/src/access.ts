export default function (initialState: InitialState) {
    const { role } = initialState;
    // console.log('inn', initialState);

    return {
        canRead: true,
        canUpdate: role === 'admin',
        canDelete: role === 'admin' || role === 'manager',
    };
}
