import { withRouter } from 'next/router';
import Link from 'next/link';

function Product({ router }) {
    return (
        <div>
            <p>This is Product Page</p>
            <p>Id: {router.query.id}</p>
            <p>
            <Link href='/'><a>Link to Home</a></Link>
            </p>
            <p>
            <Link href='/blog/article'><a>Link to Acticle</a></Link>
            </p>
        </div>
    )
}

export default withRouter(Product);