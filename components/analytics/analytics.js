import {listOfAllBlogs} from '../../actions/blog';
import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {userslist} from '../../actions/user';



listOfAllBlogs().then(res => console.log(res.length));
getCategories().then(res => console.log(res.length));
getTags().then(res => console.log(res.length));
userslist().then(res => console.log(res.users.length));


 

const Analytics = () => {
  return <React.Fragment>
         <div className='container'>
            <h1 className='text-center'>Analytic Report</h1>
         </div>
         </React.Fragment>
}

export default Analytics;
