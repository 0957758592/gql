import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_DATA } from './gql/queries'
import { ADD_DATA, TOGGLE_DATA, DELETE_DATA } from './gql/mutations'


function App() {
  const [newText, setNewText] = React.useState('')

  const { data, loading, error } = useQuery(GET_DATA)
  const [toggleData] = useMutation(TOGGLE_DATA)
  const [newData] = useMutation(ADD_DATA, {
    onCompleted: () => setNewText('')
  })
  const [removedData] = useMutation(DELETE_DATA)


  async function handleToggleData({ id, done }) {
    await toggleData({
      variables: {
        id: id,
        done: !done
      }
    }).then((item) => console.log(item))
  }

  const refetchData = () => {
    return { query: GET_DATA }
  }

  async function addNewData(e) {
    e.preventDefault();

    if (!newText.trim()) return;

    await newData({
      variables: {
        text: newText
      },
      refetchQueries: [
        refetchData()
      ]
    })
  }

  async function handleDelete({ id }) {
    const isConfirmed = window.confirm("Do you want to remove?")

    if (isConfirmed) {
      await removedData({
        variables: {
          id: id
        },
        refetchQueries: [
          refetchData()
        ]
      })
    }
  }


  if (loading) return (<div>Loading...</div>)
  if (error) return <div>Error fetching data</div>

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa3 fl-1">
      <h1 className="f2-l">GraphQl Data {" "} <span role="img" aria-label="Checkmark"> !</span></h1>
      <form onSubmit={addNewData} className="mb3">
        <input type="text" placeholder='add Text' className="pa2 f4 b--dashed" onChange={e => setNewText(e.target.value)} value={newText} />
        <button type="submit" className="pa2 f4 bg-green"> Add data </button>
      </form>
      <hr />
      <h2>Data list</h2>
      <div className="flex items-center justify-center flex-column">
        {data.data.map((item) => (
          <p onDoubleClick={() => handleToggleData(item)} key={item.id}><span className={`pointer list pa1 f3 ${item.done && 'strike'}`}>{item.text}</span>
            <button className="bg-transparent bn f4 " onClick={() => handleDelete(item)}> <span className="red pointer">  &times; </span></button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
