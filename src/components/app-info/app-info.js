import "./app-info.css"

export const AppInfo = ({number, prem}) => {
  return (
    <div className="app-info">
        <h1>Рахінок працівників в компанії H</h1>
        <h2>Ціле число працівників: {number}</h2>
        <h2>Премії получають: {prem}</h2>
    </div>
  )
}

export default AppInfo;