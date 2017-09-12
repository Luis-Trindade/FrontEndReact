import React, { Component, PropTypes } from 'react';
// Import React Table
import ReactTable from 'react-table';
import fetch from '../../core/fetch';

class DatatableContra extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      clinum: props.clinum,
      restricao: '--',
      search: '',
      pages: -1,
      currentPage: 1,
      pageSize: 6,
      sorted: [],
      loading: true,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    this.setState({
      currentPage: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      loading: true,
    });
    let tableUrl = 'http://localhost:3000/api/contra/short';
    let queryParams = '?';
    const start = state.page * state.pageSize;
    queryParams = `${queryParams}start=${start}`;
    queryParams = `${queryParams}&length=${state.pageSize}`;
    queryParams = `${queryParams}&search[value]=${this.state.search}`;
    queryParams = `${queryParams}&restricao=${this.state.restricao}`;
    if (state.sorted.length > 0) {
      let dir = 'asc';
      if (state.sorted[0].desc) { dir = 'desc'; }
      let order = 0;
      switch (state.sorted[0].id) {
        case 'ctonum':
          order = 0; break;
        case 'cto2dat':
          order = 1; break;
        case 'ctopraz':
          order = 2; break;
        case 'ctotcon':
          order = 3; break;
        default:
          order = 0; break;
      }
      queryParams = `${queryParams}&order[0][column]=${order}&order[0][dir]=${dir}`;
    } else {
      queryParams = `${queryParams}&order[0][column]=0&order[0][dir]=asc`;
    }
    tableUrl = `${tableUrl}${queryParams}`;
    fetch(tableUrl, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        const numPages = responseJson.recordsFiltered/state.pageSize;
        this.setState({
          data: responseJson.data,
          pages: numPages,
          loading: false,
        });
      }).catch(() => {
        this.setState({
          data: [],
          pages: -1,
          currentPage: 1,
          pageSize: 6,
          sorted: [],
          loading: false,
        });
      });
  }
  render() {
    return (
      <ReactTable
        columns={[
          {
            Header: 'Número',
            accessor: 'ctonum',
          },
          {
            Header: 'Início',
            accessor: 'cto2dat',
          },
          {
            Header: 'Prazo',
            accessor: 'ctopraz',
          },
          {
            Header: 'Vincendo',
            accessor: 'ctotcon',
          },
        ]}
        manual
        onFetchData={this.fetchData}
        data={this.state.data}
        pages={this.state.pages}
        loading={this.state.loading}
        defaultPageSize={6}
        className="-striped -highlight"
      />
    );
  }
}

DatatableContra.propTypes = {
  clinum: PropTypes.number.isRequired,
}

export default DatatableContra;
