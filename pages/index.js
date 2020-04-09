import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import { getKeywords } from '../actions/keyword';
import Card from '../components/blog/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config';
import Search from '../components/blog/Search'
import { Button } from 'antd'



const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
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
        return loadedBlogs.map((blog, i) => (
                <Card blog={blog} key={i}/>
        ));
    };

    return (
        <>
            {head()}

            <Layout>


                    <div className="show-blogs">
                            <Search />
                    </div>

                    <div className="showall container">{showAllBlogs()}</div>
                    <div className="container">{showLoadedBlogs()}</div>
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                    <section>
                        <div className="pb-5 text-center">
                            {showAllCategories()}
                            {showAllTags()}

                        </div>
                    </section>

            </Layout>

            <style global jsx>{`
            .show-blogs{
              margin-top: 15px;
              margin-bottom:20px;

            }

            .showall{
              padding-left: 30px;
              padding-right: 30px;
              margin-bottom:20px;
            }
            @media(max-width: 767px){
              .show-blogs{
                margin-top: 30px;
              }
              .search-field{
                margin:2px!important;
              }
            }
              `}
            </style>
        </>
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

export default withRouter(Blogs);
