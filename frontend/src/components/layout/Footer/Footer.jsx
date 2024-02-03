import React from 'react'

const Footer = () => {
    let today = new Date();
  return (
    <footer>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
              <p>&copy; {today.getFullYear()} lakeSideHotel</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
