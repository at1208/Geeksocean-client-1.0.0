import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';
import Router, { withRouter } from 'next/router';
import { Input, Button } from 'antd';
import { IoMdSearch } from "react-icons/io";



const Search = ({ router }) => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        });
        // show search result on different page
        // https://www.udemy.com/instructor/communication/qa/8593208/detail/

        // Router.push({
        //     pathname: '/search',
        //     query: { searchQuery: search }
        // });
    };

    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    const searchedBlogs = (results = []) => {
        return (
            <div className="jumbotron ">
                {message && <p className="text-muted font-italic">{message}</p>}

                {results.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}

            <style global jsx>{`
             .jumbotron{
               margin-bottom: 8em!important;
               padding: 12px 12px 12px 12px!important;
             }
              }
              `}</style>
          </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row col justify-content-center">

                    <Input type="search"  placeholder="Search geek article" onChange={handleChange}className='search-input col-8' />
                    <IoMdSearch  className='search-icon col-2' type="submit" onClick={searchSubmit} />







            </div>
            <style global jsx>{`
              .search-icon{
                font-size: 43px!important;

              }
              .search-input{
                height: 44px!important;
                font-size:15px!important;
              }

              `}</style>
        </form>
    );

    return (
        <div className="container">
            <div className="">{searchForm()}</div>
            {searched && <div style={{ marginTop: '0px', marginBottom: '-100px' }}>{searchedBlogs(results)}</div>}
        </div>
    );
};

export default withRouter(Search);
