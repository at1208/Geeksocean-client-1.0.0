import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";
import {Button, Input,Checkbox} from 'antd';
import htmlToText from 'html-to-text';
import keyword_extractor from "keyword-extractor";
import { create } from '../../actions/tag';
import { Select, Radio } from 'antd';
const { Option } = Select;




const token = getCookie('token');

const CreateBlog = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [keyword, setkeyword] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags

  const [size, setSize] = useState();

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
    loading: false
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
    loading
  } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();

  }, [router]);

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };


  const handleSizeChange = e => {
     setSize(e.target.value)
  };


  const publishBlog = e => {

    setValues({ ...values, loading: true });
    e.preventDefault();
    // console.log('ready to publishBlog');
    createBlog(formData, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          loading: false,
          title: "",
          error: "",
          success: `A new article titled "${data.title}" is created`
        });
        setBody("");
        setCategories([]);
        setTags([]);

      }
    });
  };

  const handleChange = name => e => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = e => {
    // console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = c => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };


  const handleTagsToggle = t => () => {
    setValues({ ...values, error: "" });
    // return the first index or -1
    const clickedTag = checked.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };



  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      Loading...
    </div>
  );

const generateKeywords = () => {
 const sentence = htmlToText.fromString(body)
 const keywords = keyword_extractor.extract(sentence,{
  language:"english",
  remove_digits: true,
  return_changed_case:true,
  return_chained_words:true,
  remove_duplicates: true
 });
 return keywords
}


const showKeywords = () => {
  return (
    keyword &&
    keyword.map((t, i) => (
      <div>
      <li key={i} className="list-unstyled">
        <input
          onChange={handleTagsToggle(t._id)}
          type="checkbox"
          className="mr-2"
          checked
        />
        <label className="form-check-label">{t}</label>
      </li>
      </div>
    ))
  );
};

const addKeyword = () => {
const keys = generateKeywords()
setkeyword(keys)
  keys.map(item => {
    return create({ name: item }, token).then(tag => {
   if(tag.error){
     console.log('error while creating tags')
   }else{
     console.log("tag created", tag)
   }
    })
  })
}

function SelectedTag(value) {
  setValues({ ...values, error: "" });
  setCheckedTag(value);
  formData.set("tags", value);

  console.log(`Selected: ${value}`);
}

function SelectedCategory(value) {
  setValues({ ...values, error: "" });
   setChecked(value)
  formData.set("categories", value);

  console.log(`Selected: ${value}`);
}

const tagsChildren = [];
tags.map(item => {
  return tagsChildren.push(<Option  key={item._id}>{item.name}</Option>)
})
const categoryChildren = [];
categories.map(item => {
  return categoryChildren.push(<Option  key={item._id}>{item.name}</Option>)
})



  const createBlogForm = () => {
       generateKeywords()
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
       
          <Input
            addonBefore='Title'
            type="text"
            value={title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div className="form-group">

        </div>

        <div>
          <button type="submit" className="btn btn-info btn-block">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <div className="pt-3">
            {showError()}
            {showSuccess()}
            {showLoading()}
          </div>
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <br />
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
          <div>
          {/*<Button onClick={addKeyword}>Add keywords</Button>*/}
            <hr />
            <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showKeywords()}
           </div>
          </div>
            <h5>Categories</h5>
            <Select

            mode="tags"
            size={size}
            placeholder="Select Category"
            defaultValue={[]}
            showArrow={true}
            filterOption={true}
            onChange={SelectedCategory}
            style={{ width: '100%' }}

            >
            {categoryChildren}
            </Select>
          </div>
          <hr />
          <div>
            <h5>Tags</h5>
            <Select
            mode="tags"
            size={size}
            placeholder="Select Tags"
            defaultValue={[]}
            showArrow={true}
            onChange={SelectedTag}
            style={{ width: '100%' }}
            >
            {tagsChildren}
            </Select>
          </div>

        </div>
      </div>
      <style jsx>{`

        `}</style>
    </div>
  );
};

export default withRouter(CreateBlog);
