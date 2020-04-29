import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import LazyLoad from 'react-lazy-load';

const SmallCard = ({ blog }) => {
    return (
        <div className="card shadow">
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                  <LazyLoad height={"100%"} offsetHorizontal={50} throttle>
                    <a>
                        <img
                            className="img img-fluid"
                            style={{ height: '250px', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </a>
                </LazyLoad>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h5 className="card-title">{blog.title}</h5>
                        </a>
                    </Link>
                    {/*<div className="card-text">{renderHTML(blog.excerpt)}</div>*/}
                </section>
            </div>

            <div className="card-body">
                Posted {moment(blog.updatedAt).fromNow()} by{' '}
                 <Link href={`/profile/${blog.postedBy.username}`}>
                    <a>{blog.postedBy.username}</a>
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;
