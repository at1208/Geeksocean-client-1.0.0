import { useState, useEffect } from 'react';
import { topLatestBlogs } from '../../actions/blog';
import FlashCard from './FlashCard'

const Blogs = () => {

  const [gamesBlog, setgamesBlog] = useState([]);
  const [mobileBlog, setmobileBlog] = useState([]);
  const [lifeStyleBlog, setlifeStyleBlog] = useState([]);

      useEffect(() => {
          gamesLatestBlogs();
          mobilesLatestBlogs();
          lifestyleLatestBlogs();
      }, []);


//Games
      const gamesLatestBlogs = () => {
          topLatestBlogs("5e7a364b8aebfe29a4acb579").then(data => { //game category id
              if (data.error) {
                  console.log(data.error);
              } else {
                 setgamesBlog(data)
              }
          });
      };

   const showGamesBlogs = () => {
       return gamesBlog.map((blog, i) => {
               return <FlashCard blog={blog} key={i}/>
       });
     }



//Mobiles
     const mobilesLatestBlogs = () => {
         topLatestBlogs("5e7aefe5bb39a641e3c9dd3f").then(data => { //mobile category id
             if (data.error) {
                 console.log(data.error);
             } else {
                setmobileBlog(data)
             }
         });
     };

  const showMobilesBlogs = () => {
      return mobileBlog.map((blog, i) => {
              return <FlashCard blog={blog} key={i}/>
      });
    }

//LifeStyle
     const lifestyleLatestBlogs = () => {
         topLatestBlogs("5e7bb32dbb39a641e3c9dd50").then(data => { //lifestyle category id
             if (data.error) {
                 console.log(data.error);
             } else {
                setlifeStyleBlog(data)
             }
         });
     };

  const showlifestyleBlogs = () => {
      return lifeStyleBlog.map((blog, i) => {
              return <FlashCard blog={blog} key={i}/>
      });
    }

     return <div className='container'>
              <div className='row col justify-content-center'>
                 <div className='col-md-4'>
                 {showGamesBlogs()}
                 </div>
                 <div className='col-md-4'>
                 {showMobilesBlogs()}
                 </div>
                 <div className='col-md-4'>
                 {showlifestyleBlogs()}
                 </div>
              </div>
           </div>

}



export default Blogs;
