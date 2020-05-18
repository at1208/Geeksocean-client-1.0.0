import { useState, useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input,Spin } from 'antd';
import moment from 'moment';
import { commentBlog } from '../../actions/blog';
const { TextArea } = Input;
import { LoadingOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazy-load';

// import axios from 'axios';
// import { API } from '../../config';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CommentList = ({ comments }) => (
<List
  dataSource={comments}
  itemLayout="horizontal"
  renderItem={props => <Comment {...props} />}
/>
);

// const Editor = ({ onChange, onSubmit, submitting, value }) => (
// <div>
//   <Form.Item>
//     <TextArea rows={4} onChange={onChange} value={value} />
//   </Form.Item>
//   <Form.Item>
//     <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
//       Add Comment
//     </Button>
//   </Form.Item>
// </div>
// );





const BlogComment = ({ id }) => {

const [comments, setComments] = useState([{

}]);
const [submitting, setSubmitting] = useState(false);
const [value, setValue] = useState('');
const [user, setUserProfile] = useState(null);


useEffect(() => {
if(process.browser){
   let user;
    user = JSON.parse(localStorage.getItem('user'))
  setUserProfile(user)
 }
},[]);


// on writing comment will change the state
const onChangeComment = (e) => {
  setValue(e.target.value)
  console.log(value)
}



//on click to add comment
const handleSubmit = (_id) => {

  if (!value || user ===null ) {
  console.log('Please sign in')
  return;
  }

setSubmitting(true)

 setTimeout(() => {
setSubmitting(false)
   setComments([
            {
              author: user.name,
              avatar: user.picture,
              content: <p>{value}</p>,
              datetime: moment().fromNow(),
            },
            ...comments,
          ])
 },1000)



  commentBlog(id._id, {author: user.name,avatar: user.picture, content: value, datetime: moment(new Date()).format('LLLL') })

};


    return (
      <div className='container'>
         <div className='row justify-content-center'>
           <LazyLoad height={"100%"} offsetHorizontal={50}>
             <img src='https://img.icons8.com/officel/40/000000/user.png' width={40} height={40} style={{ borderRadius: "30px", margin: "5px"}} alt="user"/>
           </LazyLoad>
           <TextArea rows={4} onChange={onChangeComment} style={{ width: "90%"}} className='col'/>
         </div>
         <div className='text-center' style={{ marginTop: "10px"}}>
         <Button  onClick={handleSubmit} type="primary">
          Add Comment
        </Button>
        <br />
     {submitting && <Spin indicator={antIcon} style={{ marginTop: '10px'}}/>}
        </div>

    {comments.length > 1 && <CommentList comments={comments} />}
      </div>
    );

}

export default BlogComment;
