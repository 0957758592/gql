import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'


const text = ''

const GET_DATA = gql`
    query getData {
      data {
        done
        id
        text
      }
    }
` 
// const ADD_DATA = gql`
//     mutation addData($text: String!) {
//       insert_data(objects: {text: $text) {
//         returning {
//           text
//           id
//           done
//         }
//       }
//     }
// `


// client.query({
//   query: gql`
//     query getData {
//       data {
//         done
//         id
//         text
//       }
//     }
//   `
// }).then(data => console.log(data.data.data[0]))


function addData(e) {
  e.preventDefault();
  // this.text = e.target.value;
  // this.useQuery(ADD_DATA(this.text))
}

function App() {


  const { data, loading, error } = useQuery(GET_DATA)


  if (loading) return (<div>Loading...</div>)
  if (error) return <div>Error fetching data</div>



  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
      <h1 className="f2-l">GraphQl Data {" "} <span role="img" aria-label="Checkmark"> !</span></h1>
      <form onSubmit={addData} className="mb3">
        <input type="text" placeholder='add Text' className="p2 f4 b--dashed"/>
        <button type="submit" className="pa2 f4 bg-green"> Add data </button>
      </form>
      <hr />
      <h2>Data list</h2>
      <div className="flex items-center justify-center flex-column">
        {data.data.map((item) => (
          <p key={item.id}><span className="pointer list p1 f3">{item.text}</span>
            <button className="bg-transparent bn f4 "> <span className="red pointer">  &times; </span></button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
