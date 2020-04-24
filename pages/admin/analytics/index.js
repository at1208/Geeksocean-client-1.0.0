import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Head from 'next/head';
import AnalyticsReport from '../../../components/analytics/analytics'





const Analytics = () => {

  return <React.Fragment>
           <Layout>
              <Admin>
            <AnalyticsReport />
              </Admin>
           </Layout>
         </React.Fragment>
}

export default Analytics;
