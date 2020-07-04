import Link from 'next/link';

function Article() {
    return (
        <div>
            <p>This is Article Page</p>
            <Link href='/'><a>Link to Home</a></Link>
        </div>
    )
}

export default Article;