export default function (initialState: { currentUser?: ApiNS.User }) {
    const { currentUser } = initialState;

    const isAmin = currentUser?.access === 'admin';
    return {
        canRead: isAmin,
        canUpdate: isAmin,
        canDelete: isAmin,
    };
}
