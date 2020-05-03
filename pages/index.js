import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { listBlogsWithCategoriesAndTags, randomBlog,singleRandomBlog } from '../actions/blog';
// import { getKeywords } from '../actions/keyword';
import Card from '../components/blog/Card';
import FlashCard from '../components/blog/FlashCard';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Search from '../components/blog/Search'
import { Button } from 'antd'

import { LazyLoadImage } from 'react-lazy-load-image-component';



const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router, randomblog }) => {

    const head = () => (
        <Head>
            <title>{APP_NAME}</title>
            <meta
                name="description"
                content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
            />
            <link rel="canonical" href={`${DOMAIN}`} />
            <meta property="og:title" content={`Latest tech articles | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Tech articles on mobiles, laptops, cybersecurity, games and much more."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            <meta property="og:image" content={`${DOMAIN}/static/images/home-logo.svg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/home-logo.svg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);
    const [randomblogs, setRandomBlogs] = useState([]);
    const [singleBlog, setSingleBlog] = useState();
    // const [load, setLoad] = useState([]);

    useEffect(() => {
      loadRandomBlogs()
      loadSingleRandomBlog()
    }, []);

    const loadRandomBlogs = () => {
      return   randomBlog().then(data => {
              if (data.error) {
                  console.log(data.error);
              } else {
                   setRandomBlogs(data.result)
              }
          });
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {

            return (
                <article key={i}>
                    <Card blog={blog} />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className=""><Button style={{ margin: "5px"}}>{c.name}</Button></a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className=""><Button style={{ margin: "5px"}}>{t.name}</Button></a>
            </Link>
        ));
    };


    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => {
                <Card blog={blog} key={i}/>
        });
    };



   const showRandomBlogs = () => {
     return randomblogs.map((blog, i) => {
             return <FlashCard blog={blog} key={i}/>
     });
   }


 const showHottestArticle = () => {
   return <div className='container mb-5 mt-4'>
           <div className='col row justify-content-center'>
              <div className='col-md-6'>
              {showSingleBlog()}
              </div>
              <div className='col-md-5'>
              {showRandomBlogs()}
              </div>
           </div>
          </div>
 }

 const loadSingleRandomBlog = () => {
   singleRandomBlog()
   .then((data) => {
     if(data.error){
       console.log(data.error)
     }
     setSingleBlog(data.result)
   })
 }



 const showSingleBlog = () => {
   if(singleBlog){
     return singleBlog.map((blog) => {
        return <Link href={`/blogs/${blog.slug}`}>
        <a>
            <div className='singleBlog'>
              <LazyLoadImage
               effect="blur"
               alt={blog.title}
               className="img img-fluid "
               src={`${API}/blog/photo/${blog.slug}`}
              />
              <h2 className='text-center p-2 singleBlogTitle'>{blog.title}</h2>

              </div>
          </a>
               </Link>
     })
   }
 }



    return (
    <React.Fragment>
            <Layout>

            <div className='container-fluid'>
                    {<div className="show-blogs">
                            <Search />
                    </div>}
                  <div className='container-fluid'>
                          {showHottestArticle()}
                      <div className="showall container">
                          {showAllBlogs()}
                      </div>
                  </div>

                    <div className="container">{showLoadedBlogs()}</div>
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                    <section>
                        <div className="pb-5 text-center">
                            {showAllCategories()}
                            {showAllTags()}

                        </div>
                    </section>
          </div>
            </Layout>

            <style global jsx>{`
            .show-blogs{
              margin-top: 15px;
              margin-bottom:20px;


            }
            .singleBlogTitle{
              font-weight: bold;
              font-family: 'Nunito Sans', sans-serif;
            }

            @media(min-width: 767px){
              .singleBlog{
                margin-right: 20px;

              }
            }

            .showall{

              margin-bottom:20px;
            }
            @media(max-width: 767px){
              .show-blogs{
                margin-top: 30px;
              }
              .search-field{
                margin:2px!important;
              }
              .singleBlogTitle{
                font-size: 22px!important;

              }
              .singleBlog{
                margin-bottom: 30px;
              }
            }
              `}
            </style>
    </React.Fragment>
    );
};

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 10;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

//
// Blogs.getInitialProps = () => {
//     return
// };


export default withRouter(Blogs);
