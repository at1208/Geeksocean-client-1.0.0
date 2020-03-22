import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated, allcommentBlog } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';
import BlogComment from '../../components/blog/BlogComment';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import { userById } from '../../actions/user'

const CommentList = ({ comments }) => {
  return <div className='container'>
  <List
    dataSource={comments.comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
  </div>
};





const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([]);
    const [comments, setComments] = useState([])
    const [pic, setPic] =useState('');


    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {

                setRelated(data);
            }
        });
    };


    const getComments = () => {
      if(!blog){
        return;
      }
      return allcommentBlog(blog._id).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setComments(data)
          }
        }
      )
    }

    const init = (blog) => {
          userById(blog.postedBy._id)
          .then((res) => setPic(res.user.picture))
          .catch(err => console.log(err))
    }

    useEffect(() => {
         init(blog);
        loadRelated();
        getComments()
    }, []);

    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };


console.log(comments)


    return (
        <>
            {head()}
            <Layout>
            <div className='blog-detail'>
                <main>
                    <article>
                        <div className="container">
                            <section>
                                <div className=" ">
                                    <h2 className="blog-title text-center font-weight-bold">{blog.title}</h2>

                                    <section>
                                        <p className="mark">
                                        <div className='row col container'>
                                           <div className='img-container'>
                                           <img
                                               className=""
                                               height={60}
                                               width={60}
                                               style={{ borderRadius: "60px" }}
                                               src={pic}

                                           />
                                           </div>
                                           <div className='user-container'>
                                             <div className=''>
                                          <Link href={`/profile/${blog.postedBy.username}`}>
                                               <a>{blog.postedBy.name}</a>
                                           </Link>
                                             </div>
                                              <div className=''>
                                                {moment(blog.createdAt).fromNow()}
                                              </div>
                                           </div>
                                        </div>
                                        </p>
                                    </section>




                                    <section>
                                        <div className="row justify-content-center" style={{ marginTop: '20px!important' }}>
                                            <img
                                                src={`${API}/blog/photo/${blog.slug}`}
                                                alt={blog.title}
                                                className="img img-fluid "
                                            />
                                        </div>
                                    </section>



                                </div>
                            </section>
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">{renderHTML(blog.body)}</div>
                            </section>
                        </div>

                        <BlogComment id={blog} />
                        <CommentList comments={comments} />
                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">RELATED BLOGS</h4>
                            <div className="row">{showRelatedBlog()}</div>
                        </div>

                        <div className="pb-3">
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}


                        </div>

                    </article>
                </main>
                <style jsx>{`
                 .blog-detail{
                   margin-top: 90px;
                 }
                 .blog-title{
                   margin-bottom: 20px!important;
                   font-size: 40px!important;
                   padding-top:10px;
                   letter-spacing: 1px;
                   word-spacing: 2px;
                 }
                 .container{
                   padding-left: 0px!important;
                   padding-right: 0px!important;
                 }
                 .blog-container{
                   padding: 10px;
                   margin:10px;
                 }
                 .excerpt{
                 }
                 .container{

                 }
                 @media(max-width: 767px){
                   .blog-container{
                     padding: 1px;
                     margin:0px;

                     margin-bottom: 20px;
                     margin-top: 20px;
                   }

                 }

                 .card{
                   border: 0px solid white;

                   padding: 5px!important;
                 }
                 .col-md-8{
                   padding-left:0px!important;
                   padding-right:0px!important;
                 }
                 .col-md-4{
                   padding-left:0px!important;
                   padding-right:0px!important;
                 }

                 .img-container{

                 }
                 .mark{
                   padding:1.2em!important;
                    background-color:white!important;
                   margin-bottom:20px!important;
                 }
                 .user-container{

                   padding:5px;
                   padding-left: 13px;
                 }
                  `}</style>
              </div>
          </Layout>
        </>
    );
};

SingleBlog.getInitialProps = ({ query}) => {

  return  singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
