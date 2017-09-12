

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Breadcrumb,
  Panel,
} from 'react-bootstrap';
// import Forecast from 'react-forecast';
import Forecast from '../../components/Forecast';

import s from './Home.css';

import {
  Tooltip,
  XAxis, YAxis,
  CartesianGrid, Bar, BarChart,
  ResponsiveContainer } from '../../vendor/recharts';

const title = 'AWF - Audaxys Web FrontEnd';

/*
const data = [
      { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, value: 600 },
      { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, value: 300 },
      { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, value: 500 },
      { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, value: 400 },
      { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, value: 200 },
      { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, value: 700 },
      { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, value: 100 },
];
*/
function Home(props, context) {
  context.setTitle(title);
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item active>
          <i className="fa fa-dashboard" /> Home
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="row">
        <div className="col-lg-12">
          <Panel
            bsStyle="primary"
            className="panel-heading-audaxys"
            header={<h4>Volume de negócio</h4>}
          >
            <div>
              <ResponsiveContainer width="100%" aspect={2}>
                <BarChart data={props.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} >
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="ano" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="numcto" fill="#8884d8" />
                  <Bar dataKey="numprp" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <Panel
            bsStyle="primary"
            className="panel-heading-audaxys"
            header={<h4>Condições Climáticas</h4>}
          >
            <div >
              <Forecast latitude={38.74} longitude={-9.23} units="ca" name='Lisboa' />
            </div>
          </Panel>
        </div>
      </div>


    </div>
  );
}

Home.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    ano: PropTypes.number.isRequired,
    numcto: PropTypes.number.isRequired,
    numprp: PropTypes.number,
  })).isRequired,
};
Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Home);
