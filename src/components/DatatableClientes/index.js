import React, { Component, PropTypes } from 'react';
// Import React Table
import ReactTable from 'react-table';
import fetch from '../../core/fetch';

class DatatableClientes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restricao: '--',
      search: '',
      pages: -1,
      currentPage: 1,
      pageSize: 20,
      sorted: [],
      loading: true,
    };
    this.changeRestricao = this.changeRestricao.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  changeRestricao(event){
    this.setState({ restricao: event.target.value });
    this.fetchData({
      page: this.state.currentPage,
      pageSize: this.state.pageSize,
      sorted: this.state.sorted,
    }, null);
  }
  changeSearch(event){
    this.setState({ search: event.target.value });
    this.fetchData({
      page: this.state.currentPage,
      pageSize: this.state.pageSize,
      sorted: this.state.sorted,
    }, null);
  }
  fetchData(state, instance) {
    this.setState({
      currentPage: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      loading: true,
    });
    let tableUrl = 'http://localhost:3000/api/clientes/';
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
        case 'clinum':
          order = 0; break;
        case 'clinom':
          order = 1; break;
        case 'clitlx':
          order = 2; break;
        case 'clitel':
          order = 3; break;
        case 'clinfis':
          order = 4; break;
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
          pageSize: 20,
          sorted: [],
          loading: false,
        });
      });
  }
  render() {
    return (
      <div>
        <div className="form-inline row">
          <span className="form-group">
            <input
              className="form-control"
              id="search"
              onChange={this.changeSearch}
            />
            <div id="toolbar_html">
              <label htmlFor="cod_restricao">Restrição</label>
              <select
                name="cod_restricao"
                defaultValue="--"
                onChange={this.changeRestricao}
                className="form-control"
              >
                <option value="--">--</option>
                {this.props.optionsRestricao.map(opt =>{
                  return (
                    <option
                      key={opt.codigo}
                      value={opt.codigo}
                    >{opt.codigo}</option>
                  );
                })}
              </select>
            </div>
          </span>
        </div>
        <ReactTable
          columns={[
            {
              Header: 'Número',
              accessor: 'clinum',
            },
            {
              Header: 'Nome',
              accessor: 'clinom',
            },
            {
              Header: 'Email',
              accessor: 'clitlx',
            },
            {
              Header: 'Telefone',
              accessor: 'clitel',
            },
            {
              Header: 'NIF',
              accessor: 'clinfis',
            },
          ]}
          manual
          onFetchData={this.fetchData}
          data={this.state.data}
          pages={this.state.pages}
          loading={this.state.loading}
          defaultPageSize={20}
          className="-striped -highlight"
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                window.location = `cliente/${rowInfo.original.clinum}`;
              },
            };
          }
          }
        />
      </div>
    );
  }
}

DatatableClientes.propTypes = {
  optionsRestricao: PropTypes.arrayOf(
    PropTypes.shape({
      codigo: PropTypes.string.isRequired,
      descricao: PropTypes.string,
    }),
  ),
};

export default DatatableClientes;
