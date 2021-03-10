import React from 'react'

const table = () => {
  return (
    <div className=" overflow-x-scroll">
      <table class="table-auto">
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Views</th>
      <th>age</th>
      <th>langiage</th>
      <th>religion</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Intro to CSS</td>
      <td>Adam</td>
      <td>858</td>
    </tr>
    <tr class="bg-emerald-200">
      <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
      <td>Adam</td>
      <td>112</td>
    </tr>
    <tr>
      <td>Intro to JavaScript</td>
      <td>Chris</td>
      <td>1,280</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default table
