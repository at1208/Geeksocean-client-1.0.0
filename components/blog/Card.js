import Link from 'next/link';
import { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';
import { Button } from 'antd';
import { userById } from '../../actions/user'

const Card = ({ blog }) => {

  const [pic, setPic] =useState('');

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a><Button style={{ margin: "5px" }} type="link" info>{c.name}</Button></a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a><Button style={{ margin: "5px" }} type="link" info>{t.name}</Button></a>
            </Link>
        ));

    const init = (blog) => {
          userById(blog.postedBy._id)
          .then((res) => setPic(res.user.picture))
          .catch(err => console.log(err))
    }

     useEffect(() => {

       init(blog);
     }, [])

    return (

        <div className="blog-container card shadow">
            <header>
                <Link href={`/blogs/${blog.slug}`}>
                    <h6 className="blog-title text-center">
                       {blog.title}
                    </h6>
                </Link>
            </header>
            <section>
                <p className="mark">
                <div className='row col'>
                   <div className='img-container'>
                   <img
                       className=""
                       height={50}
                       width={50}
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


            <div className="row col justify-content-center">
                <div className="col-md-2">
                    <section>
                        <img
                            className=""
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                        />
                    </section>
                </div>
                <div className="col-md-10 excerpt">
                    <section>
                        <div>{renderHTML(blog.excerpt)}</div>
                        <div className='readbtn'>
                        <Link href={`/blogs/${blog.slug}`}><button className='readmore'>Read more</button></Link>
                        </div>
                    </section>
                    <section>
                        {showBlogCategories(blog)}
                        {showBlogTags(blog)}
                    </section>
                </div>
            </div>
            <style jsx>{`
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
              .col{
                padding-left: 5px!important;
                padding-right: 5px!important;
              }
              .col-md-10{
                padding-left: 5px!important;
                padding-right: 5px!important;
              }
              .readmore{
                background-color: #fff;
                width: 100px;
                height: 10px;
                color: #4b49ff;
                border-radius: 100px;
                border: thin solid #00f;
                font-family: Nunito Sans,sans-serif;
                font-weight: 800;
              }
              .readbtn{
                align-items: center;
                text-align: center;
                justify-content: center;
              }
            }
            .readmore{
              background-color: #fff;
              width: 100px;
              height: 30px;
              color: #4b49ff;
              border-radius: 100px;
              border: thin solid #00f;
              font-family: Nunito Sans,sans-serif;
              font-weight: 800;
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
            .blog-title{
              font-size: 20px!important;
              padding-top:10px;
              letter-spacing: 1px;
              word-spacing: 2px;
            }
            .img-container{
             padding-left:30px;
            }
            .mark{
              padding:1.2em!important;
              background-color: white!important;
            }
            .user-container{

              padding:5px;
              padding-left: 13px;
            }
              `}</style>
        </div>

    );
};

export default Card;
