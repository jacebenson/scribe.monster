import { useEffect, useState } from 'react'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { ListContext } from 'src/App.js'
import ListCell from 'src/components/ListCell'

const ListPage = ({
  table: tableProp,
  page: pageProp,
  take: takeProp,
  where: whereProp,
  orderBy: orderByProp,
}) => {
  // we are given the following props:
  // table: String!
  // page: Int
  // take: Int
  // where: String
  // orderBy: String

  // i need to allow changing of these props
  // and they need to be reflected in the url
  // lets do this with a button for now
  // and manage the data from the ListContext
  // table, page, take, where, orderBy
  const {
    table,
    setTable,
    page,
    setPage,
    take,
    setTake,
    where,
    setWhere,
    orderBy,
    setOrderBy,
  } = React.useContext(ListContext)
  // when the page loads, we need to set the state
  // to the values given to us by the url
  useEffect(() => {
    console.log({
      tableProp,
      pageProp,
      takeProp,
      whereProp,
      orderByProp,
    })
    if (tableProp) setTable(tableProp)
    if (pageProp) setPage(pageProp)
    if (takeProp) setTake(takeProp)
    if (whereProp) setWhere(whereProp)
    if (orderByProp) setOrderBy(orderByProp)
  }, [])

  return (
    <>
      <MetaTags title="List" description="List page" />
      <details>
        <summary>Debug Context</summary>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Value</th>
              <th>StateValue</th>
              <th>StateValue Form</th>
              <th>submit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>table</td>
              <td>{tableProp}</td>
              <td>{table}</td>
              <td>
                <input id="table" type="text" defaultValue={table} />
              </td>
              <td>
                <button
                  onClick={() =>
                    handleUpdate({
                      value: document.getElementById('table').value,
                      fx: setTable,
                    })
                  }
                >
                  submit
                </button>
              </td>
            </tr>
            <tr>
              <td>page</td>
              <td>{pageProp}</td>
              <td>{page}</td>
              <td>
                <input id="page" type="text" defaultValue={page} />
              </td>
              <td>
                {/*<button onClick={() => setPage(document.getElementById('page').value)}>submit</button>*/}
                <button
                  onClick={() =>
                    handleUpdate({
                      value: document.getElementById('page').value,
                      fx: setPage,
                    })
                  }
                >
                  submit
                </button>
              </td>
            </tr>
            <tr>
              <td>take</td>
              <td>{takeProp}</td>
              <td>{take}</td>
              <td>
                <input id="take" type="text" defaultValue={take} />
              </td>
              <td>
                {/*<button onClick={() => setTake(document.getElementById('take').value)}>submit</button>*/}
                <button
                  onClick={() =>
                    handleUpdate({
                      value: document.getElementById('take').value,
                      fx: setTake,
                    })
                  }
                >
                  submit
                </button>
              </td>
            </tr>
            <tr>
              <td>where</td>
              <td>{whereProp}</td>
              <td>{where}</td>
              <td>
                <input id="where" type="text" defaultValue={where} />
              </td>
              <td>
                {/*<button onClick={() => setWhere(document.getElementById('where').value)}>submit</button>*/}
                <button
                  onClick={() =>
                    handleUpdate({
                      value: document.getElementById('where').value,
                      fx: setWhere,
                    })
                  }
                >
                  submit
                </button>
              </td>
            </tr>
            <tr>
              <td>orderBy</td>
              <td>{orderByProp}</td>
              <td>{orderBy}</td>
              <td>
                <input id="orderBy" type="text" defaultValue={orderBy} />
              </td>
              <td>
                {/*<button onClick={() => setOrderBy(document.getElementById('orderBy').value)}>submit</button>*/}
                <button
                  onClick={() =>
                    handleUpdate({
                      value: document.getElementById('orderBy').value,
                      fx: setOrderBy,
                    })
                  }
                >
                  submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </details>
      {table && (
        <ListCell
          table={tableProp || table}
          page={page}
          take={take}
          where={where}
          orderBy={orderBy}
        />
      )}
    </>
  )
}

export default ListPage
